(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @file SocketIO Client
 * @author MaxFqs, MaxDef
 * @module socketIO_Client
 */

module.exports = function(io){
    var socket = io.connect('http://192.168.1.245:8080');

    // Get userID from header
    var req = new XMLHttpRequest();
    req.open('GET', document.location, true);
    req.onreadystatechange = function(aEvt){
        if (req.readyState == 4) {
            var userID = req.getResponseHeader("userID");
            socket.emit('init', userID);
        };
    };
    req.send(null);

    // Socket event listener
    socket.on('setOnline', function(userID){
        $('.onlineUsers').append($('#user'+userID));
    });

    socket.on('setOffline', function(userID){
        $('.offlineUsers').append($('#user'+userID));
    });
};

},{}],2:[function(require,module,exports){

$(document).ready(function(){
    require('../modules/socketIO_Client.js')(io);
});

},{"../modules/socketIO_Client.js":1}]},{},[2]);
