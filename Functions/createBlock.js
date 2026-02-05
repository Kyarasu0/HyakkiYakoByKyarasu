const powMining = require('./powMining');
const Block = require('./Block');
const loadBlockchain = require('./loadBlockchain');
const globals = require('./env');

async function createBlock(txs) {
    // マイニングを中断
    if (globals.STOP_MINING) {
      console.log("⛏ mining stopped");
      return null;
    }

    let blockchain = loadBlockchain();

    const prev = blockchain[blockchain.length - 1];
    const index = prev.index + 1;
    const timestamp = Date.now();
    let nonce = 0;
    let hash = "";

    let block = new Block(index, prev.hash, timestamp, txs, nonce, hash);
    return await powMining(block);
}

module.exports = createBlock;