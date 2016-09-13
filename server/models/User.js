/**
 * @file User
 * @author MaxFqs, MaxDef
 * @module User
**/

var UserDAO = require("../dao/UserDAO.js");

function User(){

};


exports.create = function(data, callback){
    UserDAO.createUser(data, function(userID){
        console.log(userID);
        callback();
    });
};
