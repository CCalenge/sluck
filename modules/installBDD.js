var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root'
});

connection.query("create database sluck", function(){
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'sluck'
    });

    // Create users with admin
    connection.query("create table users(\
        id INT(11) NOT NULL AUTO_INCREMENT,\
        pseudo varchar(50) NOT NULL,\
        password varchar(255) NOT NULL,\
        PRIMARY KEY (id))", function(){
            connection.query("insert into users (pseudo, password) VALUES ('admin', 'root')");
    });

    // Create channel general
    connection.query("create table chan_1(\
        id INT(11) NOT NULL AUTO_INCREMENT,\
        date bigint(20) NOT NULL ,\
        message longtext NOT NULL,\
        userID INT(11) NOT NULL,\
        PRIMARY KEY (id))", function(){
            connection.query("insert into chan_1 (message, userID, date) VALUES ('bienvenue sur Sluck!', 1, UNIX_TIMESTAMP(NOW()))", function(){
                process.exit();
            });
    });
});
