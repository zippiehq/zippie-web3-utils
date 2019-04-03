/*
 * Copyright (C) 2018 Zippie Ltd
 *
 * Commercial License Usage
 *
 * Licensees holding valid commercial Zipper licenses may use this file in
 * accordance with the terms contained in written agreement between you and
 * Zippie Ltd.
 *
 * GNU Affero General Public License Usage
 *
 * Alternatively, the JavaScript code in this page is free software: you can
 * redistribute it and/or modify it under the terms of the GNU Affero General Public
 * License (GNU AGPL) as published by the Free Software Foundation, either
 * version 3 of the License, or (at your option) any later version.  The code
 * is distributed WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for
 * more details.
 *
 * As additional permission under GNU AGPL version 3 section 7, you may
 * distribute non-source (e.g., minimized or compacted) forms of that code
 * without the copy of the GNU GPL normally required by section 4, provided
 * you include this license notice and a URL through which recipients can
 * access the Corresponding Source.
 *
 * As a special exception to the AGPL, any HTML file which merely makes
 * function calls to this code, and for that purpose includes it by reference
 * shall be deemed a separate work for copyright law purposes.  In addition,
 * the copyright holders of this code give you permission to combine this
 * code with free software libraries that are released under the GNU LGPL.
 * You may copy and distribute such a system following the terms of the GNU
 * AGPL for this code and the LGPL for the libraries.  If you modify this
 * code, you may extend this exception to your version of the code, but you
 * are not obligated to do so.  If you do not wish to do so, delete this
 * exception statement from your version.
 *
 * This license applies to this entire compilation.
 */

const erc20 = require('./token')
const zippieMultisig = require('./contracts/zippieMultisigContractAbiJson')

async function createNewMultisigAccount1of1(
  web3,
  erc20TokenContractAddress,
  zippieSignerAddress
) {
  // Generate temp private key
  const multisigPrivateKeyHex = web3.utils.randomHex(32)
  const multisigPrivateKey = web3.utils.hexToBytes(multisigPrivateKeyHex)

  // Get multisig account address
  const zippieMultisigAccountAddress = web3.eth.accounts.privateKeyToAccount(multisigPrivateKey).address
  const erc20TokenContract = erc20.getTokenContract(web3, erc20TokenContractAddress)

  // Create ZIPT approve transaction for multisig
  const MAX_UINT256 = '115792089237316195423570985008687907853269984665640564039457584007913129639935'
  const approveTransaction = erc20TokenContract.methods
    .approve(zippieMultisig.MULTISIG_CONTRACT, MAX_UINT256)
    .encodeABI()
  // Estimate Gas
  const gasEstimation = await erc20TokenContract.methods
    .approve(zippieMultisig.MULTISIG_CONTRACT, MAX_UINT256)
    .estimateGas()

  // Signed approve transaction
  // TODO: create multiple transactions for different gasPrice & also with higher gas limit than gas estimate
  const signedApproveTransaction = await web3.eth.accounts.signTransaction(
    {
      to: erc20TokenContractAddress,
      data: approveTransaction,
      value: 0,
      gasPrice: 2000000000,
      gas: gasEstimation,
    },
    multisigPrivateKey,
  )

  let addresses = [zippieSignerAddress]
  let m = [1, 1, 0, 0]

  // Create hash for list of signers and amount of required signatures
  const packedParams =
    '0x' + getAbiParameterArrayEncodePacked(web3, addresses) + getAbiParameterArrayEncodePacked(web3, m)
  const signByPrivateKey = web3.utils.soliditySha3(packedParams)

  // Sign this hash by multisig (temp private key)
  const signedByPrivateKey = web3.eth.accounts.sign(signByPrivateKey, multisigPrivateKey)

  const r0 = signedByPrivateKey.r
  const s0 = signedByPrivateKey.s
  const v0 = web3.utils.hexToNumber(signedByPrivateKey.v)

  const multisig = {
    accountAddress: zippieMultisigAccountAddress,
    contractAddress: zippieMultisig.MULTISIG_CONTRACT,
    tokenAddress: erc20TokenContractAddress,
    approveTx: signedApproveTransaction.rawTransaction,
    signerAddress: zippieSignerAddress,
    m: m,
    v0: v0,
    r0: r0,
    s0: s0,
  }

  return multisig
}

