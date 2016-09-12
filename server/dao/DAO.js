/**
 * @file DATA ACCES OBJECT
 * @author MaxFqs, MaxDef
 * @module DAO
**/

var config = require("../Sluck.js").config;
var mysql = require("mysql");


function DAO(){
    this.connection = mysql.createConnection({
        host: "localhost",
        user: config.mysqlUser,
        password: config.mysqlPassword,
        database: "sluck"
    });
};


DAO.prototype.error = function(error, callback){
    console.log("> ERROR FROM "+this.name);
    console.error(error);
    if(callback) callback(false);
};


module.exports = new DAO();
