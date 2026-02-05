const fs = require("fs");

export function saveChain(blockchain) {
  fs.writeFileSync(`../chain/chain_${PORT}.json`, JSON.stringify(blockchain, null, 2));
}

module.exports = saveChain;