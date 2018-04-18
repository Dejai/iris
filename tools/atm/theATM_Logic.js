// GLOBAL Variables - These variables will be used throughout the script.
    var winHeight = screen.height - 350;
    var winWidth = screen.width / 2.0;
    var winTop = 100;
    var windowDim = "top=" + winTop  + "px, width=" + winWidth  + "px,height=" + winHeight  + "px" + ",location=no";

    var originalWindow = window;
    var editPageQuery = "?draftId=38093736&draftShareId=c4a37cf3-eb06-44da-a4b0-49b409b5a524";
    var currentPageQuery = originalWindow.location.search;

    var org_atm, topic_atm, affilRows_atm, topicRows_atm, orgRows_atm;
    var newAffil_Name, newAffil_Email, newAffil_Org, newAffil_OrgCustom, checkAffilName, newTopicDescription, newTopicName;
    var theRightTable;
    var theTables, theRightAffilTable, theRightTopicsTable, theRightOrgsTable;
    var alltopics_atm;
    var ifr, ifrDoc; 
    var atmWindow;
    var menuListList;
    var reminderImages = [  { "url" : "https://media.tenor.com/images/d32612ecb66f713b621f17be89e0ddfb/tenor.gif", "width": 250, "height" : 150 },
                            { "url" : "http://24.media.tumblr.com/tumblr_meco1kwwdh1rj579lo1_500.gif", "width": 200, "height" : 200 },
                            { "url" : "https://media.tenor.com/images/7174d3daea804eab58855949aa9f7606/tenor.gif", "width": 250, "height" : 150 }
                        ];


