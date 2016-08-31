/**
 * @file SocketIO (socket config)
 * @author MaxFqs, MaxDef
 * @module socketIO
 */

var initDone = false;

module.exports = function(server){

if(initDone) return; // only run this once

var io = require('socket.io')(server);
var bdd = require('./bdd.js');
var user = require('./user.js');

io.sockets.on('connection', function(socket){
    var User = false;

    socket.on('init', function(userID){
        User = user.getUserByID(userID); // Init User var
        User.setOnline(socket);
    });

    socket.on('disconnect', function () {
        if(User) {
            User.setOffline(socket);
            User = false;
            return;
        };
    });

    socket.on('registerMessage', function(data){
        var getMessageCallback = function(data){
            socket.emit('newMessage', data);
            socket.broadcast.emit('newMessage', data);
        };
        var registerCallback = function(id){
            bdd.getMessageByID({chanID: 1, id: id}, getMessageCallback);
        };

        bdd.registerMessage({chanID: data.chanID, message: data.message, userID: User.id}, registerCallback);
    });

});

initDone = true;

};
