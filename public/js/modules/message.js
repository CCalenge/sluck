module.exports = function(){
    var user = require('./user.js');

    // get the current user
    var currentUser = user.getUser();

    // on form submit , send event with message
    $('.submitMessage').on('click',function(){
        var message = $('#message').val();
        currentUser.socket.emit('registerMessage', {chanID: 1, message: message});
        $('#message').val('');
    });

    currentUser.socket.on('newMessage', function(data){
        console.log(data);
        showMessage(data);
    });

function showMessage(data){
   var containerMessage = document.getElementsByClassName('messageContainer');
   var article = document.createElement('article');
   var pseudo = document.createElement('p');
   var date = document.createElement('span');
   var message = document.createElement('p');
   pseudo.innerHTML = data.id;
   message.innerHTML =data.message;
   date.innerHTML = data.date;
   article.classList.add("containerMessage");
   pseudo.classList.add("messageAuthor");
   date.classList.add("dateMessage");
   message.classList.add("message");
   pseudo.appendChild(date);
   article.appendChild(pseudo);
   article.appendChild(message);
   containerMessage[0].appendChild(article);
   }


};
