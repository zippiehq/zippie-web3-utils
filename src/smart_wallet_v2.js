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

const { merchant_registry_abi } = require('./contracts/zippieMerchantRegistryAbi.js')
const { zippie_merchant_owner_abi } = require('./contracts/zippieMerchantOwnerAbi_v2.js')
const { zippie_smart_wallet_abi } = require('./contracts/zippieSmartWalletErc20Abi_v1.js')
const { zippie_smart_wallet_erc721_abi } = require('./contracts/zippieSmartWalletErc721Abi_v1.js')

let merchantRegistryContractCache = {}
let merchantOwnerContractCache = {}
let smartWalletContractCache = {}
let smartWalletErc721ContractCache = {}

function getMerchantRegistryContract(web3, contractAddress) {
	let merchantRegistryContract
	
	if (merchantRegistryContractCache[contractAddress]) {
		merchantRegistryContract = merchantRegistryContractCache[contractAddress]
	} else {
		merchantRegistryContract = merchantRegistryContractCache[contractAddress] = new web3.eth.Contract(merchant_registry_abi, contractAddress, {})
	}
	
	return merchantRegistryContract
}

function getMerchantOwnerContract(web3, contractAddress) {
	let merchantOwnerContract
  
  if (merchantOwnerContractCache[contractAddress]) {
		merchantOwnerContract = merchantOwnerContractCache[contractAddress]
  } else {
		merchantOwnerContract = merchantOwnerContractCache[contractAddress] = new web3.eth.Contract(zippie_merchant_owner_abi, contractAddress, {})
	}
	
	return merchantOwnerContract
}

function getSmartWalletContract(web3, contractAddress) {
	let smartWalletContract
  
  if (smartWalletContractCache[contractAddress]) {
		smartWalletContract = smartWalletContractCache[contractAddress]
  } else {
		smartWalletContract = smartWalletContractCache[contractAddress] = new web3.eth.Contract(zippie_smart_wallet_abi, contractAddress, {})
	}
	
	return smartWalletContract
}

function getSmartWalletContract_ERC721(web3, contractAddress) {
	let smartWalletContract
  
  if (smartWalletErc721ContractCache[contractAddress]) {
		smartWalletContract = smartWalletErc721ContractCache[contractAddress]
  } else {
		smartWalletContract = smartWalletErc721ContractCache[contractAddress] = new web3.eth.Contract(zippie_smart_wallet_erc721_abi, contractAddress, {})
	}
	
	return smartWalletContract
}

function getAccountAddress(web3, merchantId, orderId, walletAddress) {
	const bytecode = '0x608060405234801561001057600080fd5b50600080546001600160a01b03191633179055610171806100326000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063daea85c514610030575b600080fd5b6100566004803603602081101561004657600080fd5b50356001600160a01b0316610058565b005b6000546001600160a01b0316331461006f57600080fd5b60408051600160e01b63095ea7b3028152336004820152600019602482015290516001600160a01b0383169163095ea7b39160448083019260209291908290030181600087803b1580156100c257600080fd5b505af11580156100d6573d6000803e3d6000fd5b505050506040513d60208110156100ec57600080fd5b50516101425760408051600160e51b62461bcd02815260206004820152600e60248201527f417070726f7665206661696c6564000000000000000000000000000000000000604482015290519081900360640190fd5b32fffea165627a7a7230582032c59f0247a959ee08569c8456e1b35a213a36088625adeb369ffa1a46228e3e0029'
	const bytecodeHash = web3.utils.sha3(bytecode)
	const salt = web3.utils.soliditySha3(merchantId, orderId)
	const accountHash = web3.utils.sha3(`0x${'ff'}${walletAddress.slice(2)}${salt.slice(2)}${bytecodeHash.slice(2)}`)
	const accountAddress = `0x${accountHash.slice(-40)}`.toLowerCase()
	return web3.utils.toChecksumAddress(accountAddress)
}

