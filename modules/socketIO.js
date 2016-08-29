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
            return console.log(User.pseudo+" disconnect")
        };
        console.log("Unknown user disconnect")
    });

});

initDone = true;

};
