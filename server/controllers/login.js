/**
 * @file Login
 * @author MaxFqs, MaxDef
 * @module login
**/

var app = require("../Sluck.js").app;
var UserDAO = require("../dao/UserDAO.js");

app.get("/login", function(req, res){
    res.render("login.ejs");
});


app.post("/login", function(req, res) {
    var login = {
        username: req.body.username,
        password: req.body.password
    };

    UserDAO.checkLogin(login, function(userID){
        if(userID){
            req.session.id = userID;
            return res.redirect("/");
        };
        res.render("login.ejs", {error: true});
    });
});
