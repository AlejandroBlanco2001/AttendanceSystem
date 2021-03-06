let io;
module.exports = {
    init: (server) => {
        // start socket.io server and cache io value
        io = require('socket.io')(server, {
            cors: {origin: '*'}
        });
        return io;
    },
    getio: () => {
        // return previously cached value
        if (!io) {
            throw new Error("must call .init(server) before you can call .getio()");
        }
        return io;
    }
}