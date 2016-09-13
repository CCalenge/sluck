/**
 * @file Chan
 * @author MaxFqs, MaxDef
 * @module Chan
**/

var ChanDAO = require("../dao/ChanDAO.js");

var allChans = [];

function Chan(data){
    this.id = data.id;
    this.name = data.name;

    allChans.push(this);
};


exports.init = function(){
    ChanDAO.getAllChans(function(chans){
        for (var i = 0; i < chans.length; i++) {
            new Chan(chans[i]);
        };
        console.log("chans: "+allChans.length);
    });
};
