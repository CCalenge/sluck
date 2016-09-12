/**
 * @file Middleware
 * @author MaxFqs, MaxDef
 * @module middleware
**/

var app = require("../Sluck.js").app;

var session = require("client-sessions");
var bodyParser = require("body-parser");


app.use(session({
    cookieName: "session",
    secret: "è875078txGMZUSZFLS§zèstfszu",
    duration: 30 * 24 * 60 * 60 * 1000, // 1 month
    activeDuration: 60 * 60 * 1000, // 1 hour
}));


// to support URL-encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
}));


// check for valid session
app.use(function(req, res, next){
    // no need to check for id, user go to login
    if(req.url === "/login") return next();

    // if ID is null force route to /login
    if(req.session.id == null) return res.redirect("/login");

    // ID is defined and url is not /login
    res.setHeader("userID", req.session.id);
    next();
});
