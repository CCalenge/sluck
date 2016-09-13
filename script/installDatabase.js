var config = require("../config.json");
var mysql = require("mysql");
var table = require("../server/database/table.js");

// Create sluck database
mysql.createConnection({
    multipleStatements: true,
    host: "localhost",
    user: config.mysqlUser,
    password: config.mysqlPassword
}).query("drop database if exists sluck; create database sluck", afterDatabaseCreation);


function afterDatabaseCreation(){
    mysql.createConnection({
        multipleStatements: true,
        host: "localhost",
        user: config.mysqlUser,
        password: config.mysqlPassword,
        database: "sluck"
    }).query("\
        \
        create table users("+table.users+");\
        insert into users (username, password) VALUES ('admin', 'root');\
        \
        create table chans("+table.chans+");\
        insert into chans (name, public) VALUES ('general', 1), ('random', 1)\
    ", function finishCreation(){
        process.exit();
    });
};
