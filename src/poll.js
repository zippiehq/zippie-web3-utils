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
            reconnect()
        }

        await timeout(__interval)
    }    
}

function timeout (duration) {
    return new Promise(resolve => {
      setTimeout(resolve, duration)
    })
  }

function reconnect () {
    if(__web3.currentProvider.connected === false) {
        const wsProvider = new __web3.providers.WebsocketProvider(__web3.currentProvider.connection._url)
        __web3.setProvider(wsProvider)
    }
}

module.exports = {setup, start, stop}
