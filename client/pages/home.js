$(document).ready(function(){

    require("../models/Chan.js").init();
    require('./modal.js');

    var $window = $(window);
    var $homeContainer = $(".home-container");
    var headerHeight = $(".home-header").height();
    $homeContainer.height($window.height() - headerHeight);

    $window.resize(function() {
        $homeContainer.height($window.height() - headerHeight);
    });
});
