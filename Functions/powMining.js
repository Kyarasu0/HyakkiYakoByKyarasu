const calculateHash = require('./calculateHash');
const globals = require('./env');

async function powMining(block) {
  while (!block.hash.startsWith("0".repeat(globals.DIFFICULTY)) && !globals.STOP_MINING && globals.MINING) {
    block.nonce++;
    block.hash = calculateHash(
      block.index,
      block.prevHash,
      block.timestamp,
      block.txs,
      block.nonce
    );

    console.log(`nonce: ${block.nonce}, hash: ${block.hash}`);

    if (block.hash.startsWith("0".repeat(globals.DIFFICULTY))) {
      console.log("========== Block Found ==========");
      console.log(`nonce: ${block.nonce}, hash: ${block.hash}`);
      console.log("=================================");
      return block;
    }

    await new Promise(resolve => setImmediate(resolve));
  }
  // ここに来た = 中断
  console.log("⛏ mining aborted");
  return null;
}

module.exports = powMining;