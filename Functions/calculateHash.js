const crypto = require("crypto");

function calculateHash(index, prevHash, timestamp, txs, nonce) {
  return crypto
    .createHash("sha256")
    .update(index + prevHash + timestamp + JSON.stringify(txs) + nonce)
    .digest("hex");
}

module.exports = calculateHash;