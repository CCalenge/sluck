(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}]},{},[1]);