function getAbiParameterArrayEncodePacked(web3, dataArray) {
  let packedData = ''
  for (let i = 0; i < dataArray.length; i++) {
    packedData = packedData + web3.utils.padLeft(dataArray[i], 64).slice(2)
  }
  return packedData
}

function initZippieMultisigContract(web3) {
  return new web3.eth.Contract(
    zippieMultisig.getZippieMultisigContractAbiJson(),
    zippieMultisig.MULTISIG_CONTRACT,
    {}
  )
}

async function claimBlankCheck(web3, recipient, blankCheck, approveTx) {
    const zippieMultisigContract = initZippieMultisigContract(web3)
  
    // Destruct blankCheck obj
    const sender = blankCheck.multisigAccount
    const check = blankCheck.check
    const card = blankCheck.card
  
    // Sign this recipient address hash with verification key
    const recipientHash = web3.utils.soliditySha3(recipient.accountAddress)
    const verificationPrivateKey = check.verificationKey.pk
    const signedRecipientHash = web3.eth.accounts.sign(
      recipientHash,
      verificationPrivateKey
    )
  
    const addresses = [
      sender.accountAddress,
      recipient.tokenAddress,
      recipient.accountAddress,
      check.verificationKey.address
    ]
    const allSignersPossible = [sender.signerAddress]
    const m = sender.m
  
    const v = [sender.v0, web3.utils.hexToNumber(signedRecipientHash.v), check.v1]
    const r = [
      sender.r0.valueOf(),
      signedRecipientHash.r.valueOf(),
      check.r1.valueOf()
    ]
    const s = [
      sender.s0.valueOf(),
      signedRecipientHash.s.valueOf(),
      check.s1.valueOf()
    ]
  
    const amount = check.amount
    const cardDigests = []
  
    // Add card data
    // TODO: Support multiple cards
    if (sender.cardAddress !== undefined) {
      allSignersPossible.push(sender.cardAddress)
      v.splice(2, 0, card.v)
      r.splice(2, 0, card.r.valueOf())
      s.splice(2, 0, card.s.valueOf())
      cardDigests.push(card.digest)
    }
  
    const checkCashingTx = await zippieMultisigContract.methods
      .redeemBlankCheck(
        addresses,
        allSignersPossible,
        m,
        v,
        r,
        s,
        amount,
        cardDigests
      )
      .encodeABI()
  
    const checkCashingTxHash = await sponsorCheckCashingWithApproveTx(
      blankCheck.multisigAccount.contractAddress,
      checkCashingTx,
      approveTx
    )
  
    return checkCashingTxHash
  }

  async function createBlankCheck(web3, multisigAccount, signerAccount, amountInWei, message, sign) {
    // Generate new unique verification key
    const verificationPrivateKeyHex = web3.utils.randomHex(32)
    const verificationPrivateKey = web3.utils.hexToBytes(verificationPrivateKeyHex)
    const verificationAccount = web3.eth.accounts.privateKeyToAccount(verificationPrivateKey)
  
    // Create blank check hash for entered amount
    const checkHash = web3.utils.soliditySha3('redeemBlankCheck', amountInWei, verificationAccount.address)
  
    // Prefix with \x19Ethereum Signed Message:\n32 keccak (added when using web3.eth.accounts.sign)
    const signByKey1Prefixed = web3.utils.soliditySha3('\x19Ethereum Signed Message:\n32', checkHash)
  
    // Sign this hash by signer
    const messageToSign = Buffer.from(signByKey1Prefixed.slice(2), 'hex')
    const signKey = Buffer.from(signerAccount.privateKey, 'hex')
  
    const signedByKey1 = await sign(messageToSign, signKey)
    const r1 = '0x' + signedByKey1.signature.slice(0, 64)
    const s1 = '0x' + signedByKey1.signature.slice(64, 128)
    const v1 = signedByKey1.recovery + 27
  
    const blankCheck = {
      multisigAccount: multisigAccount,
      check: {
        amount: amountInWei,
        message: message,
        verificationKey: { address: verificationAccount.address, pk: verificationPrivateKey },
        v1: v1,
        r1: r1,
        s1: s1,
      },
    }
  
    return blankCheck
  }

module.exports = {createNewMultisigAccount1of1, initZippieMultisigContract, claimBlankCheck, createBlankCheck}