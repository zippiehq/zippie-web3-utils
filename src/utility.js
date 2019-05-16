const ethutil = require('ethereumjs-util')

const multisigContracts = {
  kovan : {
    '0x1FA9386D9B36aB866fe9d8fA958a41B83413B99B': {
      creationBlock: 0,
      version: 'v1'
    },
    '0xEEc94D4d1071fBab9D08cAd01a854301DBbf0C5B': {
      creationBlock: 0,
      version: 'v2'
    } 
  },
  goerli: {

  }
}

function getEthAddressFromPubkey(pubkey) {
  const zippieCardAddressBuffer = ethutil.pubToAddress(Buffer.from(pubkey.slice(2), 'hex'))
  const zippieCardAddress = '0x' + Buffer.from(zippieCardAddressBuffer).toString('hex')
  return zippieCardAddress
}

function getEthAddressFromTransactionTopic(topic) {
  return '0x' + topic.slice(26)
}

function getAbiParameterArrayEncodePacked(web3, dataArray) {
    let packedData = ''
    for (let i = 0; i < dataArray.length; i++) {
      packedData = packedData + web3.utils.padLeft(dataArray[i], 64).slice(2)
    }
    return packedData
  }

  module.exports = {
    getEthAddressFromPubkey, 
    getAbiParameterArrayEncodePacked,
    getEthAddressFromTransactionTopic
  }