// GETTING STARTED - These functions initialize and start the application
    // Adds an event listener to the button. When it is clicked, it will call the startATM() function
    document.getElementById("startATM").addEventListener("click", startATM);

    // This creates a new popup window and adds all the different HTML elements
    // Then scans the table and fills in data
    function startATM(){
        originalWindow = window;
        atmWindow = window.open("", "_blank", windowDim);
        atmWindow.document.write(style + dataList + orgsDataList + description + menuList + resultsMessages + helpAndTips + addTopicForm + addAffiliateForm + checkAffiliateForm);

        getTablesForATM();
        init_atm();
    }
    
    //  Scans the table on the confluence page to get a list of the users
    // The 'pageState' variable indicates whether or not to scan the page in edit mode.
    function getTablesForATM(){
        try{
            
            theTables = originalWindow.document.getElementsByTagName("table");
            for (var x = 0; x < theTables.length; x++) {
                var headers = theTables[x].querySelectorAll("tbody tr th");
                for (var y = 0; y < headers.length; y++) {
                    if (headers[y].innerText == "Affiliate Table") {
                        theRightTable = theTables[x];
                    } else if (headers[y].innerText == "Organizations Table") {
                        theRightOrgsTable = theTables[x];
                    } else if (headers[y].innerText == "Topics Table") {
                        theRightTopicsTable = theTables[x];
                    }
                }
            }
            affilRows_atm = theRightTable.querySelectorAll("tbody tr");
            topicRows_atm = theRightTopicsTable.querySelectorAll("tbody tr");
            orgRows_atm = theRightOrgsTable.querySelectorAll("tbody tr");
        } catch (err) {
            atmWindow.alert(err);
	    atmWindow.console.log(err);
        }
    }

    //This function adds event listeners and fills out lists for the ATM popup
    function init_atm() {
        menuListList = atmWindow.document.getElementsByClassName("menuList");
        for (var c = 0; c < menuListList.length; c++){
            menuListList[c].addEventListener("click", function(){
                showSection(this.id);
            }, false);
        }
        //Initializing global variables to the DOM object for fields that users can make a selection / enter a value
        newAffil_Name = atmWindow.document.getElementById("newAffilName");
        newAffil_Email = atmWindow.document.getElementById("newAffilEmail");
        newAffil_Org = atmWindow.document.getElementById("addAffiliateForm_SelectOrg");
        newAffil_OrgCustom = atmWindow.document.getElementById("newOrganizationField");
        newTopicDescriptionSubSection = atmWindow.document.getElementById("topicDescriptionSubSection");
        newTopicDescriptionInput = atmWindow.document.getElementById("topicDescription_atm");
        newTopicName = atmWindow.document.getElementById("newTopicName_atm");





        checkAffilName = atmWindow.document.getElementById("checkAffilName");
        //org_atm = atmWindow.document.getElementsByName("organizations");
        alltopics_atm = [];
        topic_atm = atmWindow.document.getElementById("topics_atm");

        // Adding listeners to the "submit" buttons on each form / as well as the 'select all' concept
        atmWindow.document.getElementById("addNewTopic").addEventListener("click", validateNewTopic_atm);
        atmWindow.document.getElementById("addNewAffiliate").addEventListener("click", validateAffilFields_atm);
        atmWindow.document.getElementById("editOldAffiliate").addEventListener("click", validateAffilFields_atm);
        atmWindow.document.getElementById("checkForAffiliateButton").addEventListener("click", validateCheckForAffil);


        atmWindow.document.getElementById("addAffiliateForm_SelectOrg").addEventListener("change", function(){
            if (this.value == "neworg"){
                newAffil_OrgCustom.style.display = "block";
            } else {
                newAffil_OrgCustom.style.display = "none";
                newAffil_OrgCustom.value = "";
            }
        });
        atmWindow.document.getElementById("topics_atm").addEventListener("change", function(){
            if (this.value == "newtopic"){
                newTopicDescriptionSubSection.style.display = "block";
                newTopicName.style.display = "block";
                newTopicName.focus();
            } else {
                newTopicDescriptionSubSection.style.display = "none";
                newTopicDescriptionInput.value = "";
                newTopicName.style.display = "none";
                newTopicName.value = "";
            }
        });

        //Setting the list of organizations (based on the object above)
        setOrgsList();
        //Getting a list of existing topics based on the view mode of the page.
        populateExistingTopics();
    }

    //Scans the table and creates a list of unique organizations
    function setOrgsList(){
        
        atmWindow.document.getElementById("addAffiliateForm_SelectOrg").innerHTML = "<option></option>";
        allorgs_atm = [];
        for (var b = 2; b < orgRows_atm.length; b++){
            var TDs = orgRows_atm[b].querySelectorAll("td.confluenceTd");
            let orgName = cleanup(TDs[0].innerText);
            if (allorgs_atm.indexOf(orgName) < 0) {
                atmWindow.document.getElementById("addAffiliateForm_SelectOrg").innerHTML += "<option>" + orgName + "</option>";
                allorgs_atm.push(orgName);
            }
        }
        atmWindow.document.getElementById("addAffiliateForm_SelectOrg").innerHTML += "<option style='color:blue;' value='neworg'> ** New Organization ** </option>";
    }

    //Scans the table and creates a list of unique topics
    function populateExistingTopics() {
        alltopics_atm = [];
        var topicOptions = atmWindow.document.getElementById("optionsList_atm");
        var topicCheckList = atmWindow.document.getElementById("topicCheckList");
        var topicsDropdown = atmWindow.document.getElementById("topics_atm");
        topicsDropdown.innerHTML = "<option value='newtopic' style='color:blue;'>** New Topic **</option>";
        for (var y = 2; y < topicRows_atm.length; y++) {
            var TDs = topicRows_atm[y].querySelectorAll("td.confluenceTd");
            let topicName = cleanup(TDs[0].innerText);
            if (alltopics_atm.indexOf(topicName ) < 0) {
                alltopics_atm.push(topicName);

                var optionElement = atmWindow.document.createElement("option");
                optionElement.setAttribute("value", topicName);
                var optionElement_text = atmWindow.document.createTextNode(topicName);
                optionElement.appendChild(optionElement_text);
                topicOptions.appendChild(optionElement);
                topicsDropdown.appendChild(optionElement);

                var liElement= atmWindow.document.createElement("li");
                var inputElement= atmWindow.document.createElement("input");
                inputElement.setAttribute("type", "checkbox");
                inputElement.setAttribute("value", topicName);
                inputElement.setAttribute("name", "topicCheckList_Option");
                var liElement_text = atmWindow.document.createTextNode(topicName);
                liElement.appendChild(inputElement);
                liElement.appendChild(liElement_text);
                topicCheckList.appendChild(liElement);
            }
        }


        topicsDropdown.setAttribute("list", "optionsList_atm");
    }

    // Based on the given value, shows the appropriately selected section in the popup
    function showSection(value, isEdit){
        hideSections();
        let valueForHighlight = value == "editAffiliateForm" ? "checkAffiliate" : value;
        atmWindow.document.getElementById(valueForHighlight).style.backgroundColor = 'yellowgreen';
        switch(value){
            case "addTopic":
                atmWindow.document.getElementById("addTopicForm").style.display = "block";
                break;
            case "addAffiliate":
                atmWindow.document.getElementById("addAffiliateForm").style.display = "block";
                let menuTitle = isEdit ? "Edit Person" : "Add a Person";
                let addButtonView = isEdit ? "none" : "block";
                let editButtonView = isEdit ? "block" : "none";
                atmWindow.document.getElementById("addAffiliate").innerHTML = menuTitle ;
                atmWindow.document.getElementById("addNewAffiliate").style.display = addButtonView;
                atmWindow.document.getElementById("editOldAffiliate").style.display = editButtonView;
                break;
            case "checkAffiliate":
                atmWindow.document.getElementById("checkAffiliateForm").style.display = "block";
                break;
            case "editAffiliate":
                atmWindow.document.getElementById("editAffiliateForm").style.display = "block";
                break;
            case "helpAndTips":
                atmWindow.document.getElementById("helpAndTipsSection").style.display = "block";
                break;
            default:
                hideSections();
        }
    }

    // Hides all of the sections. Used in conjunction with showSection() to show a new section
    function hideSections(){
        resetForms();
        var sectionz = atmWindow.document.getElementsByClassName("sectionz");
        for (var y = 0; y < sectionz.length; y++){
            sectionz[y].style.display = "none";
        }
		for (var c = 0; c < menuListList.length; c++){
            menuListList[c].style.backgroundColor = 'inherit';
        }
    }


