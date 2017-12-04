orgNames2 = [ {"name": "Company #1" , "desc" : "Company #1"},
	      {"name": "Company #2" , "desc" : "Company #2"},
	      {"name": "Company #3" , "desc" : "Company #3"}
        ];
var style = "<style> #addTopicForm { display:none; width:50%; float:left; margin-left:5%; border:1px solid black; border-radius:5px; text-align:left; padding:1%; }"
	+ "#addAffiliateForm { display:none; width:50%; float:left; margin-left:5%; margin-right:2%; border:1px solid black; border-radius:5px; text-align:left; padding:1%; }"
	+ ".sectionz { display:none; width:50%; float:left; margin-left:5%; margin-right:2%; border:1px solid black; border-radius:5px; text-align:left; padding:1%; }"
	+ ".errorMsg { display:none; color:red; } .resultsMsg { display:none; color:black; text-align:center; font-size:20px; }"
	+ ".hidden { display:none; } " 
	+ ".required:after { content: \" * \"; color:red; font-weight:bold; }"
	+ ".formLabel_atm { text-weight:bold; color:blue; margin-right:10px;}" 
	+ "#topics_atm { width:100% }" 
	+ "#versionP { text-align:right; font-size:10px;color:black; }"
	+ "#versionNum{font-size:10px;color:black; }"
	+ ".menuList { display:inline-block; border:1px solid gray; border-radius:10px; padding:1%; margin-right:1%; width:20%; cursor:pointer; text-align:center;}"
	+ ".menuList:hover { background-color:yellowgreen;}"
	+ ".clear { clear:both;}"
	+ "@media only screen and (max-width:900px){ #addTopicForm { width:80%; } }" 
	+ "</style>";


var dataList = "<datalist id=\"optionsList_atm\"></datalist>";
var orgsDataList = "<datalist id=\"orgsList_atm\"></datalist>";

var description = "<h2>Affiliate Table Manager <span id='versionNum'>- Version 1.1</span></h2>"
					+"<div>Use this tool to manage the list of affiliates and topics in our email table. You can do one of the following: </div>";


var menuList = "<p class='menuList' id=\"checkAffiliate\"> Check for an Affiliate </p>"
				+ "<p class='menuList' id=\"addTopic\">Add a Topic</p>"
				+ "<p class='menuList' id=\"addAffiliate\"> Add an Affiliate </p>"
				+ "<br class=\"clear\"/>";
				/*+ "<p class='menuList' id=\"editTopic\"> Edit a Topic </p>"
				+ "<p class='menuList' id=\"editAffiliate\"> Edit an Affiliate</p>" 
				*/


var addTopicForm = "<div id=\"addTopicForm\" class=\"sectionz\">"
	+ "<label class=\"formLabel_atm required\">Enter / Select a Topic</label>" 
	+ "<input id=\"topics_atm\" placeholder=\"Enter a new topic or select existing one\" onClick=\"this.select(); this.value=''; this.value=''; \"/>"
	+ "<p id=\"topicError_atm\" class=\"errorMsg\">Please enter a new topic or select an existing one.</p>" 
	+ "<br/><br/>" 
	+ "<label class=\"formLabel_atm required\">Which Affiliate Should This Topic Be Applied To?</label><span id=\"affilSelectError\" class=\"errorMsg\">Please select at least one affiliate </span><br/>" 
	+ "<table>"
		+ "<tr><td><input id=\"selectAllOrgs\" type=\"checkbox\" name=\"SelectAll\" value=\"ALL\"/>ALL</td></tr>" 
		+ "<tr>" 
			+ "<td><input type=\"checkbox\" name=\"organizations\" value=\"Company #1\"/> Company #1</td>" 
			+ "<td><input type=\"checkbox\" name=\"organizations\" value=\"Company #2\"/> Company #2</td>" 
			+ "<td><input type=\"checkbox\" name=\"organizations\" value=\"Company #3\"/> Company #3</td>" 
		+ "</tr>"  
	+ "</table>" 
	+ "<br/><br/>" 
	+ "<button id=\"addNewTopic\"> Add New Topic </button>" 
	+ "<p id=\"errorMessageForm\" class=\"errorMsg\">Something went wrong!</p><p id=\"resultsMsg\" class=\"resultsMsg\"></p>" 
	+ "<br/><br/>" 
	+ "<p id=\"versionP\">Version <span id=\"versionNumber\">0.1</p>"
	+ "</div>" 
	+ "<br class=\"clear\"/>";






