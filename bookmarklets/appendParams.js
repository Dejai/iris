javascript: (function() {
    var URL = window.location;
    var sessionNum = prompt("Session ID");
    if (sessionNum != null){
        if(isNaN(sessionNum) || Number(sessionNum) < 1){
            sessionNum = Math.floor(Math.random()*10000);
        }
        var newURL = URL + "?sessionid="+sessionNum+"&success="+encodeURIComponent("http://ecomm-mag-t1.agora.local/marketplacecheckout/success/stub");
        location.replace(newURL);
    }  
}());
