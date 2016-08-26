/**
 * @file SocketIO (socket config)
 * @author MaxFqs, MaxDef
 * @module socketIO
 */

var initDone = false;

module.exports = function(server){

if(initDone) return; // only run this once

var io = require('socket.io')(server);
io.sockets.on('connection', function(socket) {
    console.log("new connection")

    socket.on('disconnect', function () {
        console.log("user disconnect")
    });

});

initDone = true;

};