var addAffiliateForm = "<div id=\"addAffiliateForm\" class=\"sectionz\">"
	+ "<label> Enter the Affiliate's Info</label>"
	+ "<br/><br/>"
	+ "<label class=\"required\">Name: </label>"
	+ "<input id=\"newAffilName\" placeholder=\"Enter name\"/>"
	+ "<p id=\"affilNameError_atm\" class=\"errorMsg\">Please enter the affiliate's name.</p>"
	+ "<br/><br/>"
	+ "<label class=\"required\">Email: </label>"
	+ "<input type=\"email\" id=\"newAffilEmail\" placeholder=\"Enter email\"/>"
	+ "<p id=\"affilEmailError_atm\" class=\"errorMsg\">Please enter the affiliate's email.</p>"
	+ "<br/><br/>"
	+ "<label class=\"required\"> Organization: </label>"
	+ "<input id=\"addAffiliateForm_SelectOrg\" placeholder=\"Select Organization\"/>"
	+ "<p id=\"affilOrgError_atm\" class=\"errorMsg\">Please select an org.</p>"
	+ "<br/><br/>"
	+ "<label>Select Topic(s): </label>"
	+ "<br/>"
	+ "<ul id=\"topicCheckList\"></ul>"
	+ "<br/>"
	+ "<button id=\"addNewAffiliate\"> Add New Affiliate </button>" 
	+ "</div>"
	+ "<p id=\"addAffilResultsMessage\" class=\"resultsMsg\"></p>"
	+ "<img id=\"reminderImage\" class=\"hidden\" alt=\"Reminder Image\"/>"
	+ "<h2 id=\"reminderHeader\" class=\"hidden\" style=\"color:blue;\" >Save the Confluence Page</h2>"
	+ "<br class=\"clear\"/>";


var checkAffiliateForm = "<div id=\"checkAffiliateForm\" class=\"sectionz\">"
	+ "<label class=\"required\">Who are you checking for?</label>"
	+ "<br/><br/>"
	+ "<input id=\"checkAffilName\" placeholder=\"Enter name\"/>"
	+ "<p id=\"checkAffilNameError_atm\" class=\"errorMsg\">Please enter the affiliate's name.</p>"
	+ "<br/><br/>"
	+ "<button id=\"checkForAffiliateButton\"> Check For Affiliate </button>" 
	+ "</div>"
	+ "<br class=\"clear\"/>"
	+ "<div class=\"sectionz\" id=\"checkAffilResultsMessage\" style=\"width:70%;\" class=\"resultsMsg\"></div>"
	+ "<br class=\"clear\"/>";
/* ------------------------------------------------------------------------------------------------------------------------------------------------- */

/* Global Variables */
var winHeight = screen.height - 500;
var winWidth = screen.width / 2.5;
var winTop = 100;
var windowDim = "top=" + winTop  + "px, width=" + winWidth  + "px,height=" + winHeight  + "px" + ",location=no";

var originalWindow = window;
var editPageQuery = "?draftId=38093736&draftShareId=c4a37cf3-eb06-44da-a4b0-49b409b5a524";
var currentPageQuery = originalWindow.location.search;
var org_atm, topic_atm, affiliateTable_atm, affilRows_atm;
var newAffil_Name, newAffil_Email, newAffil_Org, checkAffilName;
var theRightTable;
var ifr, ifrDoc; 
var resultsWindow;
var menuListList;
var reminderImages = [ 	{ "url" : "https://media.tenor.com/images/d32612ecb66f713b621f17be89e0ddfb/tenor.gif", "width": 250, "height" : 150 },
					  	{ "url" : "http://24.media.tumblr.com/tumblr_meco1kwwdh1rj579lo1_500.gif", "width": 200, "height" : 200 },
						{ "url" : "https://media.tenor.com/images/7174d3daea804eab58855949aa9f7606/tenor.gif", "width": 250, "height" : 150 }
					];



document.getElementById("startATM").addEventListener("click", startATM);


function startATM(){
	try{
	    originalWindow = window;
	    resultsWindow = window.open("", "This is a Test", windowDim);
	    resultsWindow.document.write(style + dataList + orgsDataList + description + menuList  + addTopicForm + addAffiliateForm + checkAffiliateForm);
	    affiliateTable_atm = originalWindow.document.getElementById("tableContainer");
	    affilRows_atm = affiliateTable_atm.querySelectorAll("tbody tr");
	    init_atm();	
	} catch (err){
	    alert(err);
	}
}


