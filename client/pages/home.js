$(document).ready(function(){

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