function getAccountAddress_ERC721(web3, merchantId, orderId, walletAddress) {
	const bytecode = '0x608060405234801561001057600080fd5b50600080546001600160a01b0319163317905560ff806100316000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c8063daea85c514602d575b600080fd5b605060048036036020811015604157600080fd5b50356001600160a01b03166052565b005b6000546001600160a01b03163314606857600080fd5b60408051600160e01b63a22cb4650281523360048201526001602482015290516001600160a01b0383169163a22cb46591604480830192600092919082900301818387803b15801560b857600080fd5b505af115801560cb573d6000803e3d6000fd5b503292505050fffea165627a7a72305820138a39f8dcc74909958a7c9a3debcc975c1b1527953c47473594aa49882499790029'
	const bytecodeHash = web3.utils.sha3(bytecode)
	const salt = web3.utils.soliditySha3(merchantId, orderId)
	const accountHash = web3.utils.sha3(`0x${'ff'}${walletAddress.slice(2)}${salt.slice(2)}${bytecodeHash.slice(2)}`)
	const accountAddress = `0x${accountHash.slice(-40)}`.toLowerCase()
	return web3.utils.toChecksumAddress(accountAddress)
}

async function checkMerchantRegistryPermissions(web3, contractAddress, merchantId) {
	const merchantRegistryContract = getMerchantRegistryContract(web3, contractAddress)
  const merchantOwner = await merchantRegistryContract.methods.owner(merchantId).call()
  const hasPermissionB2B = await merchantRegistryContract.methods.hasRole(web3.utils.sha3("TRANSFER_B2B"), merchantId).call()
  const hasPermissionB2C = await merchantRegistryContract.methods.hasRole(web3.utils.sha3("TRANSFER_B2C"), merchantId).call()

  return { merchantOwner, hasPermissionB2B, hasPermissionB2C }
}

async function checkMerchantOwnerPermissions(web3, contractAddress, accountAddress) {	
	const merchantOwnerContract = getMerchantOwnerContract(web3, contractAddress)
  const isAdmin = await merchantOwnerContract.methods.hasRole('0x0000000000000000000000000000000000000000000000000000000000000000', accountAddress).call()
  const hasPermissionB2B = await merchantOwnerContract.methods.hasRole(web3.utils.sha3("transferB2B"), accountAddress).call()
  const hasPermissionB2C = await merchantOwnerContract.methods.hasRole(web3.utils.sha3("transferB2C"), accountAddress).call()
  const hasPermissionMintToken = await merchantOwnerContract.methods.hasRole(web3.utils.sha3("mintToken"), accountAddress).call()
  const hasPermissionAdminENS = await merchantOwnerContract.methods.hasRole(web3.utils.sha3("adminENS"), accountAddress).call()
  const hasPermissionApproveTransfer = await merchantOwnerContract.methods.hasRole(web3.utils.sha3("approveTransfer"), accountAddress).call()

  return { isAdmin, hasPermissionB2B, hasPermissionB2C, hasPermissionMintToken, hasPermissionAdminENS, hasPermissionApproveTransfer }
}

function createMetaTxTransferB2B(web3, token, senderMerchant, senderOrderId, recipientMerchant, recipientOrderId, amount) {
	// XXX: Add nonce and smart wallet address
	const hash = web3.utils.soliditySha3('transferB2B', token, senderMerchant, senderOrderId, recipientMerchant, recipientOrderId, amount)
	return { token, senderMerchant, senderOrderId, recipientMerchant, recipientOrderId, amount, hash }
}

function createMetaTxTransferB2C(web3, token, senderMerchant, senderOrderId, recipient, amount) {
		// XXX: Add nonce and smart wallet address
	const hash = web3.utils.soliditySha3('transferB2C', token, senderMerchant, senderOrderId, recipient, amount)
	return { token, senderMerchant, senderOrderId, recipient, amount, hash }
}

