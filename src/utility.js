const ethers = require('ethers')

function getEthAddressFromPubkey(pubkey) {
  return ethers.utils.computeAddress("0x" + pubkey)
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