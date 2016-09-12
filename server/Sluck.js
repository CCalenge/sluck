/**
 * @file Sluck
 * @author MaxFqs, MaxDef
 * @module Sluck
**/

function Sluck(){
    this.config = require("../config.json");
};


Sluck.prototype.start = function(app, server){
    this.app = app;
    this.server = server;
    require("./controllers/controller.js");
};


module.exports = new Sluck();
