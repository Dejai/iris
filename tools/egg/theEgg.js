class affilObj{
	constructor(affiliate, name, email, topics){
		this.affiliate = affiliate; 
		this.name = name;
		this.email = email;
		this.topics = [];
		for (var x = 0; x < topics.length; x++){
			this.topics[x] = topics[x];
		}
	}
}


// This object maps the different groups of IRIS Bros to the list of emails
var irisBros = {
	"admins" : "Tom Muller <tmuller@pubsvs.com>;",
	"BAs": "Conner Wilson <cwilson@pubsvs.com>;",
	"PM": "Jason Bates <jbates@pubsvs.com>;"
}

// Instance & Global variables
var affiliateTables, theOrgsTable , thePeoplesTable, theTopicsTable, allTopics, affilRows, listOfPeople, org, topic, orgOptionsIndex = [], includeARMS, includeBROS, emailMultipleButton, emailSingleButton, multiAffilTable, org_multi;
var multiAffilBool = false;
var orgtoARM = {};

document.addEventListener('DOMContentLoaded', loadTable, true);

function loadTable(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200){
      document.getElementById("tableContainer").innerHTML = xhttp.responseText;
      loadEggView();
    } else if (this.readyState == 4 && this.status !== 200){
      alert("Something went wrong! Couldn't load the user table");
    }
  };
  xhttp.open("GET", "./contacts.html", true);
  xhttp.send();
}
function loadEggView(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200){
      document.getElementById("eggContainer").innerHTML = xhttp.responseText;
      init();
    } else if (this.readyState == 4 && this.status !== 200){
      alert("Something went wrong! Couldn't load the Egg View!");
    }
  };
  xhttp.open("GET", "./theEgg.html", true);
  xhttp.send();
}

/* GETTING STARTED - Building the components, and setting event listeners */
function init(){
	org = document.getElementById("organizations");
	topic = document.getElementById("topic");
	multiAffilTable = document.getElementById("multipleAffilTable");
	org_multi = document.getElementsByName("organizations");
	affiliateTables = document.getElementsByTagName("table");


	var howItWorks = document.getElementById("howItWorksSentence");
	var howItWorksDiv = document.getElementById("howItWorksDiv");


	document.getElementById("sendAffilEmail").addEventListener("click", validateFields);
	document.getElementById("closeTooManyEmails").addEventListener("click", function() { document.getElementById("tooManyEmails").style.display = "none"; });

	emailMultipleButton = document.getElementById("emailMultipleAffils");
	emailSingleButton= document.getElementById("emailSingleAffil");

	emailMultipleButton.addEventListener("click", function(){
		emailSingleButton.classList.remove("selectedEmailType");
		emailMultipleButton.classList.add("selectedEmailType");
		org.style.display = "none";
		multiAffilTable.style.display ="inline-block";
		multiAffilBool = true;
		iterateButtons("none");
	});

	emailSingleButton.addEventListener("click", function(){
		emailMultipleButton.classList.remove("selectedEmailType");
		emailSingleButton.classList.add("selectedEmailType");
		org.style.display = "inline";
		multiAffilTable.style.display ="none";
		multiAffilBool = false;
	});


	howItWorks.addEventListener("click", function(){
		if( howItWorksDiv.style.display == "none"){
			howItWorksDiv.style.display = "block";
		} else {
			howItWorksDiv.style.display = "none";
		}
	});


	document.getElementById("selectAllOrgs").addEventListener("change", function() {
		for (var x = 0; x < org_multi.length; x++) {
			if (this.checked) {
				org_multi[x].checked = true;
			} else {
				org_multi[x].checked = false;
			}
		}
	});

	getTables();
	getListOfPeople();
	setOrgLists();
	setTopicsList();
}


function getTables(){
	for (var x = 0; x < affiliateTables.length; x++) {
		var headers = affiliateTables[x].querySelectorAll("tbody tr th");
		for (var y = 0; y < headers.length; y++) {
			if (headers[y].innerText == "Organizations Table") {
				theOrgsTable = affiliateTables[x];
			} else if ( headers[y].innerText == "Affiliate Table"){
				thePeoplesTable = affiliateTables[x];
			} else if (headers[y].innerText == "Topics Table") {
				theTopicsTable = affiliateTables[x];
			}
		}
	}
}

