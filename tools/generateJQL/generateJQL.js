
document.addEventListener("DOMContentLoaded", function(){
    var gen = document.getElementById("generator");  /* The button to generate the JQL*/
    var issue = document.getElementById("issueKey"); /* The input element for the value */
    var queryRes = document.getElementById("genQ");  /* The element where the results will go */
    gen.addEventListener("click", function(){
        if (issue.value.length < 1){    /* If no issue key is entered, show the error message */
            document.getElementById("error").style.display = "block";        
        } else {   /* Otherwise, hide the error message (if visible), and generate the query */
            document.getElementById("error").style.display = "none";
            /* The simple query, filling the entered issue key where needed. */
            var query = "project in (IRIS, IRISPM) AND (issue in (" + issue.value + ", linkedIssues(" + issue.value + ")) OR \"Epic Link\" in (linkedIssues(" + issue.value + "), " + issue.value + "))";
            /* Add the query to the results box */
            queryRes.innerHTML = query;
            /* Show a friendly reminder to copy the JQL and use it in JIRA */
            document.getElementById("inst").style.display = "block";
        }
    });
    /* Automatically selects all the content of the results element when you click into the field */
    document.getElementById("genQ").addEventListener("focus", function(){ this.select(); });
});
