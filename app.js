var Sluck = require("./server/Sluck.js");


// Create client host.js
var fs = require("fs");
var stream = fs.createWriteStream("client/host.js");
stream.once("open", function(fd) {
    stream.write("module.exports = \""+Sluck.config.host+":"+Sluck.config.port+"\";");
    stream.end();
});


// Start server
var express = require("express");
var app = express();
var server = require("http").Server(app);

app.use(express.static(__dirname + "/public"));
server.listen(Sluck.config.port);

Sluck.start(app, server);
