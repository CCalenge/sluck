/**
 * @file User DAO
 * @author MaxFqs, MaxDef
 * @module UserDAO
**/

var ChanDAO = require("./ChanDAO.js");

function UserDAO(){
    this.name = "UserDAO";
};

UserDAO.prototype = require("./DAO.js");


UserDAO.prototype.createUser = function(data, callback){
    // add the new user to all public chans
    var query = "\
        insert into users set ?;\
        set @newUserID = LAST_INSERT_ID();\
        \
        insert into chans_members (chanID, userID)\
        select id, @newUserID from chans where public = 1\
    ";
    this.query(query, data, callback);
};

UserDAO.prototype.getAllUsers = function(callback){
    var query = "select * from users";
    this.query(query, {}, callback);
};


module.exports = new UserDAO();
