
function generateData(){
var table = "<table id='workLogTable'><tr><th>Date</th><th>Name</th><th>Work Log Description</th><th>Work Log Hours</th></tr>";
var names = ["Derrick Fyfield", "Aaron Maxwell", "Paul Simmons", "Matthew Stuart", "Leroy Johnson", "Sean King"];
for (var x = 0; x < names.length; x++){
  for (var y = 0; y < 10; y++){
    var date = new Date();
    var today = date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();
    var person = names[x];
    var summary = ##random data
    var hours = ## random number between 1 - 5 (double)

    table += ### add the rows 
  }
}

}
