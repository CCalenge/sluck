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
            // bdd.getMessages(1, function(dataArray){
            //     socket.emit("messageHistory", dataArray);
            // });
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

        socket.on('updateUser', function (data){
                bdd.updateUserData(data,function(result){
                    if(result){
                        //emit the user id and pseudo
                        User.pseudo = data.pseudo;
                        socket.broadcast.emit('updateUserPseudo',{pseudo:data.pseudo, id:User.id});
                    }
                });
        })

        socket.on('newChan', function (data){
            bdd.createChan(data, function(result){
                if(result){
                    socket.broadcast.emit('newChan',{newChan: result});
                }
            })
            bdd.createDBChan(data);
        })

        socket.on('chanClick',function(data){
            console.log(data.chan);
            bdd.getMessages(data.chan,function(result){
                console.log('result');
            })

        })

    });

    initDone = true;

};
