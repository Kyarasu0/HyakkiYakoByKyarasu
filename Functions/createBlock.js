const powMining = require('./powMining');
const Block = require('./Block');
const loadBlockchain = require('./loadBlockchain');

export function createBlock(txs) {
    blockchain = loadBlockchain();

    const prev = blockchain[blockchain.length - 1];
    const index = prev.index + 1;
    const timestamp = Date.now();
    let nonce = 0;
    let hash = "";

    let block = new Block(index, prev.hash, timestamp, txs, nonce, hash);
    return powMining(block);
}

module.exports = createBlock;