function getListOfPeople(){
	listOfPeople = [];

	var affilRows = thePeoplesTable.querySelectorAll('tbody tr');

	for (var y = 2; y < affilRows.length; y++){
		var TDs = affilRows[y].querySelectorAll('td.confluenceTd');
		try{ var affiliateName = cleanup(TDs[0].innerText); } catch (err) { alert(err + "\n" + TDs); }
		try{ var personName= cleanup(TDs[1].innerText); } catch (err) { alert(err); }
		var personEmail = cleanup(TDs[2].innerText);
		var topicsArray = [];
		var topicsPerRow = TDs[3].querySelectorAll('ul.inline-task-list li');
		for (var xx = 0; xx < topicsPerRow.length; xx++ ){
			if (topicsPerRow[xx].className.indexOf("checked") > -1){
				topicsArray.push(cleanup(topicsPerRow[xx].innerText));				
			}
		}
		listOfPeople.push(new affilObj(affiliateName,personName,personEmail,topicsArray));
	}
}

function setOrgLists(){
	var orgOptions = document.getElementById("orgsList");
	var orgRows = theOrgsTable.querySelectorAll('tbody tr');

	var radioOptions = "";
	var currentColumn = 0;
	for (var x = 2; x < orgRows.length; x++){
		currentColumn++;

		let TDs = orgRows[x].querySelectorAll("td.confluenceTd");
		let orgName = TDs[0].innerText;
		let orgAbbrev = TDs[1].innerText;
//let orgArmEmail = TDs[2].innerText + "<" + TDs[3].innerText + ">;";

let armNames = TDs[2].innerText.split(",");
let armEmails = TDs[3].innerText.split(",");
let orgArmEmail = "";
if (armNames.length == armEmails.length){
	for (var y = 0; y < armNames.length; y++){
		orgArmEmail += armNames[y] + "<" + armEmails[y] + ">;"; 
	}
} else {
	orgArmEmail += armNames[0] + "<" + armEmails[0] + ">;"
}

orgtoARM[orgName] = orgArmEmail;
if (orgtoARM[orgName].length < 7){
	orgtoARM[orgName] = "Tracy Smith <tsmith@arm.com>;";
}

var optionElement = document.createElement("option");
optionElement.setAttribute("value", orgName);
orgOptionsIndex.push(orgName);
var optionElement_text = document.createTextNode(orgAbbrev);
optionElement.appendChild(optionElement_text);
orgOptions.appendChild(optionElement);

// Setting the checkboxes for multiple orgs
let startOfRow = currentColumn == 1? "<tr>" : "";
let endOfRow = currentColumn == 3 ? "</tr>" : "";
radioOptions += startOfRow + "<td> <input type='checkbox' name='organizations' value='"+ orgName + "'>" + orgName + "</td>" + endOfRow ;
if (currentColumn == 3){
	currentColumn = 0;
}
}
document.getElementById("organizations").setAttribute("list", "orgsList");
if (currentColumn != 3){ radioOptions += "</tr>"; }
document.getElementById("multipleOrgCheckboxes").innerHTML = radioOptions;
console.log("Affiliate to ARM Map");
console.log(orgtoARM);	
}

function setTopicsList(){
	var topicsRows = theTopicsTable.querySelectorAll('tbody tr');
	allTopics = [];
	var topicOptions = document.getElementById("optionsList");
	for (var x = 2; x < topicsRows.length; x++){
		var TDs = topicsRows[x].querySelectorAll('td.confluenceTd');
		let topicName = cleanup(TDs[0].innerText);
		if( allTopics.indexOf(topicName) < 0){
			allTopics.push(topicName);
			var optionElement = document.createElement("option");
			optionElement.setAttribute("value", topicName);
			var optionElement_text = document.createTextNode(topicName);
			optionElement.appendChild(optionElement_text);
			topicOptions.appendChild(optionElement);
		}			
	}
	document.getElementById("topic").setAttribute("list", "optionsList");

}

/* VALIDATION - Making sure all required fields are selected */
function validateFields(){
	var numOfSelectedOrgs = 0;
	for (var c = 0; c < org_multi.length; c++) {
		if (org_multi[c].checked) {
			numOfSelectedOrgs++;
		}
	}
// Error messages for the fields on the form
if ( (!multiAffilBool && !org.value) || (multiAffilBool && numOfSelectedOrgs < 1) ){
	document.getElementById("orgError").style.display = "block";
} else {
	document.getElementById("orgError").style.display = "none";
}
if (!topic.value){
	document.getElementById("topicError").style.display = "block";
} else {
	document.getElementById("topicError").style.display = "none";
}

var orgArray = [];
if (multiAffilBool){
	for (var q = 0; q < org_multi.length; q++){
		if(org_multi[q].checked){
			orgArray.push(org_multi[q].value);
		}
	}
} else {
	orgArray.push(org.value);
}
// If successful, how to handle the info from the form
if ( ( (!multiAffilBool && org.value) || (multiAffilBool && numOfSelectedOrgs > 0) )  && topic.value){
//startEmail(org.value, topic.value);
startEmail(orgArray, topic.value);

}
}


