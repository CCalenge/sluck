/**
 * @file Logout
 * @author MaxFqs, MaxDef
 * @module logout
**/

var app = require("../Sluck.js").app;


app.get("/logout", function(req, res){
    req.session.id = null;
    res.redirect("/login");
});