function createMetaTxTransferB2B_ERC721(web3, token, senderMerchant, senderOrderId, recipientMerchant, recipientOrderId, tokenId) {
	// XXX: Add nonce and smart wallet address
	const hash = web3.utils.soliditySha3('transferB2B', token, senderMerchant, senderOrderId, recipientMerchant, recipientOrderId, tokenId)
	return { token, senderMerchant, senderOrderId, recipientMerchant, recipientOrderId, tokenId, hash }
}

function createMetaTxTransferB2C_ERC721(web3, token, senderMerchant, senderOrderId, recipient, tokenId) {
		// XXX: Add nonce and smart wallet address
	const hash = web3.utils.soliditySha3('transferB2C', token, senderMerchant, senderOrderId, recipient, tokenId)
	return { token, senderMerchant, senderOrderId, recipient, tokenId, hash }
}

function createMetaTxMintToken(web3, token, recipient, amount) {
	// XXX: Add nonce
	const hash = web3.utils.soliditySha3('mintToken', token, recipient, amount)
	return { token, token, recipient, amount, hash }
}

function createMetaTxMintToken_ERC721(web3, token, recipient, tokenId, tokenURI) {
	// XXX: Add nonce
	const hash = web3.utils.soliditySha3('mintToken_ERC721', token, recipient, tokenId, tokenURI)
	return { token, recipient, tokenId, tokenURI, hash }
}

function createMetaTxApproveTransferFrom_ERC721(web3, token, from, to, tokenId, metadata) {
	// XXX: Add nonce
	const hash = web3.utils.soliditySha3('approveTransferFrom_ERC721', token, from, to, tokenId, metadata)
	return { token, from, to, tokenId, metadata, hash }
}

function createMetaTxRejectTransferFrom_ERC721(web3, token, from, to, tokenId, metadata) {
	// XXX: Add nonce
	const hash = web3.utils.soliditySha3('rejectTransferFrom_ERC721', token, from, to, tokenId, metadata)
	return { token, from, to, tokenId, metadata, hash }
}

function createMetaTxUpdateEnsContentHash(web3, ensResolver, ensNode, contentHash) {
	// XXX: Add nonce
	const hash = web3.utils.soliditySha3('updateEnsContentHash', ensResolver, ensNode, contentHash)
	return { ensResolver, ensNode, contentHash, hash }
}

function encodeMetaTxTransferB2B(web3, merchantOwnerContractAddress, smartWalletContractAddress, metaTx) {
	const merchantOwnerContract = getMerchantOwnerContract(web3, merchantOwnerContractAddress)

	const encodedTx = merchantOwnerContract.methods
	.transferB2B(
		{ 
			token: metaTx.token, 
			senderMerchant: metaTx.senderMerchant, 
			senderOrderId: metaTx.senderOrderId, 
			recipientMerchant: metaTx.recipientMerchant, 
			recipientOrderId: metaTx.recipientOrderId, 
			amount: metaTx.amount 
		},
		metaTx.signature,
		smartWalletContractAddress,
	).encodeABI()

	return encodedTx
}

function encodeMetaTxTransferB2C(web3, merchantOwnerContractAddress, smartWalletContractAddress, metaTx) {
	const merchantOwnerContract = getMerchantOwnerContract(web3, merchantOwnerContractAddress)

	const encodedTx = merchantOwnerContract.methods
	.transferB2C(
		{ 
			token: metaTx.token, 
			senderMerchant: metaTx.senderMerchant, 
			senderOrderId: metaTx.senderOrderId, 
			recipient: metaTx.recipient, 
			amount: metaTx.amount, 
		},
		metaTx.signature,
		smartWalletContractAddress,
	).encodeABI()

	return encodedTx
}

