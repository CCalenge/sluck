
$(document).ready(function(){

    // styling js code, need to have his proprer module
    var $window = $(window);
    var $header = $('.header');
    var $mainContainer = $('.mainContainer');

    $mainContainer.height($window.height() - $header.height());

    $window.resize(function() {
        $mainContainer.height($window.height() - $header.height());
    });


    var httpRequest = require('../modules/httpRequest.js');
    // Wait for the request to finish before init the modules
    httpRequest.getUserID(function(userID){
        require('../modules/user.js').createUsers(userID);
        require('../modules/socketIO.js')(io);

        require('../modules/message.js')();
        require('../modules/changeUser.js')();
    });
});
