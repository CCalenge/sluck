/**
 * @file Views (util functions)
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
*      [ [User { id: 1, pseudo: 'maxoon', sockets: [], online: false },
  User { id: 2, pseudo: 'nicopan', sockets: [], online: false },
  User { id: 3, pseudo: 'stivo', sockets: [], online: false } ],
*        [User { id: 1, pseudo: 'maxoon', sockets: [], online: false },
  User { id: 2, pseudo: 'nicopan', sockets: [], online: false },
  User { id: 3, pseudo: 'stivo', sockets: [], online: false } ]]
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
