const ethutil = require('ethereumjs-util')

function getEthAddressFromPubkey(pubkey) {
  const zippieCardAddressBuffer = ethutil.pubToAddress(Buffer.from(pubkey.slice(2), 'hex'))
  const zippieCardAddress = '0x' + Buffer.from(zippieCardAddressBuffer).toString('hex')
  return zippieCardAddress
}

function getAbiParameterArrayEncodePacked(web3, dataArray) {
    let packedData = ''
    for (let i = 0; i < dataArray.length; i++) {
      packedData = packedData + web3.utils.padLeft(dataArray[i], 64).slice(2)
    }
    return packedData
  }

  module.exports = {getEthAddressFromPubkey, getAbiParameterArrayEncodePacked}