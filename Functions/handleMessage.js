const createBlock = require('./createBlock');
const saveChain = require('./saveChain');
const broadcast = require('./broadcast');
const loadBlockchain = require('./loadBlockchain');
const isValidBlock = require('./isValidBlock');
const globals = require('./env');

const MESSAGE_TYPE = {
    TX: "TX",
    BLOCK: "BLOCK"
};

globals.STOP_MINING = false;

function handleMessage(message) {
  let blockchain = loadBlockchain();
  switch (message.type) {
    case MESSAGE_TYPE.TX:
      // すでに計算していたらやめる
      if (globals.MINING) return;

      // 計算開始
      globals.MINING = true;
      globals.STOP_MINING = false;

      // 1. アナウンス
      // 署名検証や事実確認が今後必要
      console.log(`[${globals.PORT}] announce tx!`);
      broadcast(message);
      // 2. マイニングスタート(見つけたものはblockへ)
      console.log(`[${globals.PORT}] start mining`);
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
        data: block,
        nodeId: globals.PORT
      });

      // 計算終了
      globals.MINING = false;
      break;

    case MESSAGE_TYPE.BLOCK:
      // 中断フラグ
      globals.STOP_MINING = true;

      // 1. すでに持っているblockは捨てる
      if (blockchain.find(b => b.hash === message.data.hash)) {
        return;
      } else if (isValidBlock(message.data, blockchain)) {
        // 2. blockchainにblockを追加してjsonに保存
        // ブロック確認後、既存チェーンにブロックを追加
        blockchain.push(message.data);
        // 追加後のチェーンを保存
        saveChain(blockchain);
        // 3. アナウンス
        broadcast(message);
      }

      // 中断フラグ解除
      globals.STOP_MINING = false;
      break;

  }
}

module.exports = handleMessage;
