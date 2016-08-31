/**
 * @file http request
 * @author MaxFqs, MaxDef
 * @module httpRequest
 */

exports.getUserID = function(callback){
    var req = new XMLHttpRequest();
    req.open('GET', document.location, true);
    req.onreadystatechange = function(aEvt){
        if (req.readyState == 4) {
            var userID = req.getResponseHeader("userID");
            callback(userID);
        };
    };
    req.send(null);
};
