const ethers = require("ethers");

const abi = [
  // Read-Only Functions
  "function balanceOf(address owner) view returns (uint256)",
  "function ownerOf(uint256 tokenId) view returns (address)",
  "function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)",
  "function isApprovedForAll(address owner, address operator) view returns (bool)",
  "function symbol() view returns (string)",
  "function name() view returns (string)",
  "function tokenURI(uint256 tokenId) view returns (string)",

  // Authenticated Functions
  "function transferFrom(address from, address to, uint256 tokenId) returns (bool)",

  // Events
  "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
];

function getTokenContract(ethersProvider, tokenAddress) {
  return new ethers.Contract(tokenAddress, abi, ethersProvider);
}

async function getTokenBalance(ethersProvider, accountAddress, tokenAddress) {
  const contract = getTokenContract(ethersProvider, tokenAddress);
  const balance = await contract.balanceOf(accountAddress);

  return balance;
}

async function getTokenOwner(ethersProvider, tokenAddress, tokenId) {
  const contract = getTokenContract(ethersProvider, tokenAddress);
  const owner = await contract.ownerOf(tokenId);
  return owner
}

async function getTokenOfOwnerByIndex(ethersProvider, tokenAddress, accountAddress, index) {
  const contract = getTokenContract(ethersProvider, tokenAddress);
  const tokenId = await contract.tokenOfOwnerByIndex(accountAddress, index);
  return tokenId.toString();
}

async function getTokenAllowance(ethersProvider, tokenAddress, accountAddress, contractAddress) {
  const contract = getTokenContract(ethersProvider, tokenAddress);
  const allowance = await contract.isApprovedForAll(
    accountAddress,
    contractAddress
  );
  return allowance;
}

async function getTokenDetails(ethersProvider, tokenAddress) {
  const contract = getTokenContract(ethersProvider, tokenAddress);
  const name = await contract.name();
  const symbol = await contract.symbol();

  return {
    address: tokenAddress,
    name: name !== undefined ? name : "Unknown",
    symbol: symbol !== undefined ? symbol : "ERC721",
  };
}

async function getTokenURI(ethersProvider, tokenAddress, tokenId) {
  const contract = getTokenContract(ethersProvider, tokenAddress);
  const uri = await contract.tokenURI(tokenId);

  return uri;
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
  getTokenOwner,
  getTokenOfOwnerByIndex,
  getTokenAllowance,
  getTokenDetails,
  getTokenURI,
  getTokenTransactions,
};
