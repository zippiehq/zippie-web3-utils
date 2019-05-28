const { erc721_abi } = require('./contracts/erc721ContractAbi')

function getTokenContract(web3, tokenAddress) {
    return new web3.eth.Contract(erc721_abi, tokenAddress)
}

/**
 * 
 * @param {*} web3 
 * @param {*} accountAddress 
 * @param {*} tokenAddress 
 */
async function getTokenBalance(web3, tokenAddress, accountAddress) {
    const contract = getTokenContract(web3, tokenAddress)
    const balance = await contract.methods.balanceOf(accountAddress).call()

    return balance
}

/**
 * 
 * @param {*} web3 
 * @param {*} tokenAddress 
 * @param {*} accountAddress 
 * @param {*} index 
 */
async function getTokenOfOwnerByIndex(web3, tokenAddress, accountAddress, index) {
  const contract = getTokenContract(web3, tokenAddress)
  const tokenId = await contract.methods.tokenOfOwnerByIndex(accountAddress, index).call()
  return tokenId
}

/**
 * 
 * @param {*} web3 
 * @param {*} tokenAddress 
 * @param {*} accountAddress 
 * @param {*} contractAddress 
 */
async function getTokenAllowance(web3, tokenAddress, accountAddress, contractAddress) {
  const contract = getTokenContract(web3, tokenAddress)
  const allowance = await contract.methods.isApprovedForAll(accountAddress, contractAddress).call()
  return allowance
}

/**
 * 
 * @param {*} web3 
 * @param {*} tokenAddress 
 * @returns {address, name, symbol, decimals}
 */
async function getTokenDetails(web3, tokenAddress) {
  const erc721TokenContract = getTokenContract(web3, tokenAddress)
  const name = await erc721TokenContract.methods.name().call()
  const symbol = await erc721TokenContract.methods.symbol().call()

  return {
    address: tokenAddress,
    name: name !== undefined ? name : 'Unknown',
    symbol: symbol !== undefined ? symbol : 'ERC721',
  }
}

module.exports = {
  getTokenContract,
  getTokenBalance,
  getTokenOfOwnerByIndex,
  getTokenAllowance,
  getTokenDetails,
  }