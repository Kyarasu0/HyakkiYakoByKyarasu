const handleMessage = require('./handleMessage');
const globals = require('./env');

function initSocket(socket) {
    globals.SOCKETS.push(socket);

    socket.on("message", msg => {
        console.log(`[${globals.PORT}] received ${msg.type} from ${msg.nodeId}`);
        handleMessage(msg);
    });

    socket.on("disconnect", () => {
        const i = globals.SOCKETS.indexOf(socket);
        if (i !== -1) globals.SOCKETS.splice(i, 1);
    });
}

module.exports = initSocket;