function init_atm() {

	menuListList = resultsWindow.document.getElementsByClassName("menuList");
	for (var c = 0; c < menuListList.length; c++){
		menuListList[c].addEventListener("click", function(){
			showSection(this.id);
		}, false);
	}
	//Initializing global variables to the DOM object for fields that users can make a selection / enter a value
    newAffil_Name = resultsWindow.document.getElementById("newAffilName");
	newAffil_Email = resultsWindow.document.getElementById("newAffilEmail");
    newAffil_Org = resultsWindow.document.getElementById("addAffiliateForm_SelectOrg");
    checkAffilName = resultsWindow.document.getElementById("checkAffilName");
    org_atm = resultsWindow.document.getElementsByName("organizations");
    topic_atm = resultsWindow.document.getElementById("topics_atm");

	// Adding listeners to the "submit" buttons on each form / as well as the 'select all' concept
   	resultsWindow.document.getElementById("addNewTopic").addEventListener("click", validateFields_atm);
   	resultsWindow.document.getElementById("addNewAffiliate").addEventListener("click", validateAffilFields_atm);
   	resultsWindow.document.getElementById("checkForAffiliateButton").addEventListener("click", validateCheckForAffil);
    resultsWindow.document.getElementById("selectAllOrgs").addEventListener("change", function() {
        for (var x = 0; x < org_atm.length; x++) {
            if (this.checked) {
                org_atm[x].checked = true;
            } else {
                org_atm[x].checked = false;
            }
        }
    });


	//Setting the list of organizations (based on the object above)
	setOrgsList();
	// Getting a list of existing topics based on the view mode of the page.
	populateExistingTopics();
}

function showSection(value){
	for (var c = 0; c < menuListList.length; c++){
		menuListList[c].style.backgroundColor = 'inherit';
	}
	resultsWindow.document.getElementById(value).style.backgroundColor = 'yellowgreen';
	hideSections();
	switch(value){
		case "addTopic":
            resultsWindow.document.getElementById("addTopicForm").style.display = "block";
			break;
		case "addAffiliate":
            resultsWindow.document.getElementById("addAffiliateForm").style.display = "block";
			break;
		case "checkAffiliate":
            resultsWindow.document.getElementById("checkAffiliateForm").style.display = "block";
			break;
		/*case "editTopic":
            //resultsWindow.document.getElementById("addTopicForm").style.display = "block";
			break;
		case "editAffiliate":
            resultsWindow.document.getElementById("addTopicForm").style.display = "block";
			break;*/
		default:
			hideSections();
	}
}

function hideSections(){
	var sectionz = resultsWindow.document.getElementsByClassName("sectionz");
	for (var y = 0; y < sectionz.length; y++){
		sectionz[y].style.display = "none";
	}
}


function setOrgsList(){
    var orgOptions = resultsWindow.document.getElementById("orgsList_atm");
	for (var x = 0; x < orgNames2.length; x++) {
        var optionElement = resultsWindow.document.createElement("option");
        optionElement.setAttribute("value", orgNames2[x].name);
        var optionElement_text = resultsWindow.document.createTextNode(orgNames2[x].desc);
        optionElement.appendChild(optionElement_text);
        orgOptions.appendChild(optionElement);
    }
    resultsWindow.document.getElementById("addAffiliateForm_SelectOrg").setAttribute("list", "orgsList_atm");
}

function populateExistingTopics() {
    alltopics_atm = [];
    for (var y = 2; y < affilRows_atm.length; y++) {
        var TDs = affilRows_atm[y].querySelectorAll("td.confluenceTd");
        var topics_atmArray = [];
        var topics_atmPerRow = TDs[3].querySelectorAll("ul.inline-task-list li");
        for (var xx = 0; xx < topics_atmPerRow.length; xx++) {
            if (alltopics_atm.indexOf(cleanup(topics_atmPerRow[xx].innerText)) < 0) {
                alltopics_atm.push(cleanup(topics_atmPerRow[xx].innerText));
            }
        }
    }
    alltopics_atm.sort(function(a, b) {
        if (a.toLowerCase() < b.toLowerCase()) {
            return -1;
        } else if (a.toLowerCase() < b.toLowerCase()) {
            return 1
        } else {
            return 0;
        }
    });
    var topicOptions = resultsWindow.document.getElementById("optionsList_atm");
	var topicCheckList = resultsWindow.document.getElementById("topicCheckList");
    for (var x = 0; x < alltopics_atm.length; x++) {
        var optionElement = resultsWindow.document.createElement("option");
        optionElement.setAttribute("value", alltopics_atm[x]);
        var optionElement_text = resultsWindow.document.createTextNode(alltopics_atm[x]);
        optionElement.appendChild(optionElement_text);
        topicOptions.appendChild(optionElement);

		var liElement= resultsWindow.document.createElement("li");
		var inputElement= resultsWindow.document.createElement("input");
		inputElement.setAttribute("type", "checkbox");
        inputElement.setAttribute("value", alltopics_atm[x]);
        inputElement.setAttribute("name", "topicCheckList_Option");
        var liElement_text = resultsWindow.document.createTextNode(alltopics_atm[x]);
		liElement.appendChild(inputElement);
        liElement.appendChild(liElement_text);
		topicCheckList.appendChild(liElement);
    }
    resultsWindow.document.getElementById("topics_atm").setAttribute("list", "optionsList_atm");
}

