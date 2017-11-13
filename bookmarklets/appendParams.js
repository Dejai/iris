javascript: (function() {
    var URL = window.location; /*Get the current URL location*/
    
    /* Prompt the user to enter a session ID */
    var sessionNum = prompt("Session ID");
    
    /* Continue with the appending process, if a session number is entered */
    if (sessionNum != null){
        if(isNaN(sessionNum) || Number(sessionNum) < 1){  /* If the user does not enter a number, or it is a negative number, then generate a random one*/
            sessionNum = Math.floor(Math.random()*10000); /* Generate a random number to be the session ID */
        }
        
        /* Create a new URL with a query string that includes the session ID. The success param value is just a way to see the results of your purchase */
        var newURL = URL + "?sessionid="+sessionNum+"&success="+encodeURIComponent("http://ecomm-mag-t1.agora.local/marketplacecheckout/success/stub");
        
        /* Load the new URL */
        location.replace(newURL);        
    }  
}());
