const ethers = require("ethers");

function getEthAddressFromPubkey(pubkey) {
  return ethers.utils.computeAddress("0x" + pubkey);
}

function fromWei(value, decimals) {
  return ethers.utils.formatUnits(value, decimals);
}

function toWei(value, decimals) {
  return ethers.utils.parseUnits(value, decimals);
}

module.exports = {
  getEthAddressFromPubkey,
  fromWei,
  toWei,
};