function encodeMetaTxTransferB2B_ERC721(web3, merchantOwnerContractAddress, smartWalletContractAddress, metaTx) {
	const merchantOwnerContract = getMerchantOwnerContract(web3, merchantOwnerContractAddress)

	const encodedTx = merchantOwnerContract.methods
	.transferB2B_ERC721(
		{ 
			token: metaTx.token, 
			senderMerchant: metaTx.senderMerchant, 
			senderOrderId: metaTx.senderOrderId, 
			recipientMerchant: metaTx.recipientMerchant, 
			recipientOrderId: metaTx.recipientOrderId, 
			tokenId: metaTx.tokenId 
		},
		metaTx.signature,
		smartWalletContractAddress,
	).encodeABI()

	return encodedTx
}

function encodeMetaTxTransferB2C_ERC721(web3, merchantOwnerContractAddress, smartWalletContractAddress, metaTx) {
	const merchantOwnerContract = getMerchantOwnerContract(web3, merchantOwnerContractAddress)

	const encodedTx = merchantOwnerContract.methods
	.transferB2C_ERC721(
		{ 
			token: metaTx.token, 
			senderMerchant: metaTx.senderMerchant, 
			senderOrderId: metaTx.senderOrderId, 
			recipient: metaTx.recipient, 
			tokenId: metaTx.tokenId, 
		},
		metaTx.signature,
		smartWalletContractAddress,
	).encodeABI()

	return encodedTx
}

function encodeRedeemBlankCheckToMerchant(web3, smartWalletContractAddress, zippieWalletContractAddress, blankCheck, receipientMerchantId, recipientOrderId) {
	const smartWalletContract = getSmartWalletContract(web3, smartWalletContractAddress)

  const encodedTx = smartWalletContract.methods
	.redeemBlankCheckToMerchant(
		blankCheck,
		receipientMerchantId,
		recipientOrderId,
		zippieWalletContractAddress,
	).encodeABI()
	
	return encodedTx
}

function encodeRedeemBlankCheckToMerchant_ERC721(web3, smartWalletContractAddress, zippieWalletContractAddress, blankCheck, receipientMerchantId, recipientOrderId) {
	const smartWalletContract = getSmartWalletContract_ERC721(web3, smartWalletContractAddress)

  const encodedTx = smartWalletContract.methods
	.redeemBlankCheckToMerchant(
		blankCheck,
		receipientMerchantId,
		recipientOrderId,
		zippieWalletContractAddress,
	).encodeABI()
	
	return encodedTx
}

function encodeMetaTxMintToken(web3, merchantOwnerContractAddress, metaTx) {
	const merchantOwnerContract = getMerchantOwnerContract(web3, merchantOwnerContractAddress)

	const encodedTx = merchantOwnerContract.methods
	.mintToken(
		metaTx.token,  
		metaTx.recipient, 
		metaTx.amount,
		metaTx.signature
	).encodeABI()

	return encodedTx
}

function encodeMetaTxMintToken_ERC721(web3, merchantOwnerContractAddress, metaTx) {
	const merchantOwnerContract = getMerchantOwnerContract(web3, merchantOwnerContractAddress)

	const encodedTx = merchantOwnerContract.methods
	.mintToken_ERC721(
		metaTx.token,  
		metaTx.recipient, 
		metaTx.tokenId,
		metaTx.tokenURI,
		metaTx.signature
	).encodeABI()

	return encodedTx
}

function encodeMetaTxApproveTransferFrom_ERC721(web3, merchantOwnerContractAddress, metaTx) {
	const merchantOwnerContract = getMerchantOwnerContract(web3, merchantOwnerContractAddress)

	const encodedTx = merchantOwnerContract.methods
	.approveTransferFrom_ERC721(
		metaTx.token,  
		metaTx.from,
		metaTx.to, 
		metaTx.tokenId,
		metaTx.metadata,
		metaTx.signature
	).encodeABI()

	return encodedTx
}

