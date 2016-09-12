/**
 * @file Login DAO
 * @author MaxFqs, MaxDef
 * @module loginDAO
**/

function LoginDAO(){
    this.name = "LoginDAO";
};

LoginDAO.prototype = require("./DAO.js");


LoginDAO.prototype.checkLogin = function(data, callback){
    var DAO = this;
    var query = "SELECT * from users WHERE username = ?";

    DAO.connection.query(query, [data.username], function(error, result){
        if(error) DAO.error(error, callback);
        if(result.length == 0) return callback(false);
        if(result[0].password == data.password) return callback(result[0].id);
    });
};


module.exports = new LoginDAO();
