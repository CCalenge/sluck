module.exports = function() {

    //alert for the empty message
    $('.alert').hide();

    var user = require('./user.js');

    // get the current user
    var currentUser = user.getUser();

    //on press enter= post the message
    $(document).keypress(function(e) {
        if (e.which == 13 && !e.shiftKey) {
            var message = $('#message').val();
            checkMessage(message);
        };
    });

    // on form submit , send event with message
    $('.submitMessage').on('click', function() {
        var message = $('#message').val();
        checkMessage(message);
    });

    function checkMessage(message) {
        if (message.trim() != '') {
            $('.submitMessage').text('+');
            currentUser.socket.emit('registerMessage', {
                chanID: 1,
                message: message
            });
            $('#message').val('');
        } else {
            $('.submitMessage').text('!');
            $('.alert').show();
            setTimeout(function() {
                $(".alert").fadeOut();
            }, 2000);
        };
    };

    function addMessage(data) {
        var $clone = $('#containerMessage').clone();
        var User = user.getUserByID(data.userID);

        $clone.find('.messageAuthor').html(User.pseudo);
        $clone.find('.dateMessage').html(data.date);
        $clone.find('.message').html(data.message);

        $clone.appendTo('#messageContainer');
    };

    currentUser.socket.on('newMessage', function(dataArray){
        addMessage(dataArray[0]);
        var containerMessage = document.getElementById('messageContainer');
        containerMessage.scrollTop = containerMessage.scrollHeight;
    });

    currentUser.socket.on("messageHistory", function(dataArray){
        for(i = 0; i < dataArray.length; i++)
            addMessage(dataArray[i]);
        var containerMessage = document.getElementById('messageContainer');
        containerMessage.scrollTop = containerMessage.scrollHeight;
    });



};
