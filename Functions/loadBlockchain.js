const fs = require("fs");
const Block = require('./Block');
const globals = require('./env');
const saveChain = require('./saveChain');

function loadBlockchain() {
    const path = `./Chains/chain_${globals.PORT}.json`;

    // ファイルがなければ作る
    if (!fs.existsSync(path)) {
        console.log("chain file not found, creating genesis block...");

        // ジェネシスブロック
        const genesis = new Block(
            0,          // index
            "0",        // prevHash
            Date.now(), // timestamp
            [],         // txs
            0,          // nonce
            "0"         // hash
        );

        saveChain([genesis]);
        return [genesis];
    }

    const data = JSON.parse(fs.readFileSync(path));
        return data.map(b => new Block(
        b.index,
        b.prevHash,
        b.timestamp,
        b.txs,
        b.nonce,
        b.hash
    ));
}

module.exports = loadBlockchain;