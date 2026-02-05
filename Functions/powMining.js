const calculateHash = require('./calculateHash');
const DIFFICULTY = 2;
const globals = require('./env');

function powMining(block) {
  while (!block.hash.startsWith("0".repeat(DIFFICULTY)) && !globals.STOP_MINING && globals.MINING) {
    block.nonce++;
    block.hash = calculateHash(
      block.index,
      block.prevHash,
      block.timestamp,
      block.txs,
      block.nonce
    );

    console.log(`nonce: ${block.nonce}, hash: ${block.hash}`);
  }
  console.log("========== Block Found ==========");
  console.log(`nonce: ${block.nonce}, hash: ${block.hash}`);
  console.log("=================================");
  return block;
}

module.exports = powMining;