$(document).ready(function(){

    var $window = $(window);
    var $loginContainer = $(".login-container");
    $loginContainer.height($window.height());

    $window.resize(function() {
        $loginContainer.height($window.height());
    });


    var $button = $("#button-login");
    var $username = $("#input-username");
    var $password = $("#input-password");

    function checkInput(){
        if($username.val().trim() != "" && $password.val().trim() != "")
            return true;
        if($username.val().trim() == "") $username.addClass("input-warning-missing-entry");
        if($password.val().trim() == "") $password.addClass("input-warning-missing-entry");
        return false;
    };

    $button.click(function(){
        var enable = checkInput();
        return enable; // disable button action if false
    });

    // remove warning
    $("#input-username, #input-password").focusout(function(){
        if($(this).val().trim() != "")
            $(this).removeClass("input-warning-missing-entry");
    });
});
