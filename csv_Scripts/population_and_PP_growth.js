var fs = require('fs'),

  data = fs.readFileSync("../csv_files/2013_data.csv", {
    encoding: 'UTF8'
  }).toString();
var a = data.split("\r\n");
var b = a[0].split(",");
var head=[];
head[0]=b[0];
head[1]="Growth in Population";
head[2]="growth in Purchasin Power"
var output=[];
for(var i=1;i<a.length-1;i=i+1)
{
  var line = a[i].split(",");
  var object={};
  object[head[0]]=line[0];
  var value=parseFloat(line[5])-parseFloat(line[2])
  object[head[1]]=value.toString();
  object[head[2]]=(parseFloat(line[17])-parseFloat(line[14])).toString();

  output.push(object);
}

fs.writeFileSync("../json_files/population_and_PP_growth.json", JSON.stringify(output));