/* EXECUTION - Processing selected values to generate an email */
function startEmail(orgValue, topicName){
	var toEmails = "";
	var ccEmails = "?cc=";
	var subj = document.getElementById("subjectLine");
	var subjectLine = subj.value ? "&subject=" + encodeURI(subj.value) : "";
	var emailCounter = 0;

	var includeARMS = document.getElementsByName("includeARMS");
	var includeBROS = document.getElementsByName("includeBROS");

	for (var x = 0; x < listOfPeople.length; x++){
//if ( (listOfPeople[x].affiliate == orgValue || orgValue == "Agora Family") && listOfPeople[x].topics.includes(topicName)){ 
	if ( orgValue.includes(listOfPeople[x].affiliate) && listOfPeople[x].topics.includes(topicName)){ 
		emailCounter += 1;
		toEmails += listOfPeople[x].name + " <" + listOfPeople[x].email + ">;";
	}	
}


var includeARMS = document.getElementById("includeARMS");
var includeAdmins = document.getElementById("includeAdmins");
var includeBAs = document.getElementById("includeBAs");
var includePM = document.getElementById("includePM");

if (includeARMS.checked){ ccEmails += addARM(orgValue);	}
if (includeAdmins.checked){ ccEmails += irisBros["admins"];	}
if (includeBAs.checked){ ccEmails += irisBros["BAs"]; }
if (includePM.checked){ ccEmails += irisBros["PM"];	}

generateEmail(emailCounter, toEmails, ccEmails, subjectLine);
}

function generateEmail(counter, toEmails, ccEmails, subjectLine){
	try{
		processingImg("show");
		if (counter < 20){
			document.getElementById("tooManyEmails").style.display = "none";
	//iterateSelectedAffil();			
	window.location.href = "mailto:"+toEmails+ccEmails+subjectLine;
	setTimeout(function(){ processingImg("hide"); }, 1200);
} else {
	processingImg("hide");
	document.getElementById("tooManyEmails").style.display = "block";
	tooManyEmails(toEmails, ccEmails);
}


if(!multiAffilBool){
	iterateSelectedAffil();
}
} catch(err){
	alert(err);
}
}

function processingImg(visible){
	if (visible == "show"){
		document.getElementById("processingIndicator").style.display = "block";
	} else {
		document.getElementById("processingIndicator").style.display = "none";
	}
}

function tooManyEmails(toEmails, ccEmails){
	var toEmailsInput = document.getElementById("toEmailsList");
	toEmailsInput.value = toEmails;
	var ccEmailsInput = document.getElementById("ccEmailsList");
	ccEmailsInput.value = ccEmails.slice(4);
	document.getElementById("selectTOEmails").addEventListener("click", function(){ toEmailsInput.select(); });
	document.getElementById("selectCCEmails").addEventListener("click", function(){ ccEmailsInput.select(); });
}

/* HELPER FUNCTIONS -- Relate to the before, during, and after period of generating an email */
function iterateSelectedAffil(){
	var currIndex = orgOptionsIndex.indexOf(org.value);
	if (currIndex == 0){
		iterateButtons("next");
	} else if (currIndex > 0 && currIndex < orgOptionsIndex.length-1){
		iterateButtons("both");
	} else if (currIndex == orgOptionsIndex.length-1){
		iterateButtons("prev");
	} else{
		iterateButtons("none");
	}
	document.getElementById("nextAffil").addEventListener("click", function() { org.value = orgOptionsIndex[currIndex+1]; iterateSelectedAffil(); });
	document.getElementById("prevAffil").addEventListener("click", function() { org.value = orgOptionsIndex[currIndex-1]; iterateSelectedAffil(); });	
}
function iterateButtons(val){
	if (val == "prev"){
		document.getElementById("prevAffil").style.display = "inline";
		document.getElementById("nextAffil").style.display = "none";
	} else if (val == "next"){
		document.getElementById("nextAffil").style.display = "inline";
		document.getElementById("prevAffil").style.display = "none";
	} else if (val == "both"){
		document.getElementById("nextAffil").style.display = "inline";
		document.getElementById("prevAffil").style.display = "inline";
	} else if (val == "none"){
		document.getElementById("prevAffil").style.display = "none";
		document.getElementById("nextAffil").style.display = "none";
	}
}

function cleanup(value){
	return value.trim();
}


function addARM(org){
	var armEmails = "";
	if (Array.isArray(org)){
		for (var x = 0; x < org.length; x++){
			let orgVal = org[x];
			if ( orgtoARM[orgVal] ){
				armEmails += orgtoARM[orgVal]
			}
		}
	} else {
		armEmails +="Tracy Smith <tsmith@arm.com>;";
	}
	return armEmails;
}
