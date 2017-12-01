
function generateData(){
var table = "<table id='workLogTable'><tr><th>Date</th><th>Name</th><th>Work Log Description</th><th>Work Log Hours</th></tr>";
var names = ["Derrick Fyfield", "Aaron Maxwell", "Paul Simmons", "Matthew Stuart", "Leroy Johnson", "Sean King"];
var categories = ["requirements", "clarification", "project management", "design", "testing", "Working"];
for (var x = 0; x < names.length; x++){
	var date = new Date();
    var today = date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();
    var person = names[x];
    for (var y = 0; y < 10; y++){
    	var summary = categories[Math.round(Math.random() * categories.length)];
    	var hour = Math.round(Math.random() * 4);
		var minute = hour > 0 && (1 / hour) > 0 && hour !=3 ? (1 / hour) : 0;
		var time = hour + minute;
		table += "<tr class=\"level-3\">"
				+"<td>" + today + "</td>"
				+"<td><span data-field=\"edit-desc\">" + summary + "</span></td>"
				+"<td class=\"displayName\">" + person + "</td>"
				+"<td><span data-editable=\"isHoursEditable\">" + time + "</span></td>"
				+ "</tr>";
  	}
}
table += "</table>";
console.log(table);

}
