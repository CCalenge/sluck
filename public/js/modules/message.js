
var user = require('./user.js');

// get the current user
var currentUser = user.getUser();

// on form submit , send event with message
$('.formMessage').on('submit',function(){
  var message = $('#message').val();
  currentUser.socket.emit('newMessage',message);
})
