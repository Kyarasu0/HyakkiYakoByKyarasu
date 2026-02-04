export function loadBlockchain() {
    const path = `../Chains/chain_${PORT}.json`;

    if (!fs.existsSync(path)) {
        throw new Error("chain file not found");
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