const createBlock = require('./createBlock');
const saveChain = require('./saveChain');
const broadcast = require('./broadcast');
const loadBlockchain = require('./loadBlockchain');

const MESSAGE_TYPE = {
    TX: "TX",
    BLOCK: "BLOCK"
};

export function handleMessage(message, nodeId) {
  let blockchain = loadBlockchain();
  switch (message.type) {
    case MESSAGE_TYPE.TX:
      // 1. アナウンス
      // 署名検証や事実確認が今後必要
      console.log(`[${nodeId}] announce tx!`);
      broadcast(message);
      // 2. マイニングスタート(見つけたものはblockへ)
      console.log(`[${nodeId}] start mining`);
      // message.dataにはtxが入っていると仮定
      const block = createBlock(message.data);
      // 3. blockchainにblockを追加してjsonに保存
      // 既存チェーンにマイニング結果を追加
      blockchain.push(block);
      // 追加後のチェーンを保存
      saveChain(blockchain);
      // 4. 計算済みブロックとしてアナウンス
      broadcast({
        type: MESSAGE_TYPE.BLOCK,
        data: block
      });

      break;

    case MESSAGE_TYPE.BLOCK:
      if (blockchain.find(b => b.hash === message.data.hash)) {
        return;
      } else if (isValidBlock(message.data, blockchain)) {
        blockchain.push(message.data);
        saveChain(blockchain);
        broadcast(message);
      }
      break;

  }
}

module.exports = handleMessage;
