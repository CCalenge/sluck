var config = require("../config.js");

// Check config file
var configEntry = ["host", "port", "mysqlUser", "mysqlPassword"];
for(var i = 0; i < configEntry.length; i++){
    if(config[configEntry[i]] == null || config[configEntry[i]] == ""){
        console.log("> Error: missing entry for "+configEntry[i]+" in config.js");
        return process.exit();
    };
};

// Create client host.js
var fs = require('fs');
var stream = fs.createWriteStream("public/js/modules/host.js");
stream.once('open', function(fd) {
    stream.write("module.exports = '"+config.host+":"+config.port+"'");
    stream.end();
});

// Create database
var mysql = require("mysql");
var connection = mysql.createConnection({
    multipleStatements: true,
    host: 'localhost',
    user: config.mysqlUser,
    password: config.mysqlPassword
});

connection.query("drop database if exists sluck; create database sluck", function(){
    var connectionSluck = mysql.createConnection({
        host: "localhost",
        user: config.mysqlUser,
        password: config.mysqlPassword,
        database: "sluck"
    });

    connectionSluck.query("create table users(\
    id int(11) not null auto_increment,\
    pseudo varchar(50) not null,\
    password varchar(255) not null,\
    primary key (id))",
    function(){
        connectionSluck.query("insert into users (pseudo, password) VALUES ('admin', 'root')",
        function(){
            console.log("> Install completed, start the server with the command:")
            console.log("> npm run server\n");
            process.exit();
        });
    });
});
