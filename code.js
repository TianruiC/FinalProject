console.log("HelloWorld")
var majorData=d3.csv("data/degrees-that-pay-back.csv")
majorData.then(function(data){
  console.log(data)
  drawCorrelation(data)
  drawBar(data)
  // calculateCorrelation(data)
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
  svg=d3.select("body").append("div").attr("id","map").style("display","none")
        .append("svg").attr("width",screen.width).attr("height",screen.height)
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
  var screen={width:850,height:600}
  var margins = {top: 50, right: 50, bottom: 50, left: 50}
  var height=screen.height-margins.top-margins.bottom
  var width=screen.width-margins.right-margins.left
  var xScale=d3.scaleLinear().domain([25000,75000]).nice().range([0,width])
  var yScale=d3.scaleLinear().domain([45000,110000]).nice().range([height,margins.top])
  var color=d3.scaleOrdinal(d3.schemeSet2)
  var r=calculateCorrelation(data).toFixed(4)
  svg=d3.select("body").append("div").attr("id","majorcorrelation").style("display","none")
        .append("svg").attr("width",screen.width).attr("height",screen.height).attr("id","correlation")//.attr("class",hidden)
  svg.selectAll("circle")
     .data(data)
     .enter()
     .append("circle")
     .attr("cx",function(d){return xScale(d.StartingMedianSalary)})
     .attr("cy",function(d){return yScale(d.MidCareerMedianSalary)})
     .attr("r",5)
     .style("fill",function(d,i){return color(i)})
  var xAxis=d3.axisBottom(xScale)
  svg.append("g").classed("xAxis",true)
     .call(xAxis)
     .attr('transform', 'translate('+(margins.left)+','+(height)+')')
  var yAxis=d3.axisLeft(yScale)
  svg.append("g").classed("yAxis",true)
     .call(yAxis)
     .attr("transform","translate("+(margins.left)+","+0+")")
  svg.append("text")
     .text("correlation is "+r+ ".")
     .attr("x",margins.left)
     .attr("y",margins.top)
}
var calculateCorrelation=function(data){
  var start=data.map(function(d){return d.StartingMedianSalary})
  var mid=data.map(function(d){return d.MidCareerMedianSalary})
  var startMean=d3.mean(start)
  var midMean=d3.mean(mid)
  var top=d3.sum(start.map(function(d,i){return (start[i]-startMean)*(mid[i]-midMean)}))
  var sx=d3.deviation(start)
  var sy=d3.deviation(mid)
  var r=1/(start.length-1)*top/(sx*sy)
  //console.log(start,mid,startMean,midMean,top,sx,sy)
  console.log(r)
  return r
}
var drawBar=function(data){
  var screen={width:800,height:1200}
  var margins = {top: 50, right: 200, bottom: 50, left: 10}
  var height=screen.height-margins.top-margins.bottom
  var width=screen.width-margins.right-margins.left
  var xScale=d3.scaleLinear().domain([0,210000]).nice().range([0,width])
  var yScale=d3.scaleLinear().domain([0,data.length]).nice().range([margins.top,height])
  var radius=5
  console.log(yScale(3),height,margins.top)
  svg=d3.select("body").append("div").attr("id","majorbar").style("display","block")
        .append("svg").attr("width",screen.width).attr("height",screen.height).attr("id","majorbarchart")
  svg.append("g").selectAll("rect")
     .data(data)
     .enter()
     .append("rect")
     .attr("id","selectbar")
     .attr("x",function(d){return xScale(0)})
     .attr("y",function(d,i){return yScale(i)-radius*1.75})
     .attr("width",function(d){return screen.width})
     .attr("height",radius*3.5)
     .attr("fill","grey")
     .style("opacity",0)
     .on("mouseover",function(d){
       d3.select(this).style("opacity",0.2)
     })
     .on("mouseout",function(d){
       d3.select(this).style("opacity",0)
     })
  svg.append("g").selectAll("line")
     .data(data)
     .enter()
     .append("line")
     .attr("x1",function(d){return xScale(d.MidCareer10thPercentileSalary)})
     .attr("x2",function(d){return xScale(d.MidCareer25thPercentileSalary)})
     .attr("y1",function(d,i){return yScale(i)})
     .attr("y2",function(d,i){return yScale(i)})
     .style("stroke", "black")
     .style("stroke-width", 2)
  svg.append("g").selectAll("line")
     .data(data)
     .enter()
     .append("line")
     .attr("x1",function(d){return xScale(d.MidCareer75thPercentileSalary)})
     .attr("x2",function(d){return xScale(d.MidCareer90thPercentileSalary)})
     .attr("y1",function(d,i){return yScale(i)})
     .attr("y2",function(d,i){return yScale(i)})
     .style("stroke", "black")
     .style("stroke-width", 2)
  svg.append("g").selectAll("rect")
     .data(data)
     .enter()
     .append("rect")
     .attr("id","barbox")
     .attr("x",function(d){return xScale(d.MidCareer25thPercentileSalary)})
     .attr("y",function(d,i){return yScale(i)-radius})
     .attr("width",function(d){return (xScale(d.MidCareer75thPercentileSalary)-xScale(d.MidCareer25thPercentileSalary))})
     .attr("height",radius*2)
     .attr("fill","grey")
  svg.append("g").selectAll("circle")
     .data(data)
     .enter()
     .append("circle")
     .attr("cx",function(d){return xScale(d.MidCareerMedianSalary)})
     .attr("cy",function(d,i){return yScale(i)})
     .attr("r",radius)
     .style("fill","#70916B")
  svg.append("g").selectAll("circle")
     .data(data)
     .enter()
     .append("circle")
     .attr("cx",function(d){return xScale(d.MidCareer90thPercentileSalary)})
     .attr("cy",function(d,i){return yScale(i)})
     .attr("r",radius)
     .style("fill","#345849")
  svg.append("g").selectAll("circle")
     .data(data)
     .enter()
     .append("circle")
     .attr("cx",function(d){return xScale(d.MidCareer10thPercentileSalary)})
     .attr("cy",function(d,i){return yScale(i)})
     .attr("r",radius)
     .style("fill","#C2C9B4")
  svg.append("g").selectAll("circle")
     .data(data)
     .enter()
     .append("circle")
     .attr("cx",function(d){return xScale(d.MidCareer25thPercentileSalary)})
     .attr("cy",function(d,i){return yScale(i)})
     .attr("r",radius)
     .style("fill","#9BAD8F")
  svg.append("g").selectAll("circle")
     .data(data)
     .enter()
     .append("circle")
     .attr("cx",function(d){return xScale(d.MidCareer75thPercentileSalary)})
     .attr("cy",function(d,i){return yScale(i)})
     .attr("r",radius)
     .style("fill","#47744E")
  svg.append("g").selectAll("text")
     .data(data)
     .enter()
     .append("text")
     .attr("id","majortext")
     .attr("x",width)
     .attr("y",function(d,i){return yScale(i)+5})
     .text(function(d){return d.UndergraduateMajor})



}
