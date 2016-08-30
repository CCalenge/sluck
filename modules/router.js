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
var views = require('./views.js');
var user = require ('./user.js');

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
    // no need to check for id, user go to login
    if(req.url === '/login') return next();

    // if ID is null force route to /login
    if(req.session.id === null){
        return res.redirect("/login");
    };

    // ID is defined and url is not /login
    // Set up the cookie ID and proceed
    res.cookie('userID', req.session.id, { maxAge: 6000});
    next();
})


app.get('/', function(req, res) {
    var usersSorted = views.getUsersSorted(req.session.id);
    var currentUser = user.getUserByID(req.session.id);
    res.render('sluck.ejs',{currentUser:currentUser, usersSorted: usersSorted});
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
    res.send("logout !");
});


initDone = true;

};
