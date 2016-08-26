/**
 * @file User factory
 * @author MaxFqs, MaxDef
 * @module user
 */

var allUsers = [];
var bdd = require('./bdd.js');

/**
 * @class User
 * @property {int}  id                        - User id (0 based)
 * @property {boolean}  online                - Online status
 */
function User(userData) {
    this.id = userData.id;
    this.pseudo = userData.pseudo;
    this.password = userData.password;

    this.online = true;

    allUsers.push(this);
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
 * Create a new User
 * @function
 * @returns {User}
 * @example var bob = user.new();
 */
exports.new = function(){
    return new User();
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
