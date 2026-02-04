const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const ioClient = require('socket.io-client');

// Functions
const initSocket = require('./Functions/initSocket');
const broadcast = require('./Functions/broadcast');
const calculateHash = require('./Functions/calculateHash');
const powMining = require('./Functions/powMining');

if (!process.argv[2] || !process.argv[3]) {
    console.log(`Usage: ${process.argv[0]} ${process.argv[1]} [PORT] [PEER_PORTS]`);
    process.exit(1);
}
const PORT = process.argv[2];
const PEER_PORTS = process.argv[3].split(",");
const PEERS = PEER_PORTS.map(
    port => `http://localhost:${port}`
);

const app = express();
const server = http.createServer(app);
const io = new Server(server);

server.listen(PORT, console.log(` Server is running at http://localhost:${PORT} `));

/* ===== 接続管理 ===== */
const sockets = [];

/* ===== socket.io server ===== */
io.on("connection", socket => {
  console.log(`[${PORT}] incoming peer!`);
  initSocket(sockets, socket, PORT);
});

/* ===== socket.io client ===== */
PEERS.forEach(peer => {
  const socket = ioClient(peer);
  socket.on("connect", () => {
    console.log(`[${PORT}] connected to ${peer}`);
    initSocket(sockets, socket, PORT);
  });
});