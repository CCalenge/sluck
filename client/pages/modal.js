(function() {

    // burger Menu open/close---------------------------------

    var initBurger = false;

    if (initBurger === false) {
        $('#burgerMenu').on('click', function() {
            initBurger = true;
            $('#burgerContainer').slideToggle('fast');

        })

    }

    $(window).on('click', function(e) {

        if (e.target.id !== 'burgerMenu' && e.target.id !== 'burgerContainer' && e.target.id !== 'profilIcon' && initBurger === true) {
            initBurger = false;
            $('#burgerContainer').slideToggle('fast');

        }
    })

    // -------------animate users container-------------------
    var initProfil = false;

    $("#profilIcon").click(function() {
        if (initProfil == false) {
            $('#profilContainer').animate({
                width: "+=100px"
            }, 300);
            initProfil = true;
        } else {
            $('#profilContainer').animate({
                width: "-=100px"
            }, 300);
            initProfil = false;
        }
    });

    // close users container when click everywhere
    $(window).on('click', function(e) {

        if (e.target.id !== 'profilContainer' && initProfil == true && e.target.id !== 'profilIcon') {

            $('#profilContainer').animate({
                width: "-=100px"
            }, 300);
            initProfil = false;

        }
    })

})();
