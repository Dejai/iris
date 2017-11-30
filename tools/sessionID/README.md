# Append Session ID

This tool was created as a way to append a unique session ID and a success parameter to the testing URL for an eCommerce order page. This was in conjunction with the new eCommerce application were building with Magento.

This tool works best as a bookmarklet. You can use the following instructions to create your bookmarklet and test it out.
> 1. Create a new bookmark in your favorite web browser. I suggest creating it from your browser's bookmark manager page.
> 2. You can name this bookmark whatever you want.
> 3. In the field for the URL, copy and paste the code below - yes, all of it.
> 4. Then save this bookmark, and put it somewhere you prefer in your bookmarks.
> 5. Now, just click the bookmark to use it.

<hr/>

<br/>

<pre>
javascript: (function() {
    var URL = window.location; /*Get the current URL location*/
    
    /* Prompt the user to enter a session ID */
    var sessionNum = prompt("Session ID");
    
    /* Continue with the appending process, if a session number is entered */
    if (sessionNum != null){
        /* If the user does not enter a number, or it is a negative number, then generate a random one*/
        if(isNaN(sessionNum) || Number(sessionNum) < 1){
            /* Generate a random number to be the session ID */
            sessionNum = Math.floor(Math.random()*10000); 
        }
        
        /* Create a new URL with a query string that includes the session ID.*/
        /* The success param value is just a way to see the results of your purchase */
        var newURL = URL + "?sessionid="+sessionNum+"&success="+encodeURIComponent("http://ecomm-mag-t1.agora.local/marketplacecheckout/success/stub");
        
        /* Load the new URL */
        location.replace(newURL);        
    }  
}());
</pre>

