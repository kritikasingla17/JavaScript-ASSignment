function E(){var margin = {top: 20, right: 10, bottom: 100, left: 90},
    width = 900 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


  var svg=d3.select('econtent')
  .append('svg')
  .attr({
  	"width" : width + margin.right + margin.left,
  	"height" : height + margin.top + margin.bottom
  })

  .append("g")
  	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  	console.log("hello");

  	var xScale = d3.scale.ordinal()
    .rangeRoundBands([0, width], .5 ,.5);

    var yScale = d3.scale.linear()
    .range([height, 0]);



var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left");


 d3.json("../json_files/Aggregate_population_and_GDP.json",function(error, data) {
 	 if (error) console.log("error");

 	 data.forEach(function(d){
 	 	d["Aggregate of Population"]=+d["Aggregate of Population"];
 	 	d["Continent"]=d["Continent"];
 	 	console.log(d["Aggregate of Population"]);
 	 });

 data.sort(function(a,b){
 	return b["Aggregate of Population"]-a["Aggregate of Population"];
 });


xScale.domain(data.map(function(d){return d["Continent"]}));
yScale.domain([0,d3.max(data,function(d){return d["Aggregate of Population"]})]);



  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr("height", 0)
    .attr("y", height)
    .transition().duration(3000)
    .delay( function(d,i) { return i * 200; })
    // attributes can be also combined under one .attr
    .attr({
      "x": function(d) { return xScale(d["Continent"]); },
      "y": function(d) { return yScale(d["Aggregate of Population"]); },
      "width": xScale.rangeBand(),
      "height": function(d) { return  height - yScale(d["Aggregate of Population"]); }
    })
    .style("fill", function(d,i) { return 'rgb( 20,20,20)'});


        svg.selectAll('text')
            .data(data)
            .enter()
            .append('text')



            .text(function(d){
                return d["Aggregate of Population"];
            })
            .attr({
                "x": function(d){ return xScale(d["Continent"]) +  xScale.rangeBand()/2; },
                "y": function(d){ return yScale(d["Aggregate of Population"])+ 12; },
                "font-family": 'sans-serif',
                "font-size": '13px',
                "font-weight": 'bold',
                "fill": 'white',
                "text-anchor": 'middle'
            });

    // Draw xAxis and position the label
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("dx", "-.8em")
        .attr("dy", ".25em")
        .attr("transform", "rotate(-60)" )
        .style("text-anchor", "end")
        .attr("font-size", "10px");


    // Draw yAxis and postion the label
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height/2)
        .attr("dy", "-5em")
        .style("text-anchor", "middle")
        .text("Aggregate of Population");


});};