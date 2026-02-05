const calculateHash = require("./calculateHash"); 
const DIFFICULTY = 2;

function isValidBlock(newBlock, blockchain) {
  const lastBlock = blockchain[blockchain.length - 1];

  // 1. index チェック
  if (newBlock.index !== lastBlock.index + 1) {
    console.log(`${lastBlock.index} + 1 != ${newBlock.index}: invalid index`);
    return false;
  }else{
    console.log(`${lastBlock.index} + 1 == ${newBlock.index}: valid index`);
  }

  // 2. prevHash チェック
  if (newBlock.prevHash !== lastBlock.hash) {
    console.log(`${lastBlock.hash} != ${newBlock.prevHash}: invalid prevHash`);
    return false;
  }else{
    console.log(`${lastBlock.hash} == ${newBlock.prevHash}: valid prevHash`);
  }

  // 3. hash 再計算チェック
  const recalculatedHash = calculateHash(
    newBlock.index,
    newBlock.prevHash,
    newBlock.timestamp,
    newBlock.txs,
    newBlock.nonce
  );

  if (newBlock.hash !== recalculatedHash) {
    console.log(`${recalculatedHash} != ${newBlock.hash}: invalid hash`);
    return false;
  }else{
    console.log(`${recalculatedHash} == ${newBlock.hash}: valid hash`);
  }

  // 4. PoW チェック
  if (!newBlock.hash.startsWith("0".repeat(DIFFICULTY))) {
    console.log(`${newBlock.hash}: invalid proof of work (Difficulty = 3)`);
    return false;
  }else{
    console.log(`${newBlock.hash}: valid proof of work (Difficulty = 3)`);
  }

  return true;
}

module.exports = isValidBlock;
