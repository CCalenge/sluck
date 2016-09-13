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
    var query = "insert into users set ?";
    this.query(query, data, callback);
};


module.exports = new UserDAO();
