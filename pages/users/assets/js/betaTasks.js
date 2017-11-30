$(document).ready(function(){

	$('[data-toggle="tooltip"]').tooltip(); 

	$("a").hide(); 
	$("button").hide();

	$('#filterComms').keyup(function(){
		var FC = $("#filterComms");
		if (FC.val().length > 0) {
	    	$('#zenA').show(); 
		} 
	});

	$('#statusComms').keyup(function(){
		var SC = $("#statusComms");
		if (SC.val().length >= 1) {
	    	$('#zenB').show(); 
		}
	});


	$("#zenA").mouseover(function(){
    	var mailtoA =  "mailto:support@pubsvs.com?subject='#IRISBeta'&body=";
    	var filter_comments = $("#filterComms");

    	var fcArr = filter_comments.val().split('\n');
    	var body_line = escape("\n"); 

    	for (var i = 0; i < fcArr.length; ++i){
    		mailtoA += fcArr[i] + body_line; 
    	}
    	$("#zenA").attr("href",  mailtoA);
	});

	$("#zenB").mouseover(function(){
		var mailtoB =  "mailto:support@pubsvs.com?subject='#IRISBeta'&body=";
    	var status_comments = $("#statusComms");

			var scArr = status_comments.val().split('\n');
    	var body_line = escape("\n"); 

    	for (var i = 0; i < scArr.length; ++i){
    		mailtoB += scArr[i] + body_line; 
    	}

    	$("#zenB").attr("href", mailtoB);
	});


	$("#zenA").click(function(){ $("#clearFilterComms").show(); });
	$("#clearFilterComms").click(function(){ $("#filterComms").val(""); $("#zenA").hide(); $("#clearFilterComms").hide();});
	$("#zenB").click(function(){ $("#clearStatusComms").show(); });
	$("#clearStatusComms").click(function(){ $("#statusComms").val("");	$("#zenB").hide(); $("#clearStatusComms").hide();});
});