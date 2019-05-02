console.log("HelloWorld")
var majorData=d3.csv("data/degrees-that-pay-back.csv")
majorData.then(function(data){
  console.log(data)
  drawCorrelation(data)
},function(err){console.log("err")})

var collegeData=d3.csv("data/salaries-by-college-type.csv")
collegeData.then(function(data){
  console.log(data)
},function(err){console.log("err")})

var regionData=d3.csv("data/salaries-by-region.csv")
regionData.then(function(data){
  console.log(data)

},function(err){console.log("err")})

d3.json("us-states.json").then(function(json){
    console.log(json)
    drawMap(json)
},function(err){console.log("err")})

var drawMap=function(json){
  var screen={width:850,height:700}
  var margins = {top: 50, right: 50, bottom: 50, left: 50}
  var height=screen.height-margins.top-margins.bottom
  var width=screen.width-margins.right-margins.left
  svg=d3.select("body").append("svg").attr("width",screen.width).attr("height",screen.height)
  var projection = d3.geoAlbersUsa().translate([width/2, height/2]).scale([900]);
  var path = d3.geoPath().projection(projection);
  svg.selectAll("path")
     .data(json.features)
     .enter()
     .append("path")
     .attr("d", path)
     .style("fill", "steelblue")
     .on("mouseover", function(d,i) {
         d3.select(this).attr("stroke","black").style("fill","grey")})
     .on("mouseout", function() {
         d3.select(this).attr("stroke","none").style("fill", "steelblue")})
}
var drawCorrelation=function(data){
  var screen={width:850,height:700}
  var margins = {top: 50, right: 50, bottom: 50, left: 50}
  var height=screen.height-margins.top-margins.bottom
  var width=screen.width-margins.right-margins.left
  var xScale=d3.scaleLinear()
               .domain([0,70000])
               .nice()
               .range([0,width])
  var yScale=d3.scaleLinear()
               .domain([0,110000])
               .nice()
               .range([height,margins.top])
  console.log(xScale(data[1].StartingMedianSalary))
  console.log(data[1].StartingMedianSalary)
  svg=d3.select("body").append("svg").attr("width",screen.width).attr("height",screen.height)
  svg.selectAll("circle")
     .data(data)
     .enter()
     .append("circle")
     .attr("cx",function(d){return xScale(d.StartingMedianSalary)})
     .attr("cy",function(d){return 5})//yScale(d.MidCareerMedianSalary)})
     .attr("r",5)
}
