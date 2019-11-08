const zippieMultisig = require('./wallet_v2')

let _web3
let _interval = 10000
let _log

let _orders = []

function log(message) {
    if(_log) {
        _log(message)
    }
}

function init(web3, pollInterval, initialOrders, logFn) {
    _web3 = web3
    _interval = pollInterval
    _log = logFn
    _orders = initialOrders
}

function addOrder(checkInfo, resolve, reject) {
    _orders.push({checkInfo, resolve, reject})
}

async function checkOrder(checkInfo) {
    const tokensClaimed = await zippieMultisig.isBlankCheckRedeemed(_web3, 
        checkInfo.multisigAccount.contractAddress, 
        checkInfo.multisigAccount.accountAddress, 
        checkInfo.check.verificationKey.address)

        return tokensClaimed
}

async function startWorker() {

    const toProcess = _orders.filter(o => {
        return !o.checkInfo.isClaimed
    })

    toProcess.forEach(async order => {
        const isClaimed = await checkOrder(order.checkInfo)

        const i = _orders.findIndex(order)
        _orders[i].checkInfo.isClaimed = isClaimed

        if(isClaimed) {
            order.resolve()
        }
    })

    setTimeout(startWorker, _interval)
}

module.exports = {
    init,
    addOrder,
    startWorker
}