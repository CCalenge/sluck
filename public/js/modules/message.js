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
       var article = document.createElement('article').addClass('containerMessage');
       var pseudo = document.createElement('p').addClass('pseudo');
       var date = document.createElement('span').addClass('messageDate');
       var message = document.createElement('p').addClass('messageContent');
       pseudo.innerHTML = data[0].id;
       message.innerHTML = data[0].message;
       date.innerHTML = data[0].date;
       pseudo.appendChild(date);
       article.appendChild(pseudo);
       article.appendChild(message);
       containerMessage.appendChild(article);
    }
