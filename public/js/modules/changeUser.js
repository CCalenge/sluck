module.exports=function(){

var user=require('./user.js');

var section = $("<section>",{id: "containerChangeUser"});
var form = $("<div>",{class: "formChangeUser"});

var parOne = $('p');
var labelPasswd = $('<label>');
var inputPasswd = $('<input>',{ type : "password"});
labelPasswd.text("Veuillez confirmer votre password: ");
parOne.append(labelPasswd).append(inputPasswd);

var parTwo = $('p');
var labelCheckPasswd = $('<label>');
var inputCheckPasswd = $('<input>',{ type : "password"});
labelCheckPasswd.text("Nouveau password");
parTwo.append(labelCheckPasswd).append(inputCheckPasswd);

var parThree = $('p');
var labelCheckPasswd2 = $('<label>');
var inputCheckPasswd2 = $('<input>',{ type : "password"});
labelCheckPasswd2.text("Veuillez confirmer votre nouveau password");
parThree.append(labelCheckPasswd2).append(inputCheckPasswd2);

var button = $('<button>',{type:"button", class:'submitChangeUser'});
button.text('modifier');

section.append(form);
form.append(parOne);



$('#currentUser').on('click',function(){

$(".rightContainer").append(section);
})


}
