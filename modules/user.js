/**
 * @file User factory
 * @author MaxFqs, MaxDef
 * @module user
 */

var allUsers = [];

/**
 * @class User
 * @property {int}  id                        - User id (0 based)
 * @property {boolean}  online                - Online status
 */
function User() {
    this.id = allUsers.length;
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
