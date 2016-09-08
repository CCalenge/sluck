var User = require('./user');
var currentUser = User.getUser();

module.exports = function() {

    $(function() {

        $('.closeModal').on('click', function() {

            $('#containerChangeChan').fadeOut();
        });

        $('.cancelChangeChan').on('click', function() {

            $('#containerChangeChan').fadeOut();
        });

        $('.createChanButton').on('click', function() {

            $('#containerChangeChan').fadeIn();
        })

        $('.submitChangeChan').on('click', function() {

            if ($('#newChan').val().length > 0 && $('#newChan').val().length < 50) {

                //emit the event and put the new chan in the list
                var $newChan = $('#newChan').val();
                currentUser.socket.emit('newChan', {newChan: $newChan});
                $('.containerChangeChan').find($('.hide').removeClass('show'));
                $('.listeChans').append('<li id=' + $newChan + '>' + $newChan + '</li>');
                $('#newChan').val('');
                $('#containerChangeChan').fadeOut();

            } else {
                //error message if no entry or too long
                console.log($('#newChan').val().length);
                $('.containerChangeChan').find($('.hide').addClass('show'));
            }
        })

    })

}
