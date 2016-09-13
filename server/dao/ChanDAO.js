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

    // add every users to that chan if public
    if(data.public == 1){
        query = "\
            insert into chans set ?;\
            set @newChanID = LAST_INSERT_ID();\
            \
            insert into chans_members (userID, chanID)\
            select id, @newChanID from users\
        ";
    };

    this.query(query, data, callback);
};


ChanDAO.prototype.getAllChans = function(callback){
    var query = "select * from chans";
    this.query(query, {}, callback);
};


module.exports = new ChanDAO();
