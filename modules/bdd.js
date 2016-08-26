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

/**
 * Return true if login successful
 * @function
 * @param {table} login             - {pseudo, password}
 * @param {function} callback       - callback(result)
 * @returns {boolean}
 * @example
 * bdd.checkLogin(login, function(result) {
 *     if(result) console.log("succes");
 * });
 */
exports.checkLogin = function(login, callback){
    if (login.pseudo == "" || login.password == "") return callback(false);

    connection.query("SELECT password from users WHERE pseudo = ?",[login.pseudo], function(err, rows, fields){
        if (err){ //Kill the function in case of error
            console.log(err);
            return callback(false);
        };

        if (rows.length > 0 && login.password === rows[0].password) return callback(true);
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
