
$(document).ready(function(){
    var httpRequest = require('../modules/httpRequest.js');
    // Wait for the request to finish before init the modules
    httpRequest.getUserID(function(userID){
        require('../modules/user.js').createUsers(userID);
        require('../modules/socketIO.js')(io);

        require('../modules/message.js')();
    });











});
