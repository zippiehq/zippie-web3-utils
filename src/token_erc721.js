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
  "event Transfer(address indexed from, address indexed to, uint256 tokenId)",
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

async function getTokenOwner(web3, tokenAddress, tokenId) {
  const contract = getTokenContract(web3, tokenAddress);
  const owner = await contract.ownerOf(tokenId);
  return owner.toLowerCase();
}

async function getTokenOfOwnerByIndex(web3, tokenAddress, accountAddress, index) {
  const contract = getTokenContract(web3, tokenAddress);
  const tokenId = await contract.tokenOfOwnerByIndex(accountAddress, index);
  return tokenId;
}

async function getTokenAllowance(web3, tokenAddress, accountAddress, contractAddress) {
  const contract = getTokenContract(web3, tokenAddress);
  const allowance = await contract.isApprovedForAll(
    accountAddress,
    contractAddress
  );
  return allowance;
}

async function getTokenDetails(web3, tokenAddress) {
  const contract = getTokenContract(web3, tokenAddress);
  const name = await contract.name();
  const symbol = await contract.symbol();

  return {
    address: tokenAddress,
    name: name !== undefined ? name : "Unknown",
    symbol: symbol !== undefined ? symbol : "ERC721",
  };
}

async function getTokenURI(web3, tokenAddress, tokenId) {
  const contract = getTokenContract(web3, tokenAddress);
  const uri = await contract.tokenURI(tokenId);

  return uri;
}

module.exports = {
  getTokenContract,
  getTokenBalance,
  getTokenOwner,
  getTokenOfOwnerByIndex,
  getTokenAllowance,
  getTokenDetails,
  getTokenURI,
};
