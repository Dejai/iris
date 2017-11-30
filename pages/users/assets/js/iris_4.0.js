$(document).ready(function(){
	// Handle all tooltips
	$('[data-toggle="tooltip"]').tooltip( {html:true} ); 

	// Automatically hide the hamburger icon. 
	$("#hamburger").hide();

	// Script to handle scrolling back to the top
	$("[href^='#task']").click(function(){ scrollTo(0,0); });
	$("[href^='#scenario']").click(function(){ scrollTo(0,0); });
	$("[href^='#permissions']").click(function(){ scrollTo(0,0); });
	$("[href^='#juniorLevel']").click(function(){ scrollTo(0,0); });
	$("[href^='#midLevel']").click(function(){ scrollTo(0,0); });
	$("[href^='#theEnd']").click(function(){ scrollTo(0,0); });
	$("[href^='#purpose']").click(function(){ scrollTo(0,0); });


	// Set the heights & widths for the main sections
	var sideWidth = 200; 
	var sideWidth2 = 250;
	$("#side-menu").css({height: window.innerHeight+550}); 
	$("#main-left").css({height: window.innerHeight+550}); 
	$("#main-left").css({width: sideWidth}); 
	$("#main-top").css({width: window.innerWidth-sideWidth2}); 
	$("#main-body").css({width: window.innerWidth-sideWidth2});


	// The following sectionhandles resizing the sections upon a resize; 
	// Got the resize idea from W3 Schools 
	// http://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_onresize_dom
	document.getElementsByTagName("BODY")[0].onresize = function() {myFunction()};
	function myFunction() {
	    // alert("hello, world");
	    var sideWidth = 200; 
		var sideWidth2 = 250;
		$("#side-menu").css({height: window.innerHeight+550}); 
		$("#main-left").css({height: window.innerHeight+550}); 
		$("#main-left").css({width: sideWidth}); 
		$("#main-top").css({width: window.innerWidth-sideWidth2}); 
		$("#main-body").css({width: window.innerWidth-sideWidth2});
	}


	// The functionality of the menu button upon click
	$("#hamburger").click(function(){
		$("#side-menu").toggleClass("hideMenu"); 
		$("#hamburger").hide(); 
		$("#main-left").css({width: sideWidth});
		$("#main-top").css({width: window.innerWidth-sideWidth2}); 
		$("#main-body").css({width: window.innerWidth-sideWidth2});

	});

	// Close the menu view and show the hamburger icon. 
	$("#closeMenu").click(function(){
		$("#side-menu").toggleClass("hideMenu"); 
		$("#hamburger").show(); 
		$("#main-left").css({width: 20});
		$("#main-top").css({width: window.innerWidth-45}); 
		$("#main-body").css({width: window.innerWidth-45});

	});

	// Toggle the chevrons upon the click. 
	$("[id^='menu-collapse']").click(function(){
		$(this).toggleClass("glyphicon-chevron-down");
	});
	$("#NEW").click(function(){
		$("#menu-collapseEW").toggleClass("glyphicon-chevron-down");
	});
	$("#NEWS").click(function(){
		$("#menu-collapseS").toggleClass("glyphicon-chevron-down");
	});


	// Commands to handle comments & submitting to zendesk. 

	//Disabling the Zendesk button & the clear button
	$("[id^='zen-']").attr("disabled", "disabled");
	$("[id^='clear-']").attr("disabled", "disabled");


	// Whenever comments are entered
	$("[id^='comments-']").keyup(function (){
		var element = $(this).attr("id");
		var split = element.split("-"); 
		var num = split[1];
		var comments = $(this);
		var zen = "#zen-"+ num;
		if (comments.val().length >= 1){
			$(zen).removeAttr("disabled"); 
			$(zen).addClass("btn-danger");
			
			var mailtoZ =  "mailto:support@pubsvs.com?subject='#IRISBeta'&body=";
			var commentsZ = comments.val().split("\n");
			var body_line = escape("\n");
			for (var i = 0; i < commentsZ.length; ++i){
        		mailtoZ += commentsZ[i] + body_line; 
        	}
			$(zen).attr("href", mailtoZ); 
		}
	});

	$("[id^='zen-']").click(function(){
		var element = $(this).attr("id");
		var split = element.split("-"); 
		var num = split[1];
		var clear = "#clear-"+ num;
		$(clear).removeAttr("disabled");
		$(clear).addClass("btn-info");

	});
	$("[id^='clear-']").click(function(){
		var element = $(this).attr("id");
		var split = element.split("-"); 
		var num = split[1];
		var comms = "#comments-"+ num;
		var zens = "#zen-"+ num;
		var clears = "#clear-"+ num;
		$(comms).val(""); 
		$(zens).attr("disabled", "disabled");
		$(zens).attr("href", "#");
		$(zens).removeClass("btn-danger");
		$(clears).attr("disabled", "disabled");
		$(clears).removeClass("btn-info");
	});


	// Code to handle closing of the page. Prompts users to submit all tickets first. 
	// Determine if mouse is over body or no. This determines when to show pop-up.
	var out = false; 
	$("body").mouseover(function(){
		out = false; 
	}).mouseout(function(){
		out=true;
	});
	// Just before closing the tab. Determine if mouse is not hovering over body. 
	window.onbeforeunload = function(e) {

		var text = "Leaving now will clear all comments that you have made."; 
		text+= "\n\n If you were intending to submit a ticket to Zendesk, please be sure you have done so before closing this page!";

		if(out){
			return text;
		}
	};

});