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
 * @property {object} socket                  - User socket
 * @property {boolean}  online                - Online status
 */
function User(userData) {
    this.id = userData.id;
    this.pseudo = userData.pseudo;

    this.socket = null;
    this.online = false;

    allUsers.push(this);
};

/**
 * Broadcast offline status.
 * Should be called with setTimeout.
 * @function
 * @param {User} User setTimeout third param
 *
 * @example setTimeout(User.setOffline, 3000, User);;
 */
User.prototype.setOffline = function(User){
    if(!User.online){
        User.socket.broadcast.emit('setOffline', User.id);
        console.log(User.pseudo+" is set offline");
    };
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
