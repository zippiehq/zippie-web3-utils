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

const { erc20_abi } = require('./contracts/erc20ContractAbi.js')
const { wallet_abi_v1 } = require('./contracts/zippieWalletContractAbi_v1.js')
const { getAbiParameterArrayEncodePacked } = require('./utility.js')

async function createAccount(
    web3,
    tokenAddress,
    contractAddress,
    signerAddress,
    cardAddress,
    dappUri,
  ) {
  // Generate temp private key (account)
  const account = web3.eth.accounts.create(Web3.utils.randomHex(32))

  // Set erc20 token address
  const erc20TokenContract = new web3.eth.Contract(erc20_abi, tokenAddress)

  // Create ZIPT approve transaction for multisig
  const MAX_UINT256 = '115792089237316195423570985008687907853269984665640564039457584007913129639935'
  const approveTransaction = erc20TokenContract.methods
    .approve(contractAddress, MAX_UINT256)
    .encodeABI()

  // Estimate Gas
  const gasEstimation = await erc20TokenContract.methods
    .approve(contractAddress, MAX_UINT256)
    .estimateGas({ from: account.address })

  // Signed approve transaction
  // TODO: create multiple transactions for different gasPrice & also with higher gas limit than gas estimate
  const signedApproveTransaction = await web3.eth.accounts.signTransaction(
    {
      to: contractAddress,
      data: approveTransaction,
      value: 0,
      gasPrice: 2000000000,
      gas: gasEstimation,
    },
    account.privateKey,
  )

  let signers = [signerAddress]
  let m = [1, 1, 0, 0]

  // Add card if there is one
  if (cardAddress !== undefined) {
    m = [1, 1, 1, 1]
    signers = [signerAddress, cardAddress]
  }

  // Create hash for list of signers and amount of required signatures
  const accountHash = web3.utils.soliditySha3('0x' + getAbiParameterArrayEncodePacked(web3, signers) + getAbiParameterArrayEncodePacked(web3, m))

  // Sign this hash by multisig (temp private key)
  const accountHashSigned = web3.eth.accounts.sign(accountHash, account.privateKey)

  const r0 = accountHashSigned.r
  const s0 = accountHashSigned.s
  const v0 = web3.utils.hexToNumber(accountHashSigned.v)

  const multisig = {
    accountAddress: account.address,
    contractAddress: contractAddress,
    tokenAddress: tokenAddress,
    approveTx: signedApproveTransaction.rawTransaction,
    signerAddress: signerAddress,
    cardAddress: cardAddress,
    dappUri: dappUri, // XXX how is this working?
    m: m,
    v0: v0,
    r0: r0,
    s0: s0,
  }

  return multisig
}

function createBlankCheck(web3, account, amount, message) {
  // Generate new unique verification key
  const verificationKey = web3.eth.accounts.create(Web3.utils.randomHex(32))

  // Create blank check hash to be signed by signers
  const blankCheckHash = web3.utils.soliditySha3('redeemBlankCheck', amount, verificationKey.address)

  const blankCheck = {
    multisigAccount: account,
    check: {
      hash: blankCheckHash,
      amount: amount,
      message: message,
      verificationKey: { address: verificationKey.address, pk: verificationKey.privateKey },
    },
  }

  return blankCheck
}

function addSignerSignatureToBlankCheck(blankCheck, r, s, v) {
  blankCheck.check = { r1: r, s1: s, v1: v, ...blankCheck.check }
  return blankCheck
}

function addCardSignatureToBlankCheck(blankCheck, digest, r, s, v) {
  blankCheck.card = { digest: digest, r: r, s: s, v: v }
  return blankCheck
}

function redeemBlankCheck(web3, blankCheck, recipientAddress) {
  // Destruct blankCheck obj
  const sender = blankCheck.multisigAccount
  const check = blankCheck.check
  const card = blankCheck.card

  // Sign this recipient address hash with verification key
  const recipientHash = web3.utils.soliditySha3(recipientAddress)
  const verificationPrivateKey = check.verificationKey.pk
  const signedRecipientHash = web3.eth.accounts.sign(recipientHash, verificationPrivateKey)

  // redeemBlankCheck(address[] memory addresses, address[] memory signers, uint8[] memory m, uint8[] memory v, bytes32[] memory r, bytes32[] memory s, uint256 amount, bytes32[] memory cardNonces)
  const addresses = [
    sender.accountAddress,
    sender.tokenAddress, // XXX Not working for receive accounts?
    recipientAddress,
    check.verificationKey.address,
  ]
  const allSignersPossible = [sender.signerAddress]
  const m = sender.m
  const v = [sender.v0, web3.utils.hexToNumber(signedRecipientHash.v), check.v1]
  const r = [sender.r0.valueOf(), signedRecipientHash.r.valueOf(), check.r1.valueOf()]
  const s = [sender.s0.valueOf(), signedRecipientHash.s.valueOf(), check.s1.valueOf()]
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

  const multisigContract = new web3.eth.Contract(wallet_abi_v1, sender.contractAddress)
  const redeemBlankCheckTx = multisigContract.methods
    .redeemBlankCheck(addresses, allSignersPossible, m, v, r, s, amount, cardDigests)
    .encodeABI()

  return redeemBlankCheckTx
}

module.exports = {
  createAccount,
  createBlankCheck,
  addSignerSignatureToBlankCheck,
  addCardSignatureToBlankCheck,
  redeemBlankCheck,
}