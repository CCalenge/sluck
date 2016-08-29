/**
 * @file Router (Express app config)
 * @author MaxFqs, MaxDef
 * @module router
 */

var initDone = false;

module.exports = function(app) {

if (initDone) return; // only run this once

var session = require('client-sessions');
var bodyParser = require('body-parser');
var bdd = require('./bdd.js');

app.use(session({
    cookieName: 'session',
    secret: 'è875078txGMZUSBPZ§zèstfszu',
    duration: 30 * 24 * 60 * 60 * 1000, // 1 month
    activeDuration: 60 * 60 * 1000, // 1 hour
}));

app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));


// Middleware check for valid session
app.use(function(req, res, next){
    if(req.session.id === null && req.url != '/login') return res.redirect("/login");
    res.cookie('userID', req.session.id, { maxAge: 6000});
    next();
})


app.get('/', function(req, res) {
    res.render('sluck.ejs');
});

app.get('/login', function(req, res){
    res.render('login.ejs');
});

app.post('/login', function(req, res) {
    var login = {
        pseudo: req.body.pseudo,
        password: req.body.password
    };

    bdd.checkLogin(login, function(result) {
        if (result) {
            req.session.id = result;
            res.redirect("/");
        } else {
            res.render('login.ejs',{error: 'erreur login / password'});
        };
    });
});

app.get('/logout', function(req, res){
    req.session.id = null;
    res.redirect("/login");
});


initDone = true;

};
