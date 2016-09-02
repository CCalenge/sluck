module.exports = function() {
    var User = require('./user');

    // click event on close window and currentUserName (top left page)
    $('.closeModal').on('click', function() {
        $('#containerChangeUser').addClass("hide");
    });

    $('#currentUser').on('click', function() {
        // on click , show the div containerChangeUser
        $('#containerChangeUser').removeClass("hide");

        //get the user, then emit the request to have the bdd data
        var currentUser = User.getUser();
        currentUser.socket.emit('askUserInfo', currentUser.pseudo);

        // with the response, we can set some value for the input
        currentUser.socket.on('returnUserData', function(result) {
            bddResult = result[0];
            checkForm = false;

            // put the default value for the pseudo
            $('.pseudoInput').val(bddResult.pseudo);
            // check the password to define a new one
            $('.passwd').on('blur', function() {
                if ($(this).val() !== bddResult.password) {
                    $(this).next().addClass('show');
                    checkForm += true;
                } else {
                    $(this).next().removeClass('show');
                };
            });

            $('.newPasswd').on('blur', function() {
                if ($(this).val().length < 6) {
                    $(this).next().addClass('show');
                    checkForm += true;
                } else {
                    $(this).next().removeClass('show');
                };
            });

            $('.checkNewPasswd').on('blur', function() {
                if ($(this).val().trim().length == 0 && $(this).val() !== $('.newPasswd').val()) {
                    $(this).next().addClass('show');
                    checkForm += true;
                } else {
                    $(this).next().removeClass('show');
                };
            });

            $('.submitChangeUser').on('click', function() {
                //data to send to bdd
                var userData = {};
                //check on submit if we have a new password define without confirmation password
                if (checkForm > 0 || $('.newPasswd').val() != $('.checkNewPasswd').val()) {
                    $('.newPasswd').next().addClass('show');
                    checkForm = 0;
                    $(this).text('!').css('fontSize', 40);
                } else {
                    userData.lastPseudo = bddResult.pseudo;
                    userData.pseudo = $('.pseudoInput').val();

                    if ($('.checkNewPasswd').val().length > 0) {
                        userData.password = $('.checkNewPasswd').val();
                    } else {
                        userData.password = bddResult.password;
                    };
                    // emit the update user data
                    currentUser.socket.emit('updateUser', userData);
                    //change the currentuserName on the user client side
                    $('#currentUser').text(userData.pseudo);
                    $(this).css('fontSize', 10).text('modifier');
                };
            });
        });
    });
};