function validateFields_atm() {
    try {
        var numOfSelectedOrgs = 0;
        for (var c = 0; c < org_atm.length; c++) {
            if (org_atm[c].checked) {
                numOfSelectedOrgs++;
            }
        }
        if (!topic_atm.value) {
            resultsWindow.document.getElementById("topicError_atm").style.display = "block";
        } else {
            resultsWindow.document.getElementById("topicError_atm").style.display = "none";
        }
        if (numOfSelectedOrgs < 1) {
            resultsWindow.document.getElementById("affilSelectError").style.display = "block";
        } else {
            resultsWindow.document.getElementById("affilSelectError").style.display = "none";
        }
        if (topic_atm.value && numOfSelectedOrgs > 0) {
            var orgsSelected = "";
            var orgsSelected2 = [];
            for (var q = 0; q < org_atm.length; q++) {
                if (org_atm[q].checked) {
                    orgsSelected += "\n> " + org_atm[q].value + "\n";
                    orgsSelected2.push(org_atm[q].value);
                }
            }
            addTopicsToExistingRows(topic_atm.value, orgsSelected2);
        }
    } catch (err) {
        resultsWindow.document.getElementById("errorMessageForm").innerHTML = err;
    }
}


function validateAffilFields_atm() {
    try {
        if (!newAffil_Name.value) {
            resultsWindow.document.getElementById("affilNameError_atm").style.display = "block";
        } else {
            resultsWindow.document.getElementById("affilNameError_atm").style.display = "none";
        }
        if (!newAffil_Email.value) {
            resultsWindow.document.getElementById("affilEmailError_atm").style.display = "block";
        } else {
            resultsWindow.document.getElementById("affilEmailError_atm").style.display = "none";
        }
        if (!newAffil_Org.value) {
            resultsWindow.document.getElementById("affilOrgError_atm").style.display = "block";
        } else {
            resultsWindow.document.getElementById("affilOrgError_atm").style.display = "none";
        }
        if (newAffil_Name.value && newAffil_Email.value && newAffil_Org.value) {
			addNewAffilRow(newAffil_Name.value, newAffil_Org.value, newAffil_Email.value);
        }
    } catch (err) {
        resultsWindow.document.getElementById("errorMessageForm").innerHTML = err;
    }
}


function validateCheckForAffil(){
	if (!checkAffilName.value) {
		resultsWindow.document.getElementById("checkAffilNameError_atm").style.display = "block";
    } else {
        resultsWindow.document.getElementById("checkAffilNameError_atm").style.display = "none";
		checkForAffiliate(checkAffilName.value);
    }
}

function cleanup(value) {
    return value.trim();
}

function addTopicsToExistingRows(value, selected) {
    try {
        var numberAdded = 0;
        for (var y = 2; y < affilRows_atm.length; y++) {
            var topicAlreadyIncluded = false;
            var TDs = affilRows_atm[y].querySelectorAll("td.confluenceTd");
            if (selected.includes(TDs[0].innerHTML)) {
                var theULElement = TDs[3].getElementsByTagName("ul")[0];
                var topics_atmPerRow = TDs[3].querySelectorAll("ul.inline-task-list li");
                for (var xx = 0; xx < topics_atmPerRow.length; xx++) {
                    if (topics_atmPerRow[xx].innerHTML == topic_atm.value) {
                        topicAlreadyIncluded = true;
                    }
                }
                if (!topicAlreadyIncluded) { 
                    var newTopicLI = originalWindow.document.createElement("li");
                    var newTopicLI_text = originalWindow.document.createTextNode(topic_atm.value);
                    newTopicLI.appendChild(newTopicLI_text);
                    theULElement.appendChild(newTopicLI);
                    numberAdded++; 
                }
            }
        }
        resultsWindow.document.getElementById("resultsMsg").style.display = "block";
        if (numberAdded > 0) {
            resultsWindow.document.getElementById("resultsMsg").style.color = "seagreen";
            resultsWindow.document.getElementById("resultsMsg").innerHTML = "Success:<br/><em>'" + value + "'</em><br/>was added for " + numberAdded + " people.";
        } else {
            resultsWindow.document.getElementById("resultsMsg").style.color = "orange";
            resultsWindow.document.getElementById("resultsMsg").innerHTML = "Done processing!<br/><em>'" + value + "'</em><br/>is already included for everyone in the selected affiliate(s)";
        }
    } catch (err) {
        resultsWindow.alert(err);
    }
}






