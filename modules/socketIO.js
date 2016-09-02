/**
 * @file SocketIO (socket config)
 * @author MaxFqs, MaxDef
 * @module socketIO
 */

var initDone = false;

module.exports = function(server) {

    if (initDone) return; // only run this once

    var io = require('socket.io')(server);
    var bdd = require('./bdd.js');
    var user = require('./user.js');

    io.sockets.on('connection', function(socket) {
        var User = false;

        socket.on('init', function(userID) {
            User = user.getUserByID(userID); // Init User var
            User.setOnline(socket);
        });

        socket.on('disconnect', function() {
            if (User) {
                User.setOffline(socket);
                User = false;
                return;
            };
        });

        socket.on('askUserInfo', function(data,callback) {

            bdd.getUsersData(data,function(result){
                socket.emit('returnUserData',result);
            });
        });
        socket.on('registerMessage', function(data) {
            User.registerMessage(data);
        });

    });

    initDone = true;

};
