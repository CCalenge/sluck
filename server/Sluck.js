/**
 * @file Sluck
 * @author MaxFqs, MaxDef
 * @module Sluck
**/

// var user = require("./models/User.js");


function Sluck(){

};


Sluck.prototype.start = function(app, server){
    this.app = app;
    this.server = server;
    require("./controllers/controller.js");
};


// Sluck.prototype.createUser = function(data, callback){
//     user.create(data, callback);
//     callback();
// };


module.exports = new Sluck();
