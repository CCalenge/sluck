
var allChans = [];

function Chan(){
    this.id = data.id;
    this.name = data.name;
};


exports.init = function(){
    console.log("init");
};


function getChanID($object){
    return $object.attr("id").replace("chan", "")
};


function openChan($chan){
    var chanID = getChanID($chan);
    var name = $chan.html();
    $(".home-channel-header-title").html(name)
};

$(".item-chan").click(function(){
    openChan($(this));
    $(".item-chan").removeClass("item-chan-selected");
    $(this).addClass("item-chan-selected");
});
