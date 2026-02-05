const ioClient = require("socket.io-client");
const globals = require("./Functions/env");
const broadcast = require("./Functions/broadcast");

// 送信先ノードの URL
const targetNode = "http://localhost:3000"; // ここにTXを送る

// ソケット接続
const socket = ioClient(targetNode);

socket.on("connect", () => {
  console.log(`Connected to node ${targetNode}`);

  // 接続済みソケットを globals に入れる
  globals.SOCKETS = [socket];

  // TX 作成
  const txs = [
    { id: 0, from: "Alice", to: "Bob", amount: 10, timestamp: Date.now() },
    { id: 1, from: "Charlie", to: "Dave", amount: 5, timestamp: Date.now() },
  ];

  // TX 送信
  broadcast({ type: "TX", data: txs, nodeId: globals.PORT });
  console.log(`TXs sent:`, txs);

  // 送信後にソケット切断
  socket.disconnect();
  console.log("Socket disconnected, exiting...");
});
