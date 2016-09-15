
var allChans = {};
var selectedChan = 0; // chan id


// Constructor
function Chan(data){
    this.id = data.id;
    this.name = data.name;
    this.$ = data.$;

    this.registerEventHandler();

    allChans[this.id] = this;
};


// Event Handler
Chan.prototype.registerEventHandler = function(){
    this.$.click({Chan: this}, this.onClick);
};

Chan.prototype.onClick = function(event){
    var Chan = event.data.Chan;
    if(selectedChan === Chan.id) return true;

    // Deselect former one
    if(selectedChan != 0){
        allChans[selectedChan].$.removeClass("item-chan-selected");
    };

    Chan.$.addClass("item-chan-selected");
    selectedChan = Chan.id;
};


// Init
exports.init = function(){
    $(".item-chan").each(addChan);
};

function addChan(){
    var data = {};
    var $this = $(this);

    data.id = $this.attr("id").replace("chan", "");
    data.name = $this.html();
    data.$ = $this;

    new Chan(data);
};
