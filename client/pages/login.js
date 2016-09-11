$(document).ready(function(){

    var $window = $(window);
    var $loginContainer = $(".login-container");
    $loginContainer.height($window.height());

    $window.resize(function() {
        $loginContainer.height($window.height());
    });

    $button = $("#button-login");
    $button.click(function(){
        return false;
    });
});
