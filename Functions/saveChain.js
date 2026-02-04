const fs = require("fs");

function saveChain() {
  fs.writeFileSync(`../chain/chain_${PORT}.json`, JSON.stringify(blockchain, null, 2));
}