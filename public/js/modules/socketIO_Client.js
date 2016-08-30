/**
 * @file SocketIO Client
 * @author MaxFqs, MaxDef
 * @module socketIO_Client
 */

module.exports = function(io){
    var socket = io.connect('http://192.168.1.245:8080');

    function getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
    }

    socket.emit('init', getCookie('userID'));

    socket.on('setOnline', function(userID){
        console.log("user ID: "+userID+" is now online");
    })

    socket.on('setOffline', function(userID){
        console.log("user ID: "+userID+" is now offline");
    })
};
