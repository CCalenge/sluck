(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var init=false;

$('#burgerMenu, .close-modal-burger').on('click', function() {

    $('.burgerContainer').toggleClass('hide');

})

$(window).on('click', function(e) {

    if (e.target !== $('.burgerContainer') && !$('.burgerContainer').hasClass('hide') && e.target.id !== 'burgerMenu') {

        $('.burgerContainer').toggleClass('hide');

    }
})


$("#profilIcon").click(function() {
  if(init==false)
  {
      $('.profilContainer').animate({ width:"+=100px" }, 300 );
      init=true;
  }else
  {
      $('.profilContainer').animate({ width:"-=100px" }, 300 );
      init=false;
  }
  });

},{}],2:[function(require,module,exports){


$(document).ready(function(){

require('./burgerModal.js');

    var $window = $(window);
    var $homeContainer = $(".home-container");
    var headerHeight = $(".home-header").height();
    $homeContainer.height($window.height() - headerHeight);

    $window.resize(function() {
        $homeContainer.height($window.height() - headerHeight);
    });


    $(".item-chan").click(function(){
        $(".item-chan").removeClass("item-chan-selected");
        $(this).addClass("item-chan-selected");
    });


});

},{"./burgerModal.js":1}]},{},[2]);
