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

    // Create chans
    connection.query("create table chans(\
        id INT(11) NOT NULL AUTO_INCREMENT,\
        name varchar(50) NOT NULL,\
        public tinyint(1) NOT NULL,\
        PRIMARY KEY (id))",function(){
        connection.query("insert into chans (name, public) VALUES ('general', 1), ('random', 1)");
    });

    // Create messages chan 1
    connection.query("create table message_chan_1(\
        id INT(11) NOT NULL AUTO_INCREMENT,\
        date bigint(20) NOT NULL ,\
        message longtext NOT NULL,\
        userID INT(11) NOT NULL,\
        PRIMARY KEY (id))", function(){
        connection.query("insert into message_chan_1 (message, userID, date) VALUES \
        ('Welcome to Sluck !', 1, UNIX_TIMESTAMP(NOW()))");
    });

    // Create member chan 1
    connection.query("create table member_chan_1(\
        id INT(11) NOT NULL AUTO_INCREMENT,\
        userID INT(11) NOT NULL ,\
        PRIMARY KEY (id))", function(){
            connection.query("insert into member_chan_1 (userID) VALUES (1)");
        });

    // Create messages chan 2
    connection.query("create table message_chan_2(\
        id INT(11) NOT NULL AUTO_INCREMENT,\
        date bigint(20) NOT NULL ,\
        message longtext NOT NULL,\
        userID INT(11) NOT NULL,\
        PRIMARY KEY (id))");

    // Create member chan 2
    connection.query("create table member_chan_2(\
        id INT(11) NOT NULL AUTO_INCREMENT,\
        userID INT(11) NOT NULL ,\
        PRIMARY KEY (id))", function(){
            connection.query("insert into member_chan_2 (userID) VALUES (1)");
        });
});
