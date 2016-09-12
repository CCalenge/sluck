/**
 * @file Home
 * @author MaxFqs, MaxDef
 * @module home
**/

var app = require("../Sluck.js").app;


app.get("/", function(req, res){
    res.render("home.ejs");
});