function addNewAffilRow(nameVal, orgNameVal , emailVal) {
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
		

		var addAffilOptions = resultsWindow.document.getElementsByName("topicCheckList_Option");
		for (var top = 0; top < addAffilOptions.length; top++){
			if (addAffilOptions[top].checked) {
				var newTopicLI = originalWindow.document.createElement("li");
				newTopicLI.setAttribute("class", "checked");
                newTopicLI.appendChild(originalWindow.document.createTextNode(addAffilOptions[top].value));
                newUL.appendChild(newTopicLI);
            }
		}

		row.append(columnOne);
		row.append(columnTwo);
		row.append(columnThree);
		columnFour.append(newUL);
		row.append(columnFour);


        var numberAdded = 0;
		var indexOfLastInAffil = 0;
        for (var y = 2; y < affilRows_atm.length; y++) {
            var topicAlreadyIncluded = false;
            var TDs = affilRows_atm[y].querySelectorAll("td.confluenceTd");
            if (orgNameVal.includes(TDs[0].innerHTML)) {
				indexOfLastInAffil = y;
            }
        }
		var parent = affilRows_atm[indexOfLastInAffil].parentNode;	
		originalWindow.console.log(row);
		parent.insertBefore(row, parent.childNodes[indexOfLastInAffil+1]);

		resultsWindow.document.getElementById("addAffilResultsMessage").style.display = "block";
		resultsWindow.document.getElementById("addAffilResultsMessage").style.color = "seagreen";
	    resultsWindow.document.getElementById("addAffilResultsMessage").innerHTML = "Success:<br/><em>'" + nameVal+ "'</em><br/>has been added to the table.";
	
		var rand = Math.floor(Math.random()*reminderImages.length);
		resultsWindow.document.getElementById("reminderImage").setAttribute("src", reminderImages[rand].url);
		resultsWindow.document.getElementById("reminderImage").setAttribute("width", reminderImages[rand].width);
		resultsWindow.document.getElementById("reminderImage").setAttribute("height", reminderImages[rand].height);
		resultsWindow.document.getElementById("reminderImage").style.display = "block";
		resultsWindow.document.getElementById("reminderHeader").style.display = "block";


    } catch (err) {
        resultsWindow.alert(err);
		resultsWindow.document.getElementById("addAffilResultsMessage").style.display = "block";
		resultsWindow.document.getElementById("addAffilResultsMessage").style.color = "red";
	    resultsWindow.document.getElementById("addAffilResultsMessage").innerHTML = "Error:<br/><em>'" + err + "'</em>";
    }
}


function checkForAffiliate(name){
	try {
		var checkAffilResults = "<h3>Results:</h3>";
        for (var y = 2; y < affilRows_atm.length; y++) {
            var TDs = affilRows_atm[y].querySelectorAll("td.confluenceTd");
			if (TDs[1].innerHTML.toLowerCase().includes(name.toLowerCase())){
				var obj = {};
				obj.affil = TDs[0].innerHTML;
				obj.name = TDs[1].innerHTML;
				obj.email = TDs[2].innerHTML;
				obj.topics = [];
				var checkTopics = TDs[3].querySelectorAll("ul.inline-task-list li");
				for (var q = 0; q < checkTopics.length; q++){	
					obj.topics.push(checkTopics[q].innerHTML);
				}
				checkAffilResults += "<p>" + obj.name + " ( " + obj.affil + " ) ---> " + obj.email + "</p>";
			}
        }
		resultsWindow.document.getElementById("checkAffilResultsMessage").append(checkAffilResults);
		resultsWindow.document.getElementById("checkAffilResultsMessage").innerHTML = checkAffilResults;
		resultsWindow.document.getElementById("checkAffilResultsMessage").style.display = "block";
	} catch (err){
		resultsWindow.alert(err);
	}
}
