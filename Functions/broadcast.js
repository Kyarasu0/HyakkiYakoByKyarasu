function broadcast(message) {
  sockets.forEach(s => {
    s.emit("message", message);
  });
}