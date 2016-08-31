/**
 * @file User (client)
 * @author MaxFqs, MaxDef
 * @module user_c
 */

var allUsers = [];
var currentUser = false;
/**
* @class User
* @property {int}  id                        - User id
* @property {string} pseudo                  - User pseudo
* @property {string} avatar                  - User avatar
* @property {boolean}  online                - Online status
*/
function User(data) {
    this.id = data.id;
    this.pseudo = data.pseudo;
    this.avatar = null;
    this.online = data.online;

    this.socket = null; // only currentUser

    allUsers.push(this);
};


exports.createUsers = function(userID){
    function createUser($child, online){
        var pseudo = $child.text().trim();
        var id = $child.attr('id').substring(4); // remove user from string
        new User({id: id, pseudo: pseudo, online: online});
    };

    var pseudo = $('#currentUser').text().trim();
    currentUser = new User({id: userID, pseudo: pseudo, online: true});

    var child = $('.onlineUsers').children();
    for(i = 0; i < child.length; i++) createUser($(child[i]), true);

    var child = $('.offlineUsers').children();
    for(i = 0; i < child.length; i++) createUser($(child[i]), false);
};

exports.getAllUsers = function(){
    return Array.from(allUsers);
};

exports.getUser = function(){
    return currentUser;
};

exports.getUserByID = function(userID){
    for (var i = 0; i < allUsers.length; i++){
        if(allUsers[i].id == userID) return allUsers[i]
    };
    return false;
};
