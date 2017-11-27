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

// Instance variables
var affiliateTable, allTopics, affilRows, listOfAffils, org, topic, orgOptionsIndex = [], includeARMS, includeBROS, emailMultipleButton, emailSingleButton, multiAffilTable, org_multi;
var multiAffilBool = false; 
orgNames = [ 
    //{"name":"Agora Family", "desc": "Every Affiliate Together"},
          //{"name":"Agora Affiliates", "desc": "Single Email for Each Affiliate"},
          {"name":"Agora Financial(s)", "desc": "AGF | AFUK | AFAU"},
    {"name": "Agora Health UK" , "desc" : "AHUK"},
    {"name": "Banyan Hill" , "desc" : "BH"},
    {"name": "Charles Street" , "desc" : "CS"},
    {"name": "International Living" , "desc" : "ILV"},
    {"name": "Institute for Natural Healing" , "desc" : "INH"},
    {"name": "Legacy Research Group" , "desc" : "LRG"},
    {"name": "Money Map Press" , "desc" : "MMP"},
    {"name": "New Market Group" , "desc" : "NMG"},
    {"name": "OmniVista Health" , "desc" : "OVH"},
    {"name": "Oxford Club" , "desc" : "OC"},
    {"name": "Portner Press" , "desc" : "POR"},
    {"name": "Port Phillip Publishing" , "desc" : "PPP"},
    {"name": "Publishing Agora France" , "desc" : "PAF"},
    {"name": "Sante Nature Innovation" , "desc" : "SNI"},
    {"name": "Southbank" , "desc" : "SBK"}
      ];

document.addEventListener('DOMContentLoaded', init , true);

function init(){
org = document.getElementById("organizations");
topic = document.getElementById("topic");
multiAffilTable = document.getElementById("multipleAffilTable");
org_multi = document.getElementsByName("organizations");

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


document.getElementById("selectAllOrgs").addEventListener("change", function() {
      for (var x = 0; x < org_multi.length; x++) {
          if (this.checked) {
              org_multi[x].checked = true;
          } else {
              org_multi[x].checked = false;
          }
      }
});

populateAffilList();
createDataLists();
}



function populateAffilList(){
listOfAffils = [];
allTopics = [];
var affiliateTable = document.getElementsByClassName("confluenceTable");
var affilRows = affiliateTable[0].querySelectorAll('tbody tr');

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
    if( allTopics.indexOf(cleanup(topicsPerRow[xx].innerText)) < 0){
      allTopics.push(cleanup(topicsPerRow[xx].innerText));
    }
  }
  listOfAffils.push(new affilObj(affiliateName, personName, personEmail , topicsArray));
}
allTopics.sort(function(a,b){ if (a.toLowerCase() < b.toLowerCase()) { return -1; } else if (a.toLowerCase() < b.toLowerCase()) { return 1 } else { return 0; }});
}

function createDataLists(){
var orgOptions = document.getElementById("orgsList");
for (var x = 0; x < orgNames.length; x++){
  var optionElement = document.createElement("option");
  optionElement.setAttribute("value", orgNames[x].name);
  orgOptionsIndex.push(orgNames[x].name);
  var optionElement_text = document.createTextNode(orgNames[x].desc);
  optionElement.appendChild(optionElement_text);
  orgOptions.appendChild(optionElement);
}
document.getElementById("organizations").setAttribute("list", "orgsList");

var topicOptions = document.getElementById("optionsList");
for (var x = 0; x < allTopics.length; x++){
  var optionElement = document.createElement("option");
  optionElement.setAttribute("value", allTopics[x]);
  var optionElement_text = document.createTextNode(allTopics[x]);
  optionElement.appendChild(optionElement_text);
  topicOptions.appendChild(optionElement);
}
document.getElementById("topic").setAttribute("list", "optionsList");

}


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

