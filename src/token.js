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

function getTokenContract(ethersProvider, tokenAddress) {
  return new ethers.Contract(tokenAddress, abi, ethersProvider);
}

async function getTokenBalance(ethersProvider, accountAddress, tokenAddress) {
  const contract = getTokenContract(ethersProvider, tokenAddress);
  const balance = await contract.balanceOf(accountAddress);

  return balance.toString();
}

async function getTokenDetails(ethersProvider, tokenAddress) {
  const contract = getTokenContract(ethersProvider, tokenAddress);
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

async function getTokenTransactions(ethersProvider, accountAddress, tokenAddress, fromBlock = 0) {
  const contract = getTokenContract(ethersProvider, tokenAddress);
  const filterFrom = contract.filters.Transfer(accountAddress);
  const logsFrom = await contract.queryFilter(filterFrom, fromBlock, "latest");
  const filterTo = contract.filters.Transfer(null, accountAddress);
  const logsTo = await contract.queryFilter(filterTo, fromBlock, "latest");
  const logsAll = logsFrom.concat(logsTo)
  return logsAll;
}

module.exports = {
  getTokenContract,
  getTokenBalance,
  getTokenDetails,
  getTokenTransactions,
};