function encodeMetaTxRejectTransferFrom_ERC721(web3, merchantOwnerContractAddress, metaTx) {
	const merchantOwnerContract = getMerchantOwnerContract(web3, merchantOwnerContractAddress)

	const encodedTx = merchantOwnerContract.methods
	.rejectTransferFrom_ERC721(
		metaTx.token,  
		metaTx.from,
		metaTx.to, 
		metaTx.tokenId,
		metaTx.metadata,
		metaTx.signature
	).encodeABI()

	return encodedTx
}

function encodeMetaTxUpdateEnsContentHash(web3, merchantOwnerContractAddress, metaTx) {
	const merchantOwnerContract = getMerchantOwnerContract(web3, merchantOwnerContractAddress)

	const encodedTx = merchantOwnerContract.methods
	.updateEnsContentHash(
		metaTx.ensResolver,  
		metaTx.ensNode, 
		metaTx.contentHash,
		metaTx.signature
	).encodeABI()

	return encodedTx
}

function decodeMetaTxTransferB2B(web3, encodedMetaTx) {
  const inputTypes = zippie_merchant_owner_abi.find(
    (item) => item.name === 'transferB2B',
  ).inputs

	const params = web3.eth.abi.decodeParameters(inputTypes, encodedMetaTx.slice(10))
	return params
}

function decodeMetaTxTransferB2C(web3, encodedMetaTx) {
  const inputTypes = zippie_merchant_owner_abi.find(
    (item) => item.name === 'transferB2C',
  ).inputs

	const params = web3.eth.abi.decodeParameters(inputTypes, encodedMetaTx.slice(10))
	return params
}

function decodeMetaTxTransferB2B_ERC721(web3, encodedMetaTx) {
  const inputTypes = zippie_merchant_owner_abi.find(
    (item) => item.name === 'transferB2B_ERC721',
  ).inputs

	const params = web3.eth.abi.decodeParameters(inputTypes, encodedMetaTx.slice(10))
	return params
}

function decodeMetaTxTransferB2C_ERC721(web3, encodedMetaTx) {
  const inputTypes = zippie_merchant_owner_abi.find(
    (item) => item.name === 'transferB2C_ERC721',
  ).inputs

	const params = web3.eth.abi.decodeParameters(inputTypes, encodedMetaTx.slice(10))
	return params
}

function decodeRedeemBlankCheckToMerchant(web3, encodedTx) {
  const inputTypes = zippie_smart_wallet_abi.find(
    (item) => item.name === 'redeemBlankCheckToMerchant',
  ).inputs

	const params = web3.eth.abi.decodeParameters(inputTypes, encodedTx.slice(10))
	return params
}

function decodeRedeemBlankCheckToMerchant_ERC721(web3, encodedTx) {
  const inputTypes = zippie_smart_wallet_erc721_abi.find(
    (item) => item.name === 'redeemBlankCheckToMerchant',
  ).inputs

	const params = web3.eth.abi.decodeParameters(inputTypes, encodedTx.slice(10))
	return params
}

function decodeMetaTxMintToken(web3, encodedMetaTx) {
  const inputTypes = zippie_merchant_owner_abi.find(
    (item) => item.name === 'mintToken',
  ).inputs

	const params = web3.eth.abi.decodeParameters(inputTypes, encodedMetaTx.slice(10))
	return params
}

function decodeMetaTxMintToken_ERC721(web3, encodedMetaTx) {
  const inputTypes = zippie_merchant_owner_abi.find(
    (item) => item.name === 'mintToken_ERC721',
  ).inputs

	const params = web3.eth.abi.decodeParameters(inputTypes, encodedMetaTx.slice(10))
	return params
}

function decodeMetaTxApproveTransferFrom_ERC721(web3, encodedMetaTx) {
  const inputTypes = zippie_merchant_owner_abi.find(
    (item) => item.name === 'approveTransferFrom_ERC721',
  ).inputs

	const params = web3.eth.abi.decodeParameters(inputTypes, encodedMetaTx.slice(10))
	return params
}

