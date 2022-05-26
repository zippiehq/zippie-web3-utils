/*
 * Copyright (C) 2017 Zippie Ltd.
 *
 * Commercial License Usage
 *
 * Licensees holding valid commercial Zipper licenses may use this file in
 * accordance with the terms contained in written agreement between you and
 * Zippie
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

const ethers = require("ethers");

const abi = [
  // Read-Only Functions
  "function usedNonces(address, address) view returns(address)",

  // Authenticated Functions
  "function redeemBlankCheck(address[] memory addresses, address[] memory signers, uint8[] memory m, uint8[] memory v, bytes32[] memory r, bytes32[] memory s, uint256 amount, bytes32[] memory cardNonces) public returns (bool)",

  // Events
];

function getAccountAddress(web3, signers, m, contractAddress) {
  // XXX can we get bytecode from chain instead or pass a param?
  const accountBytecode = "0x608060405234801561001057600080fd5b50600080546001600160a01b03191633179055610171806100326000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063daea85c514610030575b600080fd5b6100566004803603602081101561004657600080fd5b50356001600160a01b0316610058565b005b6000546001600160a01b0316331461006f57600080fd5b60408051600160e01b63095ea7b3028152336004820152600019602482015290516001600160a01b0383169163095ea7b39160448083019260209291908290030181600087803b1580156100c257600080fd5b505af11580156100d6573d6000803e3d6000fd5b505050506040513d60208110156100ec57600080fd5b50516101425760408051600160e51b62461bcd02815260206004820152600e60248201527f417070726f7665206661696c6564000000000000000000000000000000000000604482015290519081900360640190fd5b32fffea165627a7a7230582032c59f0247a959ee08569c8456e1b35a213a36088625adeb369ffa1a46228e3e0029"
  const bytecodeHash = ethers.utils.keccak256(accountBytecode)
	const salt = ethers.utils.solidityKeccak256(['address[]', 'uint8[]'], [signers, m]) 
	const accountHash = ethers.utils.keccak256(`0x${'ff'}${contractAddress.slice(2)}${salt.slice(2)}${bytecodeHash.slice(2)}`)
	const accountAddress = `0x${accountHash.slice(-40)}`.toLowerCase()
	return ethers.utils.getAddress(accountAddress)
}

function getAccount(web3, tokenAddress, contractAddress, signerAddress, cardAddress) {
  // Account no card
  let signers = [signerAddress]
  let m = [1, 1, 0, 0]

  if (cardAddress !== undefined) {
    // Account with card
    signers = [signerAddress, cardAddress]
    m = [1, 1, 1, 1]
  }

  const accountAddress = getAccountAddress(web3, signers, m, contractAddress)

  const account = {
    accountAddress: accountAddress,
    contractAddress: contractAddress,
    tokenAddress: tokenAddress,
    signerAddress: signerAddress,
    cardAddress: cardAddress,
    m: m,
  }

  return account
}

function createBlankCheck(web3, account, ledger, tokenAddress, amount, message, metadata) {
  // Generate new unique verification key
  const verificationKey = ethers.Wallet.createRandom()

  // Create blank check hash to be signed by signers
  const blankCheckHash = ethers.utils.solidityKeccak256(['string','address','uint256','address'],['redeemBlankCheck', tokenAddress, amount, verificationKey.address])

  const blankCheck = {
    multisigAccount: account,
    check: {
      ledger: ledger,
      hash: blankCheckHash,
      token: tokenAddress,
      amount: amount,
      message: message,
      verificationKey: { address: verificationKey.address, privateKey: verificationKey.privateKey },
      metadata: metadata,
    },
  }

  return blankCheck
}

function createBlankCheckChosenPrivkey(web3, account, ledger, tokenAddress, amount, message, metadata, verificationKey) {
  const vKey = ethers.Wallet(verificationKey)

  // Create blank check hash to be signed by signers
  const blankCheckHash = ethers.utils.solidityKeccak256(['string','address','uint256','address'],['redeemBlankCheck', tokenAddress, amount, vKey.address])

  const blankCheck = {
    multisigAccount: account,
    check: {
      ledger: ledger,
      hash: blankCheckHash,
      token: tokenAddress,
      amount: amount,
      message: message,
      verificationKey: { address: vKey.address, privateKey: vKey.privateKey },
      metadata: metadata,
    },
  }

  return blankCheck
}

function addSignerSignatureToBlankCheck(blankCheck, r, s, v) {
  blankCheck.signatures = { r: r, s: s, v: v }
  return blankCheck
}

function addCardSignatureToBlankCheck(blankCheck, nonce, r, s, v) {
  blankCheck.cardSignatures = { nonce: nonce, r: r, s: s, v: v }
  return blankCheck
}

async function redeemBlankCheck(web3, blankCheck, recipientAddress) {
  // Destruct blankCheck obj
  const sender = blankCheck.multisigAccount
  const check = blankCheck.check
  const signatures = blankCheck.signatures
  const cardSignatures = blankCheck.cardSignatures

  // Sign this recipient address hash with verification key
  const recipientHash = ethers.utils.solidityKeccak256(['address'],[recipientAddress])
  const verificationPrivateKey = check.verificationKey.privateKey
  const verificationKeySigner = new ethers.Wallet(verificationPrivateKey)
  const recipientSignature = await verificationKeySigner.signMessage(ethers.utils.arrayify(recipientHash))
  const signedRecipientHash = ethers.utils.splitSignature(recipientSignature)

  // redeemBlankCheck(address[] memory addresses, address[] memory signers, uint8[] memory m, uint8[] memory v, bytes32[] memory r, bytes32[] memory s, uint256 amount, bytes32[] memory cardNonces)
  const addresses = [
    sender.tokenAddress,
    recipientAddress,
    check.verificationKey.address,
  ]
  const signers = [sender.signerAddress]
  const m = sender.m
  const r = [signedRecipientHash.r.valueOf()]
  const s = [signedRecipientHash.s.valueOf()]
  const v = [signedRecipientHash.v]
  const amount = check.amount
  const cardNonces = []

  // Handle signatures
  if (signatures) {
    r.push(signatures.r.valueOf())
    s.push(signatures.s.valueOf())
    v.push(signatures.v)
  }

  // Add card data
  if (sender.cardAddress !== undefined) {
    signers.push(sender.cardAddress)

    // Handle card signatures
    if(cardSignatures) {
      r.push(cardSignatures.r.valueOf())
      s.push(cardSignatures.s.valueOf())
      v.push(cardSignatures.v)
      cardNonces.push(cardSignatures.nonce)
    }
  }
  
  const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
  const multisigContract = new ethers.Contract(sender.contractAddress, abi, provider);
  const redeemBlankCheckTx = await multisigContract.populateTransaction.redeemBlankCheck(addresses, signers, m, v, r, s, amount, cardNonces)
  return redeemBlankCheckTx.data
}

function decodeRedeemBlankCheckParameters(web3, redeemBlankCheckTx) {
  const iface = new ethers.utils.Interface(abi)
  const params = iface.decodeFunctionData("redeemBlankCheck", redeemBlankCheckTx)
  return params
}


async function isBlankCheckRedeemed(web3, contractAddress, senderAccountAddress, verificationKeyAddress) {
  const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
  const multisigContract = new ethers.Contract(contractAddress, abi, provider);
  const recipientAddress = await multisigContract.usedNonces(senderAccountAddress, verificationKeyAddress)
  return recipientAddress
}

module.exports = {
  getAccountAddress,
  getAccount,
  createBlankCheck,
  addSignerSignatureToBlankCheck,
  addCardSignatureToBlankCheck,
  redeemBlankCheck,
  decodeRedeemBlankCheckParameters,
  isBlankCheckRedeemed,
  createBlankCheckChosenPrivkey
}
