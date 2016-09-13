/**
 * @file Home
 * @author MaxFqs, MaxDef
 * @module home
**/

var app = require("../Sluck.js").app;
var ChanDAO = require("../dao/ChanDAO.js");

var res = false;
var data = {};

app.get("/", function(req, newRes){
    res = newRes;
    data = {};
    ChanDAO.getAllChans(function(result){
        if(result) data.chans = result;
        render();
    });
});


function render(){
    res.render("home.ejs", data);
};
