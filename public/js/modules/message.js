module.exports = function(){
    var user = require('./user.js');

    // get the current user
    var currentUser = user.getUser();

    // on form submit , send event with message
    $('.submitMessage').on('click',function(){
        var message = $('#message').val();
        currentUser.socket.emit('registerMessage', {chanID: 1, message: message});
    });

    currentUser.socket.on('newMessage', function(data){
        console.log(data);
        showMessage(data);
    })
};


   function showMessage(data){
       var containerMessage = $('.messageContainer');
       containerMessage.append("<div>"+data[0].message+"</div>");
    }
