/**
 * @file SocketIO Client
 * @author MaxFqs, MaxDef
 * @module socketIO_Client
 */

module.exports = function(io){
    var host = require('./host.js');
    var socket = io.connect(host.getHost());
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
    socket.on('updateUserPseudo',function(result){
        $('#user'+result.id).text(result.pseudo);
    });
    socket.on('newChan', function(result){
        $('.listeChans').append('<li id='+result.newChan+'>'+result.newChan+'</li>');
    })
};
