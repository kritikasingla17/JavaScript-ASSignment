var fs = require('fs'),
    data = fs.readFileSync("../csv_files/2015_data.csv", {
    encoding: 'UTF8'
  }).toString();
var a = data.split("\r\n");

var result=[];
var head=[];
head[0]="Continent";
head[1]="Aggregate of Population";
head[2]="Aggregate of GDP";
var asiaP=0;
var americaP=0;
var asiaG=0;
var americaG=0;
for(var i=1;i<(data.length-2);i=i+1)
{
	if(a[i]!=undefined)
	{
	var line = a[i].split(",");
	if(i==20)
	{
		var object={};
		object[head[0]]="EUROPE";
		object[head[1]]=line[7];
		object[head[2]]=line[13];
		result.push(object);
	}
	else if(i==5 || i==8 || i==9 || i==13 || i==14 || i==11 || i==16 || i==17)
	{
		var asia="ASIA";
		asiaP=(parseFloat(asiaP)+parseFloat(line[7])).toString();
		asiaG=(parseFloat(asiaG)+parseFloat(line[13])).toString();
	}
	else if(i==4 || i==12 || i==19 || i==1 || i==3)
	{
		var america="AMERICA";
		americaP=(parseFloat(americaP)+parseFloat(line[7])).toString();
		americaG=(parseFloat(americaG)+parseFloat(line[13])).toString();
	}
	else if(i==15)
	{
		var object={};
		object[head[0]]="AFRICA";
		object[head[1]]=line[7];
		object[head[2]]=line[13];
		result.push(object);
	}
	else if(i==2){
		var object={};
		object[head[0]]="AUSTRALIA";
		object[head[1]]=line[7];
		object[head[2]]=line[13];
		result.push(object);
	}
}
}
var object={};
object[head[0]]=asia;
object[head[1]]=asiaP;
object[head[2]]=asiaG;
result.push(object);

var object1={};
object1[head[0]]=america;
object1[head[1]]=americaP;
object1[head[2]]=americaG;
result.push(object1);



fs.writeFileSync("../json_files/Aggregate_population_and_GDP.json", JSON.stringify(result));