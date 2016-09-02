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
            check=true;
            // put the default value for the pseudo
            $('.pseudoInput').val(bddResult.pseudo);
            // check the password to define a new one
            $('.passwd').on('blur', function() {
                if ($(this).val() !== bddResult.password) {
                    check=false;
                    $(this).next().addClass('show');

                } else {
                    check=true;
                    $(this).next().removeClass('show');
                };
            });

            $('.newPasswd').on('blur', function() {
                if ($(this).val().length < 6) {
                    $(this).next().addClass('show');
                    check=false;
                } else {
                    check=true;
                    $(this).next().removeClass('show');
                };
            });

            $('.checkNewPasswd').on('blur', function() {

                if ( $(this).val() !== $('.newPasswd').val()) {
                    check=false;
                    $(this).next().addClass('show');

                } else {
                    check=true;
                    $(this).next().removeClass('show');
                };
            });

            $('.submitChangeUser').on('click', function() {
                //data to send to bdd
                var userData = {};
                console.log(check);
                //check on submit if we have a new password define without confirmation password
                if ( check==false || $('.passwd').val() !== bddResult.password) {

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
