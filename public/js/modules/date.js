var today = new Date();


function minutes(timestamp){
    if(timestamp > 9){
        return timestamp;
    }else{
        return "0"+timestamp;
    }
}

exports.datePost = function(arg) {

var timestamp = new Date(arg*1000);

var month=["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];

    if (today.getDate() - timestamp.getDate() == 1)
    {
        return 'hier, à ' + timestamp.getHours() + "h" + minutes(timestamp.getMinutes()) + ".";
    }
     else if (today.getDate() == timestamp.getDate())
    {
        return 'aujourd\'hui, à ' + timestamp.getHours() + "h" + minutes(timestamp.getMinutes()) + ".";
    }
    else
    {
        return "le "+timestamp.getDay()+" "+month[timestamp.getMonth()-1];
    }

}