function decodeMetaTxRejectTransferFrom_ERC721(web3, encodedMetaTx) {
  const inputTypes = zippie_merchant_owner_abi.find(
    (item) => item.name === 'rejectTransferFrom_ERC721',
  ).inputs

	const params = web3.eth.abi.decodeParameters(inputTypes, encodedMetaTx.slice(10))
	return params
}


function decodeMetaTxUpdateEnsContentHash(web3, encodedMetaTx) {
  const inputTypes = zippie_merchant_owner_abi.find(
    (item) => item.name === 'updateEnsContentHash',
  ).inputs

	const params = web3.eth.abi.decodeParameters(inputTypes, encodedMetaTx.slice(10))
	return params
}

function decodeEventTransferB2B(web3, data, topics) {
  const inputTypes = zippie_smart_wallet_abi.find(
    (item) => item.name === 'TransferB2B',
  ).inputs

	const params = web3.eth.abi.decodeLog(inputTypes, data, topics.slice(1))
	return params
}

function decodeEventTransferC2B(web3, data, topics) {
  const inputTypes = zippie_smart_wallet_abi.find(
    (item) => item.name === 'TransferC2B',
  ).inputs

	const params = web3.eth.abi.decodeLog(inputTypes, data, topics.slice(1))
	return params
}

function decodeEventTransferB2C(web3, data, topics) {
  const inputTypes = zippie_smart_wallet_abi.find(
    (item) => item.name === 'TransferB2C',
  ).inputs

	const params = web3.eth.abi.decodeLog(inputTypes, data, topics.slice(1))
	return params
}

function signMetaTx(web3, signerPrivateKey, metaTx) {
	const signature = web3.eth.accounts.sign(metaTx.hash, signerPrivateKey)
	return { ...metaTx, signature: { r: signature.r, s: signature.s, v: web3.utils.hexToNumber(signature.v) }}
}

function recoverMetaTx(web3, metaTx, signature) {
	const signer = web3.eth.accounts.recover(metaTx.hash, web3.utils.toHex(signature.v), signature.r, signature.s)
	return signer
}

module.exports = {
	getAccountAddress,
	getAccountAddress_ERC721,
	checkMerchantRegistryPermissions,
	checkMerchantOwnerPermissions,
	createMetaTxTransferB2B,
	createMetaTxTransferB2C,
	createMetaTxTransferB2B_ERC721,
	createMetaTxTransferB2C_ERC721,
	createMetaTxMintToken,
	createMetaTxMintToken_ERC721,
	createMetaTxApproveTransferFrom_ERC721,
	createMetaTxRejectTransferFrom_ERC721,
	createMetaTxUpdateEnsContentHash,
	encodeMetaTxTransferB2B,
	encodeMetaTxTransferB2C,
	encodeMetaTxTransferB2B_ERC721,
	encodeMetaTxTransferB2C_ERC721,
	encodeRedeemBlankCheckToMerchant,
	encodeRedeemBlankCheckToMerchant_ERC721,
	encodeMetaTxMintToken,
	encodeMetaTxMintToken_ERC721,
	encodeMetaTxApproveTransferFrom_ERC721,
	encodeMetaTxRejectTransferFrom_ERC721,
	encodeMetaTxUpdateEnsContentHash,
	decodeMetaTxTransferB2B,
	decodeMetaTxTransferB2C,
	decodeMetaTxTransferB2B_ERC721,
	decodeMetaTxTransferB2C_ERC721,
	decodeRedeemBlankCheckToMerchant,
	decodeRedeemBlankCheckToMerchant_ERC721,
	decodeMetaTxMintToken,
	decodeMetaTxMintToken_ERC721,
	decodeMetaTxApproveTransferFrom_ERC721,
	decodeMetaTxRejectTransferFrom_ERC721,
	decodeMetaTxUpdateEnsContentHash,
	decodeEventTransferB2B,
	decodeEventTransferC2B,
	decodeEventTransferB2C,
	signMetaTx,
	recoverMetaTx,
}
