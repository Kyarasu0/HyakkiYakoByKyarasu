const globals = require('./env');

function broadcast(message) {
  globals.SOCKETS.forEach(s => {
    s.emit("message", message);
  });
}

module.exports = broadcast;