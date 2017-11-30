javascript: (function() {
    (function showSumTable(){
        /* The HTML to setup the simple input area and results area */
        var label1 = "<label>Enter an Issue Key. Be sure to include the project acronym part along with the number</label><br/><br/>";
        var input1 = "<input id=\"issueKey\" type=\"text\" placeholder=\"Enter issue key\"/> &nbsp;&nbsp;<button id=\"generator\"> Generate JQL </button>";
        var p1 = "<p id=\"error\" style=\"color:red;display:none;\"> ERROR: Please include an issuekey</p>";
        var textArea1 = "<br/><br/><textarea id=\"genQ\" rows=\'3\' style=\"width:100%; resize:none;\" placeholder=\"Results of JQL generator\" readonly></textarea><br/>";
        var p2 = "<p id=\"inst\" style=\"color:blue;display:none;\"> Copy this JQL and paste into the search in JIRA </p>";
        var style = "<style> body { padding:2%; }</style>";
        
        /* Sets up the window dimentions and opens a new window with the elements defined above included.*/
        var windowWidth = windowDim = "width=" + screen.width/2 + "px,height=" + screen.height/4 + "px" + ",location=no";
        var resultsWindow = window.open("", "This is a Test", windowDim);
        resultsWindow.document.write(style + input1 + p1 + textArea1 + p2);
         
        var gen = resultsWindow.document.getElementById("generator");  /* The button to generate the JQL*/
        var issue = resultsWindow.document.getElementById("issueKey"); /* The input element for the value */
        var queryRes = resultsWindow.document.getElementById("genQ");  /* The element where the results will go */
        gen.addEventListener("click", function(){
            if (issue.value.length < 1){    /* If no issue key is entered, show the error message */
                resultsWindow.document.getElementById("error").style.display = "block";        
            } else {   /* Otherwise, hide the error message (if visible), and generate the query */
                resultsWindow.document.getElementById("error").style.display = "none";
                /* The simple query, filling the entered issue key where needed. */
                var query = "project in (IRIS, IRISPM) AND (issue in (" + issue.value + ", linkedIssues(" + issue.value + ")) OR \"Epic Link\" in (linkedIssues(" + issue.value + "), " + issue.value + "))";
                /* Add the query to the results box */
                queryRes.innerHTML = query;
                /* Show a friendly reminder to copy the JQL and use it in JIRA */
                resultsWindow.document.getElementById("inst").style.display = "block";
            }
        });
        /* Automatically selects all the content of the results element when you click into the field */
        resultsWindow.document.getElementById("genQ").addEventListener("focus", function(){ this.select(); });
    })();
}());
