console.log("HelloWorld")
var majorData=d3.csv("data/degrees-that-pay-back.csv")
majorData.then(function(data){console.log(data)},function(err){console.log("err")})

var collegeData=d3.csv("data/salaries-by-college-type.csv")
collegeData.then(function(data){
  console.log(data)
},function(err){console.log("err")})

var regionData=d3.csv("data/salaries-by-region.csv")
regionData.then(function(data){
  console.log(data)
},function(err){console.log("err")})

d3.json("us-states.json").then(function(json){
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
     .style("fill", "steelblue");
}
