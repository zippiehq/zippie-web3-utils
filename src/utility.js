const ethutil = require('ethereumjs-util')

function getEthAddressFromPubkey(pubkey) {
    const zippieCardAddressBuffer = ethutil.pubToAddress(Buffer.from(pubkey.slice(2), 'hex'))
    const zippieCardAddress = '0x' + Buffer.from(zippieCardAddressBuffer).toString('hex')
    return zippieCardAddress
  }

  module.exports = {getEthAddressFromPubkey}