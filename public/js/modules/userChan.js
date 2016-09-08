module.exports = function() {


    var user = require('./user.js');
    var currentUser = user.getUser();

    $('.listeChans').on('click', $('li'), function(e) {

        // get the text of the clicked link
        var chan = $.trim($(e.target).text());
        currentUser.chan = chan;

        currentUser.socket.emit('chanClick', {chan: chan });


    })

}
