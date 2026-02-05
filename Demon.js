const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const ioClient = require('socket.io-client');
const globals = require('./Functions/env');

// Functions
const initSocket = require('./Functions/initSocket');

if (!process.argv[2] || !process.argv[3]) {
    console.log(`Usage: ${process.argv[0]} ${process.argv[1]} [PORT] [PEER_PORTS]`);
    process.exit(1);
}
globals.PORT = process.argv[2];
const PEER_PORTS = process.argv[3].split(",");
const PEERS = PEER_PORTS.map(
    port => `http://localhost:${port}`
);

const app = express();
const server = http.createServer(app);
const io = new Server(server);

server.listen(globals.PORT, console.log(` Server is running at http://localhost:${globals.PORT} `));

/* ===== socket.io server ===== */
io.on("connection", socket => {
  console.log(`[${globals.PORT}] incoming peer!`);
  initSocket(socket);
});

/* ===== socket.io client ===== */
PEERS.forEach(peer => {
  const socket = ioClient(peer);
  socket.on("connect", () => {
    console.log(`[${globals.PORT}] connected to ${peer}`);
    initSocket(socket);
  });
});