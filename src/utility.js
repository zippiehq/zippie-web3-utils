const ethers = require("ethers");

function getEthAddressFromPubkey(pubkey) {
  return ethers.utils.computeAddress("0x" + pubkey);
}

function getAbiParameterArrayEncodePacked(web3, dataArray) {
  let packedData = "";
  for (let i = 0; i < dataArray.length; i++) {
    packedData = packedData + web3.utils.padLeft(dataArray[i], 64).slice(2);
  }
  return packedData;
}

function fromWei(web3, value, decimals) {
  return ethers.utils.formatUnits(value, decimals);
}

function toWei(web3, value, decimals) {
  return ethers.utils.parseUnits(value, decimals);
}

module.exports = {
  getEthAddressFromPubkey,
  getAbiParameterArrayEncodePacked,
  fromWei,
  toWei,
};
