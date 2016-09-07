/**
 * @file Chan factory
 * @author MaxFqs, MaxDef
 * @module chans
 */

var allChans = [];
var bdd = require('./bdd.js');

/**
 * @class Chan
 * @property {int}  id                        - Chan id
 * @property {string} name                 - chan name

 */
function Chan(chanData) {
    this.id = chanData.id;
    this.name = chanData.name;

    allChans.push(this);
};

/*
 * Create registered chans
 * @function
 * @example chan.createChans()
 */

exports.createChans = function() {
    bdd.getAllChans(function(chans) {
        for (var i = 0; i < chans.length; i++) {
            new Chan(chans[i]);
        };
        console.log("chans created: ");
        console.log(allChans);
    });
};


exports.getChans = function() {
    return Array.from(allChans);
};

exports.deleteChan = function(id) {
    for (var i = 0, c = allChans.length; i < c; i++) {
        if (allChans[i].id == id) {
            bdd.deleteChan(id);
        }
    }
}
exports.createChan = function(nameChan) {
    bdd.createChan(nameChan);
}
