const fs = require("fs");
const globals = require('./env');

function saveChain(blockchain) {
  fs.writeFileSync(`./Chains/chain_${globals.PORT}.json`, JSON.stringify(blockchain, null, 2));
}

module.exports = saveChain;