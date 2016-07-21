
var fs = require('fs'),

  data = fs.readFileSync("../csv_files/2015_data.csv", {
    encoding: 'UTF8'
  }).toString();
/*console.log(data);
 */

var a = data.split("\r\n");

var head = a[0].split(",");
console.log(head);

var output = [];

for (var i = 1; i < a.length; i = i + 1) {
	var line = a[i].split(",");

	var object = {};
	for (var j = 0; j < head.length; j = j + 1) {

		object[head[j]] = line[j];

	}

	output.push(object);
	console.log(output);

}
fs.writeFileSync("file1.json", JSON.stringify(output));