/**
 * @file Sluck
 * @author MaxFqs, MaxDef
 * @module Sluck
**/

var user = require("./models/User.js");
var chan = require("./models/Chan.js");

function Sluck(){

};


Sluck.prototype.start = function(app, server){
    this.app = app;
    this.server = server;
    require("./controllers/controller.js");

    user.init();
    chan.init();
};



module.exports = new Sluck();
