const tokenContract = require('./contracts/erc20ContractAbiJson')

const topicTransferFrom =
  '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'

function getTokenContract(web3, tokenAddress) {
    return new web3.eth.Contract(tokenContract.getErc20ContractAbiJson(), tokenAddress)
}

/**
 * 
 * @param {*} web3 
 * @param {*} accountAddress 
 * @param {*} tokenAddress 
 */
async function getTokenBalance(web3, accountAddress, tokenAddress) {
    const contract = getTokenContract(web3, tokenAddress)
    const balance = await contract.methods.balanceOf(accountAddress).call()

    return balance
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
  const allowance = await contract.methods.allowance(accountAddress, contractAddress).call()
  return allowance
}

/**
 * 
 * @param {*} web3 
 * @param {*} value 
 * @param {*} decimals 
 * @returns Value in ETH
 */
function fromWei(web3, value, decimals) {
    const divisor = web3.utils.toBN("10").pow(web3.utils.toBN(decimals))
    const integerValue = web3.utils.toBN(value).div(divisor)
    const decimalValue = web3.utils.toBN(value).sub(integerValue.mul(divisor))
    return `${integerValue.toString()}.${decimalValue.toString()}`
  }
  
  /**
   * 
   * @param {*} web3 
   * @param {*} value 
   * @param {*} decimals 
   * @returns value in Wei
   */
  function toWei(web3, value, decimals) {
    let decimalsInValue = 0
    if (value.indexOf(".") !== -1) {
      decimalsInValue = value.length - value.indexOf(".") - 1 
      if (decimalsInValue > parseInt(decimals)) {
        return "0"
      }
    }
    return web3.utils.toBN(value.replace(".", "")).mul(web3.utils.toBN("10").pow(web3.utils.toBN(decimals-decimalsInValue))).toString()
  
  }

  /**
   * 
   * @param {*} web3 
   * @param {*} accountAddress 
   * @param {*} tokenAddress 
   * @returns {}
   */
  function waitForTokenEvent(web3, accountAddress, tokenAddress) {
    return new Promise(resolve, reject => {
      let finishedFlag = false
  
      const accountAddressAsByte32 = web3.utils.padLeft(
        accountAddress.toLowerCase(),
        64
      )
      const subscription = web3.eth
        .subscribe(
          'logs',
          {
            address: tokenAddress,
            topics: [topicTransferFrom, null, accountAddressAsByte32]
          },
          function(error, result) {
            if (error) {
              console.error(error)
            }
          }
        )
        .on('data', async function(data) {
          finishedFlag = true
          subscription.unsubscribe()
          resolve({ status: 'ok' })
        })
  
      setTimeout(function() {
        if (finishedFlag === false) {
          subscription.unsubscribe()
          reject({ error: 'Timeout' })
        }
      }, 60 * 1000)
    })
  }

  /**
   * 
   * @param {*} web3 
   * @param {*} tokenAddress 
   * @returns {address, name, symbol, decimals}
   */
  async function getTokenDetails(web3, tokenAddress) {
    const erc20TokenContract = getTokenContract(web3, tokenAddress)
    const name = await erc20TokenContract.methods.name().call()
    const symbol = await erc20TokenContract.methods.symbol().call()
    const decimals = await erc20TokenContract.methods.decimals().call()
  
    return {
      address: tokenAddress,
      name: name !== undefined ? name : 'Unknown',
      symbol: symbol !== undefined ? symbol : 'ERC20',
      decimals: decimals !== undefined ? decimals : '18',
    }
  }

  async function getTokenTransactions(web3, tokenAddress, accountAddress, blockNumber) {
  
    const addressAsByte32 = web3.utils.padLeft(accountAddress.toLowerCase(), 64)
    const topicsFrom = [topicTransferFrom, addressAsByte32, null]
    const topicsTo = [topicTransferFrom, null, addressAsByte32]
  
    // Fetch new ERC20 transfer events (sent)
    const transferFromEvents = await web3.eth.getPastLogs({
      fromBlock: web3.utils.toHex(blockNumber + 1),
      toBlock: 'latest',
      address: [tokenAddress],
      topics: topicsFrom,
    })
  
    // Fetch new ERC20 transfer events (received)
    const transferToEvents = await web3.eth.getPastLogs({
      fromBlock: web3.utils.toHex(blockNumber + 1),
      toBlock: 'latest',
      address: [tokenAddress],
      topics: topicsTo,
    })
  
    // Wait and concatenate events
    let erc20TokenTransactions = []
    erc20TokenTransactions = concatEventsToTransactions(erc20TokenTransactions, transferFromEvents, 'ERC20', 'Sent')
    erc20TokenTransactions = concatEventsToTransactions(erc20TokenTransactions, transferToEvents, 'ERC20', 'Received')
  
    // Fetch transaction and block data in parallel
    const erc20TokenTransactionsPromises = erc20TokenTransactions.map(async erc20TokenTransaction => {
      const blockData = await getBlockData(web3, erc20TokenTransaction.blockNumber)
      erc20TokenTransaction.timestamp = blockData.timestamp
  
      return erc20TokenTransaction
    })
  
    // Wait for transaction data
    const erc20TokenTransactionsWithData = await Promise.all(erc20TokenTransactionsPromises)
  
    // Sort events (blockNumber DESC)
    const erc20TokenTransactionsSorted = erc20TokenTransactionsWithData.sort(function(a, b) {
      return b.blockNumber - a.blockNumber
    })
  
    return erc20TokenTransactionsSorted
  }

  function concatEventsToTransactions(currentTransactions, events, currency, type) {
    events.forEach(event => {
      currentTransactions.unshift({
        id: event.transactionHash + ':' + type,
        amount: event.data,
        currency: currency,
        type: type,
        blockNumber: event.blockNumber,
        transactionHash: event.transactionHash,
        message: type,
        timestamp: undefined,
      })
    })
    return currentTransactions
  }

  async function getTransactionData(web3, transactionHash) {
    const txData = await web3.eth.getTransaction(transactionHash)
    return txData
  }

  async function getBlockData(web3, blockNumber) {
    const blockData = await web3.eth.getBlock(blockNumber)
    return blockData
  }

  module.exports = {
    fromWei,
    toWei,
    getTokenContract,
    getTokenBalance,
    getTokenAllowance,
    getTokenTransactions,
    getTransactionData,
    getTokenDetails,
    waitForTokenEvent,
   }