// VALIDATION Functions
    // Simply trims any string data
    function cleanup(value) {
        return value.trim();
    }

    // This resets the validation on all fields
    function resetForms(){
        
        // Resetting the form with person info
        atmWindow.document.getElementById("addAffiliate").innerHTML = "Add a Person";
        newAffil_Name.value = "";
        newAffil_Email.value = "";
        newAffil_Org.value = "";
        newAffil_OrgCustom.value = "";
        var topicOptions = atmWindow.document.querySelectorAll("#topicCheckList li input");
        for (var z = 0; z < topicOptions.length; z++){
            topicOptions[z].checked = false;
        }
        atmWindow.document.getElementById("affilNameError_atm").style.display = "none";
        atmWindow.document.getElementById("affilEmailError_atm").style.display = "none";
        atmWindow.document.getElementById("affilOrgError_atm").style.display = "none";
        atmWindow.document.getElementById("newOrganizationField").style.display = "none";
        

        // Resetting the topic form
        topic_atm.value = "";
        atmWindow.document.getElementById("topicError_atm").style.display = "none";
        newTopicDescriptionSubSection.style.display = "none";
        newTopicName.value = "";
        newTopicName.style.display = "none";


        // Reset check for affil form
        checkAffilName.value = "";
        atmWindow.document.getElementById("checkAffilNameError_atm").style.display = "none";


        // Reset results of table update:
        atmWindow.document.getElementById("addAffilResultsMessage").style.display = "none";
        atmWindow.document.getElementById("addAffilResultsMessage").style.color = "initial";
        atmWindow.document.getElementById("addAffilResultsMessage").innerHTML = "";
        atmWindow.document.getElementById("reminderImage").style.display = "none";
        atmWindow.document.getElementById("reminderHeader").style.display = "none";
    }

    // Makes sure that you've entered a value for a new topic.
    function validateNewTopic_atm() {
        try {
            var topicIsSet = false;
            var topicDescIsSet = false;
            if (!topic_atm.value || ( topic_atm.value == "newtopic" && !newTopicName.value ) ) {
                atmWindow.document.getElementById("topicError_atm").style.display = "block";
            } else {
                atmWindow.document.getElementById("topicError_atm").style.display = "none";
                topicIsSet = true;
            }
            if (topic_atm.value == "newtopic" && !newTopicDescriptionInput.value ) {
                atmWindow.document.getElementById("topicDescriptionError_atm").style.display = "block";
            } else {
                atmWindow.document.getElementById("topicDescriptionError_atm").style.display = "none";
                topicDescIsSet = true;
            }
            if (topicIsSet && topicDescIsSet) {
                let topicValue = topic_atm.value == "newtopic" ? newTopicName.value : topic_atm.value;
                let topicDesc = newTopicDescriptionInput.value ? newTopicDescriptionInput.value : "";
                addTopicsToExistingRows(topicValue, topicDesc);
            }
        } catch (err) {
            atmWindow.document.getElementById("errorMessageForm").innerHTML = err;
        }
    }

    // Makes sure that you've entered all the appropriate values for a new Affiliate
    function validateAffilFields_atm(event) {
        try {
            
            if (!newAffil_Name.value) {
                atmWindow.document.getElementById("affilNameError_atm").style.display = "block";
            } else {
                atmWindow.document.getElementById("affilNameError_atm").style.display = "none";
            }
            if (!newAffil_Email.value) {
                atmWindow.document.getElementById("affilEmailError_atm").style.display = "block";
            } else {
                atmWindow.document.getElementById("affilEmailError_atm").style.display = "none";
            }
            var orgIsSet = false;
            if (!newAffil_Org.value) {
                atmWindow.document.getElementById("affilOrgError_atm").style.display = "block";
            } else if (newAffil_Org.value == "neworg" && !newAffil_OrgCustom.value) {
                atmWindow.document.getElementById("affilOrgError_atm").style.display = "block";
            } else {
                atmWindow.document.getElementById("affilOrgError_atm").style.display = "none";
                orgIsSet = true;
            }
            if (newAffil_Name.value && newAffil_Email.value && orgIsSet ) {
                let button = event.target;
                let orgValue = newAffil_OrgCustom.value ? newAffil_OrgCustom.value : newAffil_Org.value;
                let isNewOrg = newAffil_OrgCustom.value ? true : false;
                if (button.id == "addNewAffiliate" ){
                    addNewAffilRow(newAffil_Name.value, orgValue, newAffil_Email.value, isNewOrg);
                } else {
                    editAffilRow(newAffil_Name.value, orgValue, newAffil_Email.value);
                }
            }
        } catch (err) {
            atmWindow.document.getElementById("errorMessageForm").innerHTML = err;
        }
    }

    // Makes sure that you've entered a value for checking for a person at an affiliate.
    function validateCheckForAffil(){
        if (!checkAffilName.value) {
            atmWindow.document.getElementById("checkAffilNameError_atm").style.display = "block";
        } else {
            atmWindow.document.getElementById("checkAffilNameError_atm").style.display = "none";
            checkForAffiliate(checkAffilName.value);
        }
    }


