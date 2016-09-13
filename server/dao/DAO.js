/**
 * @file DATA ACCES OBJECT
 * @author MaxFqs, MaxDef
 * @module DAO
**/

var config = require("../../config.json");
var mysql = require("mysql");


function DAO(){
    this.connection = mysql.createConnection({
        host: "localhost",
        user: config.mysqlUser,
        password: config.mysqlPassword,
        database: "sluck",
        multipleStatements: true
    });
};


DAO.prototype.query = function(query, data, callback){
    DAO = this;
    DAO.connection.query(query, data, function(error, result){
        if(error) DAO.error(error, callback);
        if(callback) callback(result);
    });
};

DAO.prototype.error = function(error, callback){
    console.log("> ERROR FROM "+this.name);
    console.error(error);
    if(callback) callback(false);
};


module.exports = new DAO();
