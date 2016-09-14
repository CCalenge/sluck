/**
 * @file Home
 * @author MaxFqs, MaxDef
 * @module home
**/

var config = require("../../config.json");

var app = require("../Sluck.js").app;
var ChanDAO = require("../dao/ChanDAO.js");

app.get("/", function(req, res){
    buildData(function(data){
        res.render("home.ejs", data);
    });
});

function buildData(callback){
    var data = {};

    data.teamName = config.teamName;
    ChanDAO.getAllChans(function(result){
        if(result) data.chans = result;
        callback(data);
    });

};



function render(){

};
