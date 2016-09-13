/**
 * @file User
 * @author MaxFqs, MaxDef
 * @module User
**/

var UserDAO = require("../dao/UserDAO.js");

var allUsers = [];

function User(data){
    this.id = data.id;
    this.username = data.username;

    allUsers.push(this);
};


exports.create = function(data, callback){
    UserDAO.createUser(data, function(userID){
        console.log(userID);
        callback();
    });
};


exports.init = function(){
    UserDAO.getAllUsers(function(users){
        for (var i = 0; i < users.length; i++) {
            new User(users[i]);
        };
        console.log("users: "+allUsers.length);
    });
};
