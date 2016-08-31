/**
 * @file Database query
 * @author MaxFqs, MaxDef
 * @module bdd
 */

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'sluck'
});

var errorLog = function(err, rows, fields){
    if (err) console.log(err);
};


/**
 * Return user ID if login successful or false
 * @function
 * @param {table} login             - {pseudo, password}
 * @param {function} callback       - callback(result)
 * @returns {UserID | false}
 * @example
 * bdd.checkLogin(login, function(result) {
 *     if(result) console.log("User ID: "+result);
 * });
 */
exports.checkLogin = function(login, callback){
    if (login.pseudo == "" || login.password == "") return callback(false);

    connection.query("SELECT * from users WHERE pseudo = ?",[login.pseudo], function(err, rows, fields){
        if (err){ //Kill the function in case of error
            console.log(err);
            return callback(false);
        };

        if (rows.length > 0 && login.password === rows[0].password) return callback(rows[0].id);
        callback(false);
    });
};

/**
 * Return all registered users
 * @function
 * @param {function} callback       - callback(users)
 * @returns {array} users
 * @example
 * bdd.getUsers(function(users) {
 *     console.log(users);
 * });
 *
 * console => [ RowDataPacket { id: 1, pseudo: 'bob', password: '123' },
 *              RowDataPacket { id: 2, pseudo: 'boby', password: 'pw2' }]
 */
exports.getUsers = function(callback){
    connection.query("SELECT * from users", function(err, rows, fields){
        if (err){ //Kill the function in case of error
            console.log(err);
            return callback(false);
        };
        callback(rows);
    });
};

exports.registerMessage = function(data, callback){
    connection.query("INSERT INTO chan_"+data.chanID+" (message, userID, date) VALUES ('"+data.message+"', "+data.userID+",NOW())",
    function(err, rows, fields){
        if (err){ //Kill the function in case of error
            console.log(err);
            return callback(false);
        };
        callback(rows.insertId);
    });
};

exports.getMessageByID = function(data, callback){
    connection.query("SELECT message,id,userID,DATE_FORMAT(date,'%d/%c/%Y à %Hh%i') AS date from chan_"+data.chanID+" WHERE id = "+data.id, function(err, rows, fields){
        if (err){ //Kill the function in case of error
            console.log(err);
            return callback(false);
        };
        callback(rows);
    });
}






/**
 * Return the most recent messages
 * @function
 * @param {int} chanID
 * @param {function} callback
 * @example
 * bdd.getUsers(function(users) {
 *     console.log(users);
 * });
 * console => [ RowDataPacket { id, date, message, userID } ]
 */
exports.getMessages = function(chanID, callback){
    connection.query("SELECT * FROM chan_"+chanID+" ORDER BY id ASC LIMIT 30", function(err, rows, fields){
        if (err){ //Kill the function in case of error
            console.log(err);
            return callback(false);
        };
        callback(rows);
    });
};