function startEmail(orgValue, topicName){
var toEmails = "";
var ccEmails = "?cc=";
//var affilCode = cleanup(document.querySelectorAll('option[value="'+orgValue+'"]')[0].innerHTML);
//var greeting = "&body=Hi%20"+affilCode+"%0D%0A";
var greeting = ""; //Until I can determine the most efficient way to generate a greeting, I'll just let people do it themselves
var subjectLine = document.getElementById("subjectLine").value ? "&subject=" + encodeURI(document.getElementById("subjectLine").value) : "";
var emailCounter = 0;
var includeARMS = document.getElementsByName("includeARMS");
var includeBROS = document.getElementsByName("includeBROS");
for (var x = 0; x < listOfAffils.length; x++){
  //if ( (listOfAffils[x].affiliate == orgValue || orgValue == "Agora Family") && listOfAffils[x].topics.includes(topicName)){ 
  if ( orgValue.includes(listOfAffils[x].affiliate) && listOfAffils[x].topics.includes(topicName)){ 
    emailCounter += 1;
    toEmails += listOfAffils[x].name + " <" + listOfAffils[x].email + ">;";
  }	
}
if (includeARMS[0].checked){ ccEmails += addARM(orgValue);	}
if (includeBROS[0].checked){ ccEmails += addBROS();	}
generateEmail(emailCounter, toEmails, ccEmails, subjectLine, greeting);
}

function generateEmail(counter, toEmails, ccEmails, subjectLine, greeting){
try{
  processingImg("show");
  if (counter < 20){
    document.getElementById("tooManyEmails").style.display = "none";
    //iterateSelectedAffil();			
    window.location.href = "mailto:"+toEmails+ccEmails+subjectLine+greeting;
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


function iterateSelectedAffil(){
var currIndex = orgOptionsIndex.indexOf(org.value);
if (currIndex == 1){
  //document.getElementById("nextAffil").style.display = "inline";
  //document.getElementById("prevAffil").style.display = "none";
  iterateButtons("next");
} else if (currIndex > 1 && currIndex < orgOptionsIndex.length-1){
  //document.getElementById("nextAffil").style.display = "inline";
  //document.getElementById("prevAffil").style.display = "inline";
  iterateButtons("both");
} else if (currIndex == orgOptionsIndex.length-1){
  //document.getElementById("prevAffil").style.display = "inline";
  //document.getElementById("nextAffil").style.display = "none";
  iterateButtons("prev");
} else{
  //document.getElementById("prevAffil").style.display = "none";
  //document.getElementById("nextAffil").style.display = "none";
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
switch(org){
  case 'Money Map Press':
  case 'New Market Group':
  case 'Oxford Club':
  case 'Omnivista Health':
  case 'Sante Nature Innovation':
  case 'Nova Health':
  case 'Southbank':
  case 'Charles Street':
  case 'Banyan Hill':
    return "Sean Lowry <slowry@pubsvs.com>;";
    break;	
  case 'Institute for Natural Healing':
  case 'International Living':
  case 'Legacy Research':
  case 'Publishing Agora France':
    return "Stacie Daer Keating <skeating@pubsvs.com>;";
    break;
  case 'Agora Health UK':
    return "Sébastien Fournier <SFournier@pubsvs.ie>;";
    break;
  case 'Port Phillip Publishing':
    return "Stacie Daer Keating <skeating@pubsvs.com>;Marcus Van Uitert <MUitert@pubsvs.ie>;";		
    break;
  case 'Portner Press':
    return "Sébastien Fournier <SFournier@pubsvs.ie>; Marcus Van Uitert <MUitert@pubsvs.ie>;";
    break;
  default:
    return "Sean Lowry <slowry@pubsvs.com>;Stacie Daer Keating <skeating@pubsvs.com>;"
}
}
function addBROS(){
return "Thomas Keller <tkeller@pubsvs.com>; Whitney Harris <wharris@pubsvs.com>; Morgan Denner <mdenner@pubsvs.com>; Colin Witucki <CWitucki@pubsvs.com>; Jackie Ayendi <JAyendi@pubsvs.com>; Brent Budge <bbudge@pubsvs.com>; Derrick Fyfield <dfyfield@pubsvs.com>;"
}
