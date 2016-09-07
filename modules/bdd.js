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

function error(err, callback){
    console.log(error);
    callback(false);
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
        if (err) return error(err, callback);
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
        if (err) return error(err, callback);
        callback(rows);
    });
};

/**
 * Return last 30 messages of the channel
 * @function
 * @param {int} chanID          - channel ID
 * @param {function} callback   - callback(dataArray)
 * @example
 * bdd.getMessages(1, function(dataArray){
 *     socket.emit("messageHistory", dataArray);
 * });
 */
exports.getMessages = function(chanID, callback){
    connection.query("(SELECT * FROM chan_"+chanID+" ORDER BY id DESC LIMIT 30) ORDER BY id ASC",
    function(err, rows, fields){
        if (err) return error(err, callback);
        callback(rows);
    });
};

exports.getUsersData = function(data,callback){
    connection.query("SELECT * from users WHERE pseudo=?",[pseudo=data], function(err, rows, fields){
        if (err){ //Kill the function in case of error
            console.log(err);
            return callback(false);
        };
        callback(rows);
    });
};

exports.registerMessage = function(data, callback){
    connection.query("INSERT INTO chan_"+data.chanID+" (message, userID, date) VALUES ("+connection.escape(data.message)+", "+data.userID+",UNIX_TIMESTAMP(NOW()))",
    function(err, rows, fields){
        if (err){ //Kill the function in case of error
            console.log(err);
            return callback(false);
        };
        callback(rows.insertId);
    });
};

exports.updateUserData = function(data ,callback){
    connection.query("UPDATE users SET pseudo =?,password=? WHERE pseudo =? ",[pseudo= data.pseudo, password= data.password, pseudo= data.lastPseudo],
    function(err, rows, fields){
        if (err){ //Kill the function in case of error
            console.log(err);
            return callback(false);
        };
        callback(rows);
    });

}

exports.getMessageByID = function(data, callback){
    connection.query("SELECT * from chan_"+data.chanID+" WHERE id = "+data.id, function(err, rows, fields){
        if (err){ //Kill the function in case of error
            console.log(err);
            return callback(false);
        };
        callback(rows);
    });
}

exports.getAllChans = function(callback){
    connection.query("SELECT * from chans", function(err, rows, fields){
        if (err) return error(err, callback);
        callback(rows);
    });
};

exports.deleteChan = function(data){
    connection.query("DELETE * from chans WHERE id =?",[data.id] ,function(err, rows, fields){
        if (err) return error(err);

    });
}

exports.createChan = function(data){
    connection.query("INSERT INTO chans (name) VALUES (data)", function(err, rows, fields){
        if (err) return error(err, callback);

    });
}
