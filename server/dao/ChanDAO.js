/**
 * @file Chan DAO
 * @author MaxFqs, MaxDef
 * @module ChanDAO
**/

function ChanDAO(){
    this.name = "ChanDAO";
};

ChanDAO.prototype = require("./DAO.js");

ChanDAO.prototype.createChan = function(data, callback){
    var query = "insert into chans set ?";
    this.query(query, data, callback);
};


ChanDAO.prototype.getAllChans = function(callback){
    var query = "select * from chans";
    this.query(query, {}, callback);
};


module.exports = new ChanDAO();
