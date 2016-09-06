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
    this.name = chanData.chan_Name;

    allChans.push(this);
};

/*
 * Create registered users
 * @function
 * @example user.createUsers()
 */
exports.createChans = function(){
    bdd.getAllChans(function(chans) {
        for (var i = 0; i < chans.length; i++) {
            new Chan(chans[i]);
        };
        console.log("chans created: ");
        console.log(allChans);
    });
};


exports.getChans = function(){
    return Array.from(allChans);
};
