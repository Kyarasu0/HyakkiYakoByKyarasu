const MESSAGE_TYPE = {
    TX: "TX",
    BLOCK: "BLOCK"
};

export function handleMessage(message, nodeId) {
  switch (message.type) {
    case MESSAGE_TYPE.TX:
      // 1. アナウンス
      // 署名検証や事実確認が今後必要
      console.log(`[${nodeId}] announce tx!`);
      broadcast(message);
      // 2. マイニングスタート
      console.log(`[${nodeId}] start mining`);
      // message.dataにはtxが入っていると仮定
      createBlock(message.data);
      // 3. jsonに追加
      // 4. 計算済みブロックとしてアナウンス
      break;

    case MESSAGE_TYPE.BLOCK:
      // 1. ブロックの確認
      if (isValidBlock(message.data)) {
        // 2. 正しければ自分のにも追加
        // 計算処理中断するか？
        blockchain.push(message.data);
        // 3. アナウンス
        broadcast(message);
      }
      break;
  }
}

module.exports = handleMessage;
