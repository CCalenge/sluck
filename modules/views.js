/**
 * @file Views (util functions)
 * @author MaxFqs, MaxDef
 * @module views
 */

var user = require('./user.js');

/** Return nested array of users sorted by online status
 * @function
 * @param {int} UserID
 * @returns {array} [[online], [offline]]
 * @example
 * var usersSorted = user.getUsersSorted();
 * console.log(usersSorted) >
 *      [ online [ 'maxdef' ,'maxf', 'nicopan', 'celine'],
 *        offline [ 'stivo', 'luke', 'tifany' ]  ]
 */

exports.getUsersSorted = function(id) {
    var allUsers = user.getAllUsers();
    var User = user.getUserByID(id);

    var index = allUsers.indexOf(User);
    allUsers.splice(index,1);

    var online = [];
    var offline = [];
    var usersSorted = [];

    for(var i = 0, c = allUsers.length; i < c; i++){
        if (allUsers[i].online==true)
            online.push(allUsers[i]);
        else
            offline.push(allUsers[i]);
    };

    usersSorted.push(online);
    usersSorted.push(offline);

return usersSorted;
}
