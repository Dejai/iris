<!-- This script declares the different components to be used in the popup window -->

<script type='text/javascript'>
	var style = "<title>The Affiliate Table Manager</title><style> #addTopicForm { display:none; width:50%; float:left; margin-left:5%; border:1px solid black; border-radius:5px; text-align:left; padding:1%; }"
		+ "#addAffiliateForm { display:none; width:50%; float:left; margin-left:5%; margin-right:2%; border:1px solid black; border-radius:5px; text-align:left; padding:1%; }"
		+ ".sectionz { display:none; width:50%; float:left; margin-left:5%; margin-right:2%; border:1px solid black; border-radius:5px; text-align:left; padding:1%; }"
		+ ".errorMsg { display:none; color:red; } .resultsMsg { display:none; color:black; text-align:center; font-size:20px; }"
		+ ".hidden { display:none; } " 
		+ ".required:after { content: \" * \"; color:red; font-weight:bold; }"
		+ ".formLabel_atm { text-weight:bold; color:blue; margin-right:10px;}" 
		+ "#topics_atm { width:45% }" 
		+ "#versionP { text-align:right; font-size:10px;color:black; }"
		+ "#versionNum{font-size:80%;color:blue; text-decoration:none; margin-left:1% }"
		+ ".menuList { display:inline-block; border:1px solid gray; border-radius:10px; padding:1%; margin-right:1%; width:20%; cursor:pointer; text-align:center;}"
		+ ".menuList:hover { background-color:yellowgreen;}"
		+ ".clear { clear:both;}"
		+ "@media only screen and (max-width:900px){ #addTopicForm { width:80%; } }" 
		+ "#reminderImage { margin:auto; }"
		+ "</style>";


	var dataList = "<datalist id=\"optionsList_atm\"></datalist>";
	var orgsDataList = "<datalist id=\"orgsList_atm\"></datalist>";

	var description = "<h2>Affiliate Table Manager <a href='https://wiki.pubsvs.com/display/IRISPM/The+ATM+-+Releases' target='_blank' id='versionNum'>- Version 1.5</a></h2>"
						+"<div>Use this tool to manage the list of affiliates and topics in our email table.</div>";


	var menuList = "<p class='menuList' id=\"checkAffiliate\"> Check for a Person </p>"
					+ "<p class='menuList' id=\"addAffiliate\"> Add a Person </p>"
					+ "<p class='menuList' id=\"addTopic\">Add a Topic</p>"
					+ "<p class='menuList' id=\"helpAndTips\">Help?</p>"
					+ "<br class=\"clear\"/>";
					//+ "<p class='menuList' id=\"editTopic\"> Edit a Topic </p>"


	var resultsMessages = "<div style='text-align:center;width:85%;'>"
						  + "<p id=\"addAffilResultsMessage\" class=\"resultsMsg\"></p>"
						  + "<img id=\"reminderImage\" class=\"hidden\" alt=\"Reminder Image\"/>"
						  + "<h2 id=\"reminderHeader\" class=\"hidden\" style=\"color:blue;\" >Save the Confluence Page</h2>"
						  + "</div>";


	var addTopicForm = "<div id=\"addTopicForm\" class=\"sectionz\">"
		+ "<label class=\"formLabel_atm required\">Enter / Select a Topic</label>" 
		+ "<select id=\"topics_atm\"></select><br/>"
		+ "<input id=\"newTopicName_atm\" style='display:none; margin-left:30%;width:40%;' placeholder=\"Enter a new topic name\" />"
		+ "<p id=\"topicError_atm\" class=\"errorMsg\">Please select a topic or enter a new one. </p>" 
		+ "<br/>" 
		+ "<div id='topicDescriptionSubSection' style='display:none'>"
			+ "<label class=\"formLabel_atm required\">Enter a Topic Description</label>" 
			+ "<input id=\"topicDescription_atm\" style='width:100%;' placeholder=\"Enter a brief description of the topic\"/>"
			+ "<p id=\"topicDescriptionError_atm\" class=\"errorMsg\">Please enter a description for this new topic.</p>"
		+ "</div>"
		+ "<br/>" 
		+ "<button id=\"addNewTopic\"> Add Topic</button>" 
		+ "<p id=\"errorMessageForm\" class=\"errorMsg\">Something went wrong!</p><p id=\"addTopicResultsMsg\" class=\"resultsMsg\"></p>" 
		+ "</div>" 
		+ "<br class=\"clear\"/>";



	var addAffiliateForm = "<div id=\"addAffiliateForm\" class=\"sectionz\">"
		+ "<label> Enter the Affiliate's Info</label>"
		+ "<br/><br/>"
		+ "<input id=\"hiddenRowNum\" type='hidden' value='-1'/>"
			+ "<label class=\"required\">Name: </label>"
			+ "<input id=\"newAffilName\" placeholder=\"Enter name\"/>"
			+ "<p id=\"affilNameError_atm\" class=\"errorMsg\">Please enter the affiliate's name.</p>"
		+ "<br/><br/>"
			+ "<label class=\"required\">Email: </label>"
			+ "<input type=\"email\" id=\"newAffilEmail\" style=\"width:60%;\" placeholder=\"Enter email\"/>"
			+ "<p id=\"affilEmailError_atm\" class=\"errorMsg\">Please enter the affiliate's email.</p>"
		+ "<br/><br/>"
			+ "<label class=\"required\"> Organization: </label>"
			+ "<select id=\"addAffiliateForm_SelectOrg\"></select>"
			+ "<br/><input id='newOrganizationField' style='margin-left:30%;display:none;' type='text' placeholder='Enter organization name'/>"
			+ "<p id=\"affilOrgError_atm\" class=\"errorMsg\">Please select an org.</p>"
		+ "<br/><br/>"
			+ "<label>Select Topic(s): </label>"
			+ "<br/>"
			+ "<ul id=\"topicCheckList\"></ul>"
		+ "<br/>"
			+ "<button id=\"addNewAffiliate\"> Add New Person</button>" 
			+ "<button id=\"editOldAffiliate\" style=\"display:none;\"> Edit Person</button>" 
		+ "</div>"
		+ "<br class=\"clear\"/>";

	var checkAffiliateForm = "<div id=\"checkAffiliateForm\" class=\"sectionz\">"
		+ "<label class=\"required\">Who are you checking for?</label>"
		+ "<br/><br/>"
		+ "<label>Search by ...</label><br/>"
		+ "<input type='radio' name='searchtype' value='personname' checked/><label>Person Name</label>&nbsp;<input type='radio' name='searchtype' value='affilname'/><label>Affiliate Name</label>&nbsp;"
		+ "<br/><br/>"
		+ "<input id=\"checkAffilName\" style=\"width:65%\" placeholder=\"Enter name or a part of a name...\"/>"
		+ "<p id=\"checkAffilNameError_atm\" class=\"errorMsg\">Please enter the affiliate's name.</p>"
		+ "<br/><br/>"
		+ "<button id=\"checkForAffiliateButton\"> Check For Affiliate </button>" 
		+ "</div>"
		+ "<br class=\"clear\"/>"
		+ "<div class=\"sectionz\" id=\"checkAffilResultsMessage\" style=\"width:70%;\" class=\"resultsMsg\"></div>"
		+ "<br class=\"clear\"/>";


	var helpAndTips= "<div id=\"helpAndTipsSection\" class=\"sectionz\" style='width:85%'>"
		+ "<h3> How To Use This Tool </h3>"
		+ "<h4 style='color:orange;'> Check For a Person </h4>"
		+ "<p> Use this option to search specific people (by name) or for a list of people (by affiliate). You can click on a person's name to view and edit their details.</p>"
		+ "<h4 style='color:orange;'> Add a Person </h4>"
		+ "<p> Use this option to add a new person to the table, including what topics they should be emailed about.</p>"
		+ "<h4 style='color:orange;'> Add a Topic</h4>"
		+ "<p> Use this option to create a new topic, or select from an existing one. The topic will be added as an option for everyone listed in the table, but will not be checked.</p>"
		+ "<h3> TIPS: </h3>"
		+ "<p> Remove a person from the table: </p>"
		+ "<ul><li>Click to edit the page</li><li>Find that person in the 'Affiliate Table'</li><li>Click into the row, then use the confluence table option to remove a row. "
		+ "<a href='https://confluence.atlassian.com/conf59/tables-792498782.html#Tables-Whatyoucandowithyourtableintheeditor' target='_blank'>More details here.</a> </li></ul>"
		+ "<p> Change the name of a topic: </p>"
		+ "<ul><li>Click to edit the page</li><li>Search and replace for that topic value</li></ul>"
		+ "</div>";

</script>
