/**
 * @file User factory
 * @author MaxFqs, MaxDef
 * @module user
 */

var allUsers = [];
var bdd = require('./bdd.js');

/**
 * @class User
 * @property {int}  id                        - User id
 * @property {string} pseudo                  - User pseudo
 * @property {array} sockets                  - User sockets
 * @property {boolean}  online                - Online status
 */
function User(userData) {
    this.id = userData.id;
    this.pseudo = userData.pseudo;

    this.sockets = [];
    this.online = false;

    allUsers.push(this);
};

/**
 * Set User offline.
 * @function
 * @param {socket} socket
 * @example setTimeout(User.setOffline, 3000, User);;
 */
User.prototype.setOffline = function(socket){
    // User has more then one socket opened
    // remove the one concerned by the disconnect callback and return.
    if(this.sockets.length > 1){
        this.removeSocket(socket);
        return;
    };

    //This function will be called by the setTimeout
    var callback = function(data){
        var User = data.User;
        var socket = data.socket;

        // User is still online,a new socket has been added
        if(User.sockets.length > 1){
            User.removeSocket(socket);
            return;
        };

        //User has only one socket left, delete it and set him offline
        socket.broadcast.emit('setOffline', User.id);
        User.removeSocket(socket);
        User.online = false;
        console.log(User.pseudo+" is set offline");
    };

    // We wait 3 sec before broadcasting change as reloading a page will
    // disconnect then reconnect an user and this should not be considered
    var User = this;
    setTimeout(callback, 3000, {User: User, socket: socket});
};

/**
 * Remove socket
 * @function
 * @param {socket} socket
 * @example User.removeSocket(socket);
 */
User.prototype.removeSocket = function(socket){
    var index = this.sockets.indexOf(socket);
    this.sockets.splice(index, 1);
    console.log("Remove socket n°"+index+" from user "+this.pseudo+" ("+this.sockets.length+" sockets left)");
};




/**
 * Destroy user
 * @function
 * @example bob.destroy();
 */
User.prototype.destroy = function(){
    var index = allUsers.indexOf(this);
    allUsers.splice(index, 1);
};

/**
 * Create registered users
 * @function
 * @example user.createUsers()
 */
exports.createUsers = function(){
    bdd.getUsers(function(users) {
        for (var i = 0; i < users.length; i++) {
            new User(users[i]);
        };
        console.log("users created: ");
        console.log(allUsers)
    });
};


/**
 * Return number of online users
 * @function
 * @returns {int}
 * @example var number = user.countOnline();
 */
exports.countOnline = function(){
    var count = 0;
    for (var i = 0; i < allUsers.length; i++){
        if(allUsers[i].online) count++
    }
    return count;
};

/**
 * Return user or false
 * @function
 * @returns {User | false}
 * @example var User = user.getUserByID(UserID);
 */
exports.getUserByID = function(id){
    for (var i = 0; i < allUsers.length; i++){
        if(allUsers[i].id == id) return allUsers[i]
    }
    return false;
};

/**
 * Return all users
 * @function
 * @returns {table}
 * @example
 * var allUsers = user.getAllUsers();
 * console.log(allUsers) >
 *      [ User { id: 1, pseudo: 'maxf', socket: null, online: false },
 *      User { id: 2, pseudo: 'maxdef', socket: null, online: false }]
 */
exports.getAllUsers = function(){
    return allUsers;
};
