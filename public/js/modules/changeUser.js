module.exports = function() {

    // var User = require('./user');
// $('#containerChangeUser').hide();
$('.closeModal').on('click',function(){
    $('#containerChangeUser').toggleClass('show');
})
    $('#currentUser').on('click', function() {

//         var currentUser = User.getUser();
//
//         currentUser.socket.emit('askUserInfo',currentUser.pseudo);
//         currentUser.socket.on('returnUserData',function(result){
//
// createPage(result);
//
//         });
//
$('#containerChangeUser').toggleClass('show');

    });

// function createPage(data){
//
//                 var result=data[0];
//
//                 var section = $("<section>", {
//                     id: "containerChangeUser"
//                 });
//                 var form = $("<div>", {
//                     class: "formChangeUser"
//                 });
//
//                 var pseudo = $('<p>');
//                 var labelPseudo = $('<label>', {
//                     class: "label"
//                 });
//                 var inputPseudo = $('<input>',{value:result.pseudo});
//                 labelPseudo.text("Modifier votre pseudo : ");
//                 pseudo.append(labelPseudo).append(inputPseudo);
//
//                 var passwd = $('<p>');
//                 var labelPasswd = $('<label>', {
//                     class: "label"
//                 });
//                 var inputPasswd = $('<input>', {
//                     type: "password"
//                 });
//                 labelPasswd.text("Veuillez confirmer votre password : ");
//                 passwd.append(labelPasswd).append(inputPasswd);
//
//                 var checkPasswd = $('<p>');
//                 var labelCheckPasswd = $('<label>', {
//                     class: "label"
//                 });
//                 var inputCheckPasswd = $('<input>', {
//                     type: "password"
//                 });
//                 labelCheckPasswd.text("Nouveau password : ");
//                 checkPasswd.append(labelCheckPasswd).append(inputCheckPasswd);
//
//                 var checkPasswd2 = $('<p>');
//                 var labelCheckPasswd2 = $('<label>', {
//                     class: "label"
//                 });
//                 var inputCheckPasswd2 = $('<input>', {
//                     type: "password"
//                 });
//                 labelCheckPasswd2.text("Veuillez confirmer votre nouveau password : ");
//                 checkPasswd2.append(labelCheckPasswd2).append(inputCheckPasswd2);
//
//                 var button = $('<button>', {
//                     type: "button",
//                     class: 'submitChangeUser'
//                 });
//                 button.text('modifier');
//
//                 form.append(pseudo).append(passwd).append(checkPasswd).append(checkPasswd2).append(button);
//
//                 section.append(form);
//                 $(".rightContainer").append(section);
// }

}
