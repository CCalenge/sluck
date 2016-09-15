var config = require("../config.json");
var mysql = require("mysql");
var table = require("../server/database/table.js");

// Create sluck database
mysql.createConnection({
    multipleStatements: true,
    host: "localhost",
    user: config.mysqlUser,
    password: config.mysqlPassword
}).query("drop database if exists sluck; create database sluck", createTables);


function createTables(){
    mysql.createConnection({
        multipleStatements: true,
        host: "localhost",
        user: config.mysqlUser,
        password: config.mysqlPassword,
        database: "sluck"
    }).query("\
        create table users("+table.users+");\
        create table users_messages("+table.users_messages+");\
        create table users_starred_chans("+table.users_starred_chans+");\
        create table chans("+table.chans+");\
        create table chans_members("+table.chans_members+");\
        create table chans_messages("+table.chans_messages+");\
    ", createUsers);
};


function createUsers(){
    var UserDAO = require("../server/dao/UserDAO.js");
    UserDAO.createUser({username: "admin", password: "root"}, createChans);
};


function createChans(){
    var ChanDAO = require("../server/dao/ChanDAO.js");
    ChanDAO.createChan({name: "general", public: 1});
    ChanDAO.createChan({name: "random", public: 1}, endScript);
};


function endScript(result){
    if(result)
        console.log("> Deployment has been successfully completed");
    process.exit();
};
