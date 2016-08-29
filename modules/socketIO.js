/**
 * @file SocketIO (socket config)
 * @author MaxFqs, MaxDef
 * @module socketIO
 */

var initDone = false;

module.exports = function(server){

if(initDone) return; // only run this once

var io = require('socket.io')(server);
var user = require('./user.js');

io.sockets.on('connection', function(socket) {
    var User = false;
    console.log("Unknown user connected");

    socket.on('init', function(userID){
        User = user.getUserByID(userID);
        User.socket = socket;
        User.online = true;
        console.log(User.pseudo+" is connected");
        console.log(user.countOnline()+" users online");
    });

    socket.on('disconnect', function () {
        if(User) {
            User.online = false;
            // We wait 3 sec before broadcasting change as reloading a page will
            // disconnect then reconnect an user and this should not be considered
            setTimeout(User.setOffline, 3000, User);
        };
        console.log("Unknown user disconnect")
    });

});

initDone = true;

};
