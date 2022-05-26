const ethers = require("ethers");

const abi = [
  // Read-Only Functions
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function name() view returns (string)",

  // Authenticated Functions
  "function transfer(address to, uint amount) returns (bool)",

  // Events
  "event Transfer(address indexed from, address indexed to, uint amount)",
];

function getTokenContract(web3, tokenAddress) {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://localhost:8545"
  );
  return new ethers.Contract(tokenAddress, abi, provider);
}

async function getTokenBalance(web3, accountAddress, tokenAddress) {
  const contract = getTokenContract(web3, tokenAddress);
  const balance = await contract.balanceOf(accountAddress);

  return balance;
}

async function getTokenDetails(web3, tokenAddress) {
  const contract = getTokenContract(web3, tokenAddress);
  const name = await contract.name();
  const symbol = await contract.symbol();
  const decimals = await contract.decimals();

  return {
    address: tokenAddress,
    name: name !== undefined ? name : "Unknown",
    symbol: symbol !== undefined ? symbol : "ERC20",
    decimals: decimals !== undefined ? decimals : "18",
  };
}

module.exports = {
  getTokenContract,
  getTokenBalance,
  getTokenDetails,
};
