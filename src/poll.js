let __web3 = null
let __interval = 10000
let __isRunning = false

function setup(web3, interval) {
    __web3 = web3
    __interval = interval
}

function start() {
    __isRunning = true
    sync()
}

function stop() {
    __isRunning = false
}

async function sync() {
    while(__isRunning) { 
        try {
            const block = await __web3.eth.getBlock('latest')
        } catch(error) {

        }

        await timeout(__interval)
    }    
}

function timeout (duration) {
    return new Promise(resolve => {
      setTimeout(resolve, duration)
    })
  }

  module.exports = {setup, start, stop}