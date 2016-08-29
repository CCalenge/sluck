var express = require('express');
var app = express();
var server = require('http').Server(app);

app.use(express.static(__dirname + '/public'));
server.listen(8080);

require("./modules/router.js")(app);
require("./modules/socketIO.js")(server);
require("./modules/user.js").createUsers();
