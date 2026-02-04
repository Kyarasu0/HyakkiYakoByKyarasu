const handleMessage = require('./handleMessage');

export function initSocket(sockets, socket, nodeId) {
    sockets.push(socket);

    socket.on("message", msg => {
        console.log(`[${nodeId}] received ${msg.type} from ${msg.nodeId}`);
        handleMessage(msg);
    });

    socket.on("disconnect", () => {
        const i = sockets.indexOf(socket);
        if (i !== -1) sockets.splice(i, 1);
    });
}

module.exports = initSocket;