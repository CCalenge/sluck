/**
 * @file SocketIO Client
 * @author MaxFqs, MaxDef
 * @module socketIO_Client
 */

module.exports = function(io){
    var socket = io.connect('http://localhost:8080');
    // var socket = io.connect('http://192.168.1.245:8080');
    var User = require('./user.js').getUser();

    User.socket = socket;
    socket.emit('init', User.id);

    // Socket event listener
    socket.on('setOnline', function(userID){
        $('.onlineUsers').append($('#user'+userID));
    });

    socket.on('setOffline', function(userID){
        $('.offlineUsers').append($('#user'+userID));
    });
};
