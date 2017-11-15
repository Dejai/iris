<style>
	
</style>

<script type="text/javascript">
	document.getElementById("expander").addEventListener("click", expand);
	document.getElementById("collapser").addEventListener("click", collapse);

	function expand(){
		var elements = document.getElementsByClassName("expand-container"); 
		document.getElementById("expander").classList.remove("selectedOption");
		document.getElementById("expander").blur();
		document.getElementById("collapser").classList.add("selectedOption");
		for (var x = 0; x < elements.length; x++){ 
			elements[x].childNodes[0].childNodes[0].classList.add("expanded");
			elements[x].childNodes[1].classList.remove("expand-hidden");	
		}
	}
	function collapse(){
		var elements = document.getElementsByClassName("expand-container"); 
		document.getElementById("expander").classList.add("selectedOption");
		document.getElementById("collapser").classList.remove("selectedOption");
		document.getElementById("collapser").blur();
		for (var x = 0; x < elements.length; x++){ 
			elements[x].childNodes[0].childNodes[0].classList.remove("expanded");
			elements[x].childNodes[1].classList.add("expand-hidden");
		}
	}
</script>
