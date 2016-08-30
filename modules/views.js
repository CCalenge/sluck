/**
 * @file render views
 * @author MaxFqs, MaxDef
 * @module views
 */

var user = require('./user.js');

/* Return an array which content two arrays : online and offline users
* @function
* @returns [array]
* @example
* var userState = user.userState();
* console.log(totalUsers) >
*      [ online [ 'maxdef' ,'maxf', 'nicopan', 'celine'],
*        offline [ 'stivo', 'luke', 'tifany' ]  ]
*/

exports.userState = function(id) {

    var allUsers = user.getAllUsers();
    var User = user.getUserByID(id);

    var index = allUsers.indexOf(User);
    allUsers.splice(index,1);

    var online = [];
    var offline = [];
    var totalUsers = [];

    for (var i = 0, c = allUsers.length; i < c; i++) {

        if (allUsers[i].online==true) {
            online.push(allUsers[i]);
        } else {
            offline.push(allUsers[i]);
        }
    }
    totalUsers.push(online);
    totalUsers.push(offline);

return totalUsers;
}
