class Block {
  constructor(index, prevHash, timestamp, txs, nonce, hash) {
    this.index = index;
    this.prevHash = prevHash;
    this.timestamp = timestamp;
    this.txs = txs;
    this.nonce = nonce;
    this.hash = hash;
  }
}

module.exports = Block;