// EXECUTE Functions - These functions execute changes / searches to the table
    
    // Takes the selected topic and adds it to all people in the table that do not currently have it. 
    // Returns a count of how many people it was added to.
    // It does *NOT* automatically check it for the users, just adds it as an option
    function addTopicsToExistingRows(value, description) {
        getTablesForATM();
        try {
            if (!alltopics_atm.includes(value)){
                alltopics_atm.push(value);
                addNewTopic(value, description);
            }
            var numberAdded = 0;
            for (var y = 2; y < affilRows_atm.length; y++) {
                var topicAlreadyIncluded = false;
                var TDs = affilRows_atm[y].querySelectorAll("td.confluenceTd");
                var theULElement = TDs[3].getElementsByTagName("ul")[0];
                var topics_atmPerRow = TDs[3].querySelectorAll("ul.inline-task-list li");
                for (var xx = 0; xx < topics_atmPerRow.length; xx++) {
                    if (topics_atmPerRow[xx].innerHTML == value) {
                        topicAlreadyIncluded = true;
                    }
                }
                if (!topicAlreadyIncluded) {
                    var newTopicLI = originalWindow.document.createElement("li");
                    var newTopicLI_text = originalWindow.document.createTextNode(value);
                    newTopicLI.appendChild(newTopicLI_text);
                    theULElement.appendChild(newTopicLI);
                    numberAdded++; 
                }
            }

            tablesUpdated(true, "topic", value , false, numberAdded);

        } catch (err) {
            atmWindow.alert(err);
	    atmWindow.console.log(err);
        }
    }

    // Adds a new Topic to the Topics Table.
    function addNewTopic(topicName, description){
        try {
            var row = originalWindow.document.createElement("tr");
            var columnOne = originalWindow.document.createElement("td");
                columnOne.setAttribute("class", "confluenceTd");
                columnOne.append(originalWindow.document.createTextNode(topicName));
            var columnTwo = originalWindow.document.createElement("td");
                columnTwo.setAttribute("class", "confluenceTd");
                columnTwo.append(originalWindow.document.createTextNode(description));

            row.append(columnOne);
            row.append(columnTwo);

            var lastRowIndex = topicRows_atm.length-1;
            var parent = topicRows_atm[lastRowIndex].parentNode;  
            parent.insertBefore(row, parent.childNodes[lastRowIndex-1]);
            sortTable("topics");
        } catch (err) {
            atmWindow.alert(err);
	    atmWindow.console.log(err);
        }
    }

    // Adds a new Affiliate to the Affiliate table
    function addNewAffilRow(nameVal, orgNameVal , emailVal, isNewOrg) {
        getTablesForATM();
        try {
            var row = originalWindow.document.createElement("tr");
            var columnOne = originalWindow.document.createElement("td");
                columnOne.setAttribute("class", "confluenceTd");
                columnOne.append(originalWindow.document.createTextNode(orgNameVal ));
            var columnTwo = originalWindow.document.createElement("td");
                columnTwo.setAttribute("class", "confluenceTd");
                columnTwo.append(originalWindow.document.createTextNode(nameVal));
            var columnThree = originalWindow.document.createElement("td");
                columnThree.setAttribute("class", "confluenceTd");
                columnThree.append(originalWindow.document.createTextNode(emailVal));
            var columnFour = originalWindow.document.createElement("td");
                columnFour.setAttribute("class", "confluenceTd");
            var newUL = originalWindow.document.createElement("ul");
                newUL.setAttribute("class", "inline-task-list");
            

            var addAffilOptions = atmWindow.document.getElementsByName("topicCheckList_Option");
            for (var top = 0; top < addAffilOptions.length; top++){
                var newTopicLI = originalWindow.document.createElement("li");
                newTopicLI.appendChild(originalWindow.document.createTextNode(addAffilOptions[top].value));
                if (addAffilOptions[top].checked) {
                    newTopicLI.setAttribute("class", "checked");
                }
                newUL.appendChild(newTopicLI);
            }

            row.append(columnOne);
            row.append(columnTwo);
            row.append(columnThree);
            columnFour.append(newUL);
            row.append(columnFour);

            var lastRowIndex = affilRows_atm.length-1;
            var parent = affilRows_atm[lastRowIndex].parentNode;  
            parent.insertBefore(row, parent.childNodes[lastRowIndex-1]);

            tablesUpdated(true, "person", nameVal, true);

            sortTable("affils");

            if (isNewOrg){
                addNewOrganization(orgNameVal);
            }


        } catch (err) {
            tablesUpdated(false, "person", err);
        }
    }

    // Adds a new Organization to the Organization Table.
    function addNewOrganization(nameVal){
        try {
            var row = originalWindow.document.createElement("tr");
            var columnOne = originalWindow.document.createElement("td");
                columnOne.setAttribute("class", "confluenceTd");
                columnOne.append(originalWindow.document.createTextNode(nameVal));
            var columnTwo = originalWindow.document.createElement("td");
                columnTwo.setAttribute("class", "confluenceTd");
                let abbrev = nameVal.toUpperCase().substring(0,3);
                columnTwo.append(originalWindow.document.createTextNode(abbrev));
			var columnThree = originalWindow.document.createElement("td");
                columnThree.setAttribute("class", "confluenceTd");
                columnThree.append(originalWindow.document.createTextNode(""));
			var columnFour = originalWindow.document.createElement("td");
                columnFour.setAttribute("class", "confluenceTd");
                columnFour.append(originalWindow.document.createTextNode(""));


            row.append(columnOne);
            row.append(columnTwo);
            row.append(columnThree);
            row.append(columnFour);

            var lastRowIndex = orgRows_atm.length-1;
            var parent = orgRows_atm[lastRowIndex].parentNode;  
            parent.insertBefore(row, parent.childNodes[lastRowIndex-1]);

            sortTable("orgs");

        } catch (err) {
            atmWindow.alert(err);
	    atmWindow.console.log(err);
        }
    }

    // Edits the currently loaded person, updating any information that changed
    function editAffilRow(nameVal, orgNameVal, emailVal){
        getTablesForATM();
        try{
            let rowNum = atmWindow.document.getElementById("hiddenRowNum").value;
            let TDs = affilRows_atm[rowNum].querySelectorAll("td.confluenceTd");

            let personOrg = TDs[0];
            let personName = TDs[1];
            let personEmail = TDs[2];
            let personTopics = TDs[3].querySelectorAll(".inline-task-list")[0];

            personOrg.innerHTML = orgNameVal;
            personName.innerHTML = nameVal;
            personEmail.innerHTML = emailVal;
            personTopics.innerHTML = "";
            var addAffilOptions = atmWindow.document.getElementsByName("topicCheckList_Option");
            for (var top = 0; top < addAffilOptions.length; top++){
                if (addAffilOptions[top].checked) {
                    personTopics.innerHTML += "<li class='checked'>" + addAffilOptions[top].value + "</li>";
                } else {
                    personTopics.innerHTML += "<li>" + addAffilOptions[top].value + "</li>";                    
                }
            }

            tablesUpdated(true, "person", nameVal, false);

            sortTable("affils");

        } catch (err){
            tablesUpdated(false, "person", err);
        }                
    }

    // This function shows the success message and image after editing the table.
    function tablesUpdated(isSuccess, entityName, value, isNewPerson, topicsCount){
        hideSections();
        var numPersonsTopicAddedTo = topicsCount ? topicsCount : -1;
        let verbage = "<br/><br/>";

        if (!isSuccess){
            verbage = "";
        } else if ( entityName == "person" && isNewPerson){
            verbage += "was added to the persons table.";
        } else if (entityName == "person" && ! isNewPerson){
            verbage += "was updated.";
        } else if (entityName == "topic" & topicsCount > 0 ){
            verbage += "was added to " + numPersonsTopicAddedTo + " people.";
        } else if (entityName == "topic" & topicsCount == 0 ){
            verbage += "is already an option for everyone in the table.";
        }
        
        let resultsState = isSuccess ? "Success:<br/><br/>" : "Error!<br/><br/>";

        let resultsMessage = resultsState + "<em>" + value + "</em>" + verbage;

        var resultsColor = "";
        if (entityName == "topic" && topicsCount == 0){
            resultsColor = "orange";
        } else if (isSuccess){
            resultsColor = "seagreen";
        } else{
            resultsColor = "red";
        }


        atmWindow.document.getElementById("addAffilResultsMessage").style.display = "block";
        atmWindow.document.getElementById("addAffilResultsMessage").style.color = resultsColor;
        atmWindow.document.getElementById("addAffilResultsMessage").innerHTML = resultsMessage;
    
        if (isSuccess){
            var rand = Math.floor(Math.random()*reminderImages.length);
            atmWindow.document.getElementById("reminderImage").setAttribute("src", reminderImages[rand].url);
            atmWindow.document.getElementById("reminderImage").setAttribute("width", reminderImages[rand].width);
            atmWindow.document.getElementById("reminderImage").setAttribute("height", reminderImages[rand].height);
            atmWindow.document.getElementById("reminderImage").style.display = "block";
            atmWindow.document.getElementById("reminderHeader").style.display = "block";
        }
    }

    // Checks the table for the given name
    function checkForAffiliate(name){
        try {
            let searchTypeOptions = atmWindow.document.getElementsByName("searchtype");
            var searchType = "personname";
            for (var t = 0; t < searchTypeOptions.length; t++){
                if (searchTypeOptions[t].checked){
                    searchType = searchTypeOptions[t].value;
                    break;
                }
            }

            var checkAffilResults = "<h3>Results: <span style='font-size:90%;'>click name to view details and edit</span></h3>";
            for (var y = 2; y < affilRows_atm.length; y++) {
                var TDs = affilRows_atm[y].querySelectorAll("td.confluenceTd");
                let rowValue = searchType == "personname" ? TDs[1].innerText : TDs[0].innerText;
                if (rowValue.toLowerCase().includes(name.toLowerCase())){
                    let rowName = TDs[1].innerText;
                    let rowAffil = TDs[0].innerText;
                    checkAffilResults += "<p> <a class='checkForPersonResults' id='" + y + "' style='color:blue;cursor:pointer;'>" + rowName + "</a> --- " + rowAffil + "</p>";
                }
            }
            atmWindow.document.getElementById("checkAffilResultsMessage").innerHTML = checkAffilResults;
            atmWindow.document.getElementById("checkAffilResultsMessage").style.display = "block";
            addEditPersonListener();
        } catch (err){
            atmWindow.alert(err);
	    atmWindow.console.log(err);
        }
    }

    // Adds a listener to the list of people returned when you search for names
    // This is so that if you click on them, it will load their info - which you can edit.
    function addEditPersonListener(){
        var persons = atmWindow.document.getElementsByClassName("checkForPersonResults");
        for (var x = 0; x < persons.length; x++){
            persons[x].addEventListener("click", viewEditPersonSection);
        }
    }

    // This is what loads the persons information into the form so you can edit it.
    function viewEditPersonSection(event){
        showSection("addAffiliate", true);
        let targetID = event.target.id;
        
        atmWindow.document.getElementById("hiddenRowNum").value = targetID;

        var TDs = affilRows_atm[targetID].querySelectorAll("td.confluenceTd");
        var checkTopics = TDs[3].querySelectorAll("ul.inline-task-list li.checked");
        var selectedTopicValues = [];
        for (var q = 0; q < checkTopics.length; q++){
            selectedTopicValues.push(checkTopics[q].innerHTML);
        }
        var topicOptions = atmWindow.document.querySelectorAll("#topicCheckList li input");
        for (var z = 0; z < topicOptions.length; z++){
            let thisOne = topicOptions[z];
            if ( selectedTopicValues.includes(thisOne.value) ){
                thisOne.checked = true;
            }
        }
        atmWindow.document.getElementById("addAffiliateForm_SelectOrg").value = TDs[0].innerHTML
        atmWindow.document.getElementById("newAffilName").value = TDs[1].innerHTML
        atmWindow.document.getElementById("newAffilEmail").value = TDs[2].innerHTML
    }


    // This function sorts the table after any changes that are made to the listed folks
    function sortTable(whichRows){
        getTablesForATM();
        let rowsToSort = whichRows == "affils" ? affilRows_atm : whichRows == "orgs" ? orgRows_atm : topicRows_atm;
        for (var x = 2; x < rowsToSort.length; x++){
            if (rowsToSort.length == 1){ return; }
            if (x == 2){ continue; }

            var currentIndex = x;

            while ( currentIndex > 2){
                
                let topRow = rowsToSort[currentIndex-1];
                let bottomRow = rowsToSort[currentIndex];

                let topRowCols = topRow.querySelectorAll("td.confluenceTd");
                let bottomRowCols = bottomRow.querySelectorAll("td.confluenceTd");

                let topRowValue = topRowCols[0].innerHTML;
                let bottomRowValue = bottomRowCols[0].innerHTML;

                let compare = topRowValue.localeCompare(bottomRowValue);
                
                if (compare > 0){
                    swapRows(topRowCols, bottomRowCols);
                } else if (compare == 0) {
                    let topRowValue2 = topRowCols[1].innerHTML;
                    let bottomRowValue2 = bottomRowCols[1].innerHTML;
                    let compare2 = topRowValue2.localeCompare(bottomRowValue2);
                    if (compare2 > 0){
                        swapRows(topRowCols, bottomRowCols);
                    }
                }

                currentIndex--;
            }   
        }
    }

    // A helper function for sorting table rows. It does the swapping of the info
    function swapRows(topRow, bottomRow){
        let temp = {};
        temp["colOne"] = bottomRow[0].innerHTML;
        temp["colTwo"] = bottomRow[1].innerHTML;


        bottomRow[0].innerHTML = topRow[0].innerHTML;
        bottomRow[1].innerHTML = topRow[1].innerHTML;


        topRow[0].innerHTML = temp["colOne"];
        topRow[1].innerHTML = temp["colTwo"];


        if (topRow.length > 2 && bottomRow.length > 2){
            temp["colThree"] = bottomRow[2].innerHTML;
            temp["colFour"] = bottomRow[3].innerHTML;


            bottomRow[2].innerHTML = topRow[2].innerHTML;
            bottomRow[3].innerHTML = topRow[3].innerHTML;

            topRow[2].innerHTML = temp["colThree"];
            topRow[3].innerHTML = temp["colFour"];
        }
    }
