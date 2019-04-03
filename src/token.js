const tokenContract = require('./contracts/erc20ContractAbiJson')

function getTokenContract(web3, tokenAddress) {
    return new web3.eth.Contract(tokenContract.getErc20ContractAbiJson(), tokenAddress)
}

async function getTokenBalance(web3, accountAddress, tokenAddress) {
    const contract = getTokenContract(web3, tokenAddress)
    const balance = await contract.methods.balanceOf(accountAddress).call()

    return balance
}

function fromWei(value, decimals) {
    if (decimals === '0') {
      return Web3.utils.fromWei(value, 'wei')
    } else if (decimals === '3') {
      return Web3.utils.fromWei(value, 'kwei')
    } else if (decimals === '6') {
      return Web3.utils.fromWei(value, 'mwei')
    } else if (decimals === '9') {
      return Web3.utils.fromWei(value, 'gwei')
    } else if (decimals === '12') {
      return Web3.utils.fromWei(value, 'nanoether')
    } else if (decimals === '15') {
      return Web3.utils.fromWei(value, 'microether')
    } else if (decimals === '18') {
      return Web3.utils.fromWei(value, 'ether')
    } else if (decimals === '21') {
      return Web3.utils.fromWei(value, 'kether')
    } else if (decimals === '24') {
      return Web3.utils.fromWei(value, 'mether')
    } else if (decimals === '27') {
      return Web3.utils.fromWei(value, 'gether')
    } else if (decimals === '30') {
      return Web3.utils.fromWei(value, 'tether')
    } else {
      return 0
    }
  }
  
  function toWei(value, decimals) {
    if (decimals === '0') {
      return Web3.utils.toWei(value, 'wei')
    } else if (decimals === '3') {
      return Web3.utils.toWei(value, 'kwei')
    } else if (decimals === '6') {
      return Web3.utils.toWei(value, 'mwei')
    } else if (decimals === '9') {
      return Web3.utils.toWei(value, 'gwei')
    } else if (decimals === '12') {
      return Web3.utils.toWei(value, 'nanoether')
    } else if (decimals === '15') {
      return Web3.utils.toWei(value, 'microether')
    } else if (decimals === '18') {
      return Web3.utils.toWei(value, 'ether')
    } else if (decimals === '21') {
      return Web3.utils.toWei(value, 'kether')
    } else if (decimals === '24') {
      return Web3.utils.toWei(value, 'mether')
    } else if (decimals === '27') {
      return Web3.utils.toWei(value, 'gether')
    } else if (decimals === '30') {
      return Web3.utils.toWei(value, 'tether')
    } else {
      return 0
    }
  }

  module.exports = {fromWei, toWei, getTokenContract, getTokenBalance }