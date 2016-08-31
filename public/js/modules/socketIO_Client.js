/**
 * @file SocketIO Client
 * @author MaxFqs, MaxDef
 * @module socketIO_Client
 */

module.exports = function(io){
    var socket = io.connect('http://192.168.1.245:8080');

    // Get userID from header
    var req = new XMLHttpRequest();
    req.open('GET', document.location, true);
    req.onreadystatechange = function(aEvt){
        if (req.readyState == 4) {
            var userID = req.getResponseHeader("userID");
            socket.emit('init', userID);
        };
    };
    req.send(null);

    // Socket event listener
    socket.on('setOnline', function(userID){
        $('.onlineUsers').append($('#user'+userID));
    });

    socket.on('setOffline', function(userID){
        $('.offlineUsers').append($('#user'+userID));
    });
};
