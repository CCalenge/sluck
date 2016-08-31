(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @file http request
 * @author MaxFqs, MaxDef
 * @module httpRequest
 */

exports.getUserID = function(callback){
    var req = new XMLHttpRequest();
    req.open('GET', document.location, true);
    req.onreadystatechange = function(aEvt){
        if (req.readyState == 4) {
            var userID = req.getResponseHeader("userID");
            callback(userID);
        };
    };
    req.send(null);
};

},{}],2:[function(require,module,exports){
module.exports = function(){
    var user = require('./user.js');

    // get the current user
    var currentUser = user.getUser();

    // on form submit , send event with message
    $('.submitMessage').on('click',function(){
        var message = $('#message').val();
        currentUser.socket.emit('registerMessage', {chanID: 1, message: message});
        $('#message').val('');
    });

    currentUser.socket.on('newMessage', function(data){
        console.log(data);
        showMessage(data);
    });

function showMessage(data){
   var containerMessage = document.getElementsByClassName('messageContainer');
   var article = document.createElement('article');
   var pseudo = document.createElement('p');
   var date = document.createElement('span');
   var message = document.createElement('p');
   pseudo.innerHTML = data.id;
   message.innerHTML =data.message;
   date.innerHTML = data.date;
   article.classList.add("containerMessage");
   pseudo.classList.add("messageAuthor");
   date.classList.add("dateMessage");
   message.classList.add("message");
   pseudo.appendChild(date);
   article.appendChild(pseudo);
   article.appendChild(message);
   containerMessage[0].appendChild(article);
   }


};

},{"./user.js":4}],3:[function(require,module,exports){
/**
 * @file SocketIO Client
 * @author MaxFqs, MaxDef
 * @module socketIO_Client
 */

module.exports = function(io){
    // var socket = io.connect('http://localhost:8080');
    var socket = io.connect('http://192.168.1.245:8080');
    var User = require('./user.js').getUser();

    User.socket = socket;
    socket.emit('init', User.id);

    // Socket event listener
    socket.on('setOnline', function(userID){
        $('.onlineUsers').append($('#user'+userID));
    });

    socket.on('setOffline', function(userID){
        $('.offlineUsers').append($('#user'+userID));
    });
};

},{"./user.js":4}],4:[function(require,module,exports){
/**
 * @file User (client)
 * @author MaxFqs, MaxDef
 * @module user_c
 */

var allUsers = [];
var currentUser = false;
/**
* @class User
* @property {int}  id                        - User id
* @property {string} pseudo                  - User pseudo
* @property {string} avatar                  - User avatar
* @property {boolean}  online                - Online status
*/
function User(data) {
    this.id = data.id;
    this.pseudo = data.pseudo;
    this.avatar = null;
    this.online = data.online;

    this.socket = null; // only currentUser

    allUsers.push(this);
};


exports.createUsers = function(userID){
    function createUser($child, online){
        var pseudo = $child.text().trim();
        var id = $child.attr('id').substring(4); // remove user from string
        new User({id: id, pseudo: pseudo, online: online});
    };

    var pseudo = $('#currentUser').text().trim();
    currentUser = new User({id: userID, pseudo: pseudo, online: true});

    var child = $('.onlineUsers').children();
    for(i = 0; i < child.length; i++) createUser($(child[i]), true);

    var child = $('.offlineUsers').children();
    for(i = 0; i < child.length; i++) createUser($(child[i]), false);
};

exports.getAllUsers = function(){
    return Array.from(allUsers);
};

exports.getUser = function(){
    return currentUser;
}

},{}],5:[function(require,module,exports){

$(document).ready(function(){
    var httpRequest = require('../modules/httpRequest.js');
    // Wait for the request to finish before init the modules
    httpRequest.getUserID(function(userID){
        require('../modules/user.js').createUsers(userID);
        require('../modules/socketIO.js')(io);

        require('../modules/message.js')();
    });











});

},{"../modules/httpRequest.js":1,"../modules/message.js":2,"../modules/socketIO.js":3,"../modules/user.js":4}]},{},[5]);
