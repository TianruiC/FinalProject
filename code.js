var majorData=d3.csv("data/degrees-that-pay-back.csv")
var collegeData=d3.csv("data/salaries-by-college-type.csv")
var regionData=d3.csv("data/salaries-by-region.csv")
var us=d3.json("us-states.json")
Promise.all([majorData,collegeData,regionData,us]).then(function(data){
  majorData=data[0]
  collegeData=data[1]
  regionData=data[2]
  us=data[3]
  drawStartingMap(data)
  drawMidMap(data)
  drawCorrelation(majorData)
  drawBar(majorData)
},function(err){console.log(err)})

var drawStartingMap=function(data){
  var regionData=data[2]
  var CaliforniaData=[]
  regionData.forEach(function(d){if(d.Region=="California"){CaliforniaData.push(d)}})
  var NortheasternData=[]
  regionData.forEach(function(d){if(d.Region=="Northeastern"){NortheasternData.push(d)}})
  var SouthernData=[]
  regionData.forEach(function(d){if(d.Region=="Southern"){SouthernData.push(d)}})
  var MidwesternData=[]
  regionData.forEach(function(d){if(d.Region=="Midwestern"){MidwesternData.push(d)}})
  var WesternData=[]
  regionData.forEach(function(d){if(d.Region=="Western"){WesternData.push(d)}})
  var color=d3.scaleQuantile()
              .domain([38000,52000])
              .range(["#D9F2DE","#B1E2CA","#8AD2C2","#65BAC0","#4088AD","#2D4285"])
  var color1=d3.scaleQuantile()
              .domain([75000,95000])
              .range(["#D9F2DE","#B1E2CA","#8AD2C2","#65BAC0","#4088AD","#2D4285"])
  var screen={width:950,height:700}
  var margins = {top: 50, right: 50, bottom: 50, left: 50}
  var height=screen.height-margins.top-margins.bottom
  var width=screen.width-margins.right-margins.left
  svg=d3.select("body").append("div").attr("id","map").style("display","block")
        .append("svg").attr("width",screen.width).attr("height",screen.height)
  var projection = d3.geoAlbersUsa().translate([width/2, height/2]).scale([1100]);
  var path = d3.geoPath().projection(projection);
  var Northeastern=["Connecticut", "Maine", "Massachusetts", "New Hampshire", "Rhode Island", "Vermont","New Jersey", "New York", "Pennsylvania"]
  var Southern=["Delaware", "Florida", "Georgia", "Maryland", "North Carolina", "South Carolina", "Virginia", "District of Columbia", "West Virginia","Alabama", "Kentucky", "Mississippi","Tennessee","Arkansas", "Louisiana", "Oklahoma", "Texas"]
  var Midwestern=["Illinois", "Indiana", "Michigan", "Ohio", "Wisconsin","Iowa", "Kansas", "Minnesota", "Missouri", "Nebraska", "North Dakota", "South Dakota"]
  var Western=["Arizona", "Colorado", "Idaho", "Montana", "Nevada", "New Mexico", "Utah", "Wyoming","Alaska", "Hawaii", "Oregon",  "Washington"]
  var region=function(data){
    if(Northeastern.indexOf(data)>-1){return "Northeastern"}
    else if (Southern.indexOf(data)>-1){return "Southern"}
    else if (Midwestern.indexOf(data)>-1){return "Midwestern"}
    else if (Western.indexOf(data)>-1){return "Western"}
    else{return "California"}
  }
  var finddata=function(region){
    if(region=="Northeastern"){return NortheasternData}
    else if (region=="Southern"){return SouthernData}
    else if (region=="Midwestern"){return MidwesternData}
    else if (region=="Western"){return WesternData}
    else{return CaliforniaData}
    }
  svg.selectAll("path")
     .data(data[3].features)
     .enter()
     .append("path")
     .attr("d", path)
     .attr("id",function(d){return region(d.properties.name)})
     .style("fill", function(d){
       var data=finddata(region(d.properties.name))
       var ave=d3.sum(data.map(function(d){return d.StartingMedianSalary}))/data.length
       return color(ave)
     })
     .attr("stroke","grey")
     .on("mouseover", function(d,i) {
         var region=d3.select(this).attr("id")
         var id="#".concat(region)
         d3.selectAll(id).attr("stroke","black").attr("stroke-width",2)})
     .on("mouseout", function() {
       var region=d3.select(this).attr("id")
       var id="#".concat(region)
       d3.selectAll(id).attr("stroke","grey").attr("stroke-width",1)})
  svg.append('g')
        .attr('id',"legend")
        .append('rect')
        .classed('fillbar', true)
        .attr('x', 20)
        .attr('y', 20)
        .attr('width', 300)
        .attr('height', 20)
        .attr('transform',"translate(600,550)");
  var svgDefs = svg.append('defs');
  var mainGradient = svgDefs.append('linearGradient')  .attr('id', 'mainGradient');
  mainGradient.append('stop').attr('offset', '0%').attr("stop-color", "#D9F2DE")
  mainGradient.append('stop').attr('offset', '17%').attr("stop-color", "#B1E2CA")
  mainGradient.append('stop').attr('offset', '33%').attr("stop-color", "#8AD2C2")
  mainGradient.append('stop').attr('offset', '50%').attr("stop-color", "#65BAC0")
  mainGradient.append('stop').attr('offset', '67%').attr("stop-color", "#4088AD");
  mainGradient.append('stop').attr('offset', '83%').attr("stop-color", "#2D4285");
  svg.append("text")
     .attr("id","max")
     .text("$52000")
     .attr("x",900)
     .attr("y",610)
  svg.append("text")
     .attr("id","min")
     .text("$38000")
     .attr("x",600)
     .attr("y",610)
  svg.append("text")
      .attr("id","median")
      .text("$45000")
      .attr("x",750)
      .attr("y",610)
  svg.append("line")
     .attr("x1",770)
     .attr("x2",770)
     .attr("y1",565)
     .attr("y2",590)
     .attr("stroke","black")
     .attr("stroke-width",2)
     .style("opacity",0.75)
}
var drawMidMap=function(data){
  var regionData=data[2]
  var CaliforniaData=[]
  regionData.forEach(function(d){if(d.Region=="California"){CaliforniaData.push(d)}})
  var NortheasternData=[]
  regionData.forEach(function(d){if(d.Region=="Northeastern"){NortheasternData.push(d)}})
  var SouthernData=[]
  regionData.forEach(function(d){if(d.Region=="Southern"){SouthernData.push(d)}})
  var MidwesternData=[]
  regionData.forEach(function(d){if(d.Region=="Midwestern"){MidwesternData.push(d)}})
  var WesternData=[]
  regionData.forEach(function(d){if(d.Region=="Western"){WesternData.push(d)}})
  var color=d3.scaleQuantile()
              .domain([40000,55000])
              .range(["#D9F2DE","#B1E2CA","#8AD2C2","#65BAC0","#4088AD","#2D4285"])
  var color1=d3.scaleQuantile()
              .domain([75000,95000])
              .range(["#D9F2DE","#B1E2CA","#8AD2C2","#65BAC0","#4088AD","#2D4285"])
  var screen={width:950,height:700}
  var margins = {top: 50, right: 50, bottom: 50, left: 50}
  var height=screen.height-margins.top-margins.bottom
  var width=screen.width-margins.right-margins.left
  svg=d3.select("body").append("div").attr("id","midmap").style("display","none")
        .append("svg").attr("width",screen.width).attr("height",screen.height)
  var projection = d3.geoAlbersUsa().translate([width/2, height/2]).scale([1100]);
  var path = d3.geoPath().projection(projection);
  var Northeastern=["Connecticut", "Maine", "Massachusetts", "New Hampshire", "Rhode Island", "Vermont","New Jersey", "New York", "Pennsylvania"]
  var Southern=["Delaware", "Florida", "Georgia", "Maryland", "North Carolina", "South Carolina", "Virginia", "District of Columbia", "West Virginia","Alabama", "Kentucky", "Mississippi","Tennessee","Arkansas", "Louisiana", "Oklahoma", "Texas"]
  var Midwestern=["Illinois", "Indiana", "Michigan", "Ohio", "Wisconsin","Iowa", "Kansas", "Minnesota", "Missouri", "Nebraska", "North Dakota", "South Dakota"]
  var Western=["Arizona", "Colorado", "Idaho", "Montana", "Nevada", "New Mexico", "Utah", "Wyoming","Alaska", "Hawaii", "Oregon",  "Washington"]
  var region=function(data){
    if(Northeastern.indexOf(data)>-1){return "Northeastern"}
    else if (Southern.indexOf(data)>-1){return "Southern"}
    else if (Midwestern.indexOf(data)>-1){return "Midwestern"}
    else if (Western.indexOf(data)>-1){return "Western"}
    else{return "California"}
  }
  var finddata=function(region){
    if(region=="Northeastern"){return NortheasternData}
    else if (region=="Southern"){return SouthernData}
    else if (region=="Midwestern"){return MidwesternData}
    else if (region=="Western"){return WesternData}
    else{return CaliforniaData}
    }
  svg.selectAll("path")
     .data(data[3].features)
     .enter()
     .append("path")
     .attr("d", path)
     .attr("id",function(d){return region(d.properties.name)})
     .style("fill", function(d){
       var data=finddata(region(d.properties.name))
       var ave=d3.sum(data.map(function(d){return d.MidCareerMedianSalary}))/data.length
       return color1(ave)
     })
     .attr("stroke","grey")
     .on("mouseover", function(d,i) {
         var region=d3.select(this).attr("id")
         var id="#".concat(region)
         d3.selectAll(id).attr("stroke","black").attr("stroke-width",2)})
     .on("mouseout", function() {
       var region=d3.select(this).attr("id")
       var id="#".concat(region)
       d3.selectAll(id).attr("stroke","grey").attr("stroke-width",1)})
    svg.append('g')
          .attr('id',"legend")
          .append('rect')
          .classed('fillbar2', true)
          .attr('x', 20)
          .attr('y', 20)
          .attr('width', 300)
          .attr('height', 20)
          .attr('transform',"translate(600,550)");
    var svgDefs = svg.append('defs');
    var mainGradient2 = svgDefs.append('linearGradient')  .attr('id', 'mainGradient2');
    mainGradient2.append('stop').attr('offset', '0%').attr("stop-color", "#D9F2DE")
    mainGradient2.append('stop').attr('offset', '17%').attr("stop-color", "#B1E2CA")
    mainGradient2.append('stop').attr('offset', '33%').attr("stop-color", "#8AD2C2")
    mainGradient2.append('stop').attr('offset', '50%').attr("stop-color", "#65BAC0")
    mainGradient2.append('stop').attr('offset', '67%').attr("stop-color", "#4088AD");
    mainGradient2.append('stop').attr('offset', '83%').attr("stop-color", "#2D4285");
    svg.append("text")
       .attr("id","max")
       .text("$95000")
       .attr("x",900)
       .attr("y",610)
    svg.append("text")
       .attr("id","min")
       .text("$75000")
       .attr("x",600)
       .attr("y",610)
    svg.append("text")
        .attr("id","median")
        .text("$85000")
        .attr("x",750)
        .attr("y",610)
    svg.append("line")
       .attr("x1",770)
       .attr("x2",770)
       .attr("y1",565)
       .attr("y2",590)
       .attr("stroke","black")
       .attr("stroke-width",2)
       .style("opacity",0.75)
}
var drawCorrelation=function(data){
  var screen={width:950,height:600}
  var margins = {top: 50, right: 50, bottom: 50, left: 50}
  var height=screen.height-margins.top-margins.bottom
  var width=screen.width-margins.right-margins.left
  var xScale=d3.scaleLinear().domain([25000,75000]).nice().range([0,width])
  var yScale=d3.scaleLinear().domain([45000,110000]).nice().range([height,margins.top])
  var color=d3.scaleOrdinal(d3.schemeSet2)
  var r=calculateCorrelation(data).toFixed(4)
  svg=d3.select("body").append("div").attr("id","majorcorrelation").style("display","none")
        .append("svg").attr("width",screen.width).attr("height",screen.height).attr("id","correlation")
        .attr('transform', 'translate(' +(margins.left)+','+(0)+')')//.attr("class",hidden)
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
     .text("Correlation is "+r+ ".")
     .attr("x",(600))
     .attr("y",(450))
     .attr("id","correlationtext")
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
  var screen={width:950,height:1200}
  var margins = {top: 50, right: 180, bottom: 10, left: 30}
  var height=screen.height-margins.top-margins.bottom
  var width=screen.width-margins.right-margins.left
  var xScale=d3.scaleLinear().domain([0,210000]).nice().range([margins.left,width])
  var yScale=d3.scaleLinear().domain([0,data.length]).nice().range([margins.top,height])
  var radius=5
  console.log(yScale(3),height,margins.top)
  div=d3.select("body").append("div").attr("id","majorbar").style("display","none")
  svg=div.append("svg").attr("width",screen.width).attr("height",screen.height).attr("id","majorbarchart")
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
  var linedata=[0,50000,100000,150000,200000]
  svg.append("g").selectAll("line")
     .data(linedata)
     .enter()
     .append("line")
     .attr("x1",function(d){return xScale(d)+1})
     .attr("x2",function(d){return xScale(d)+1})
     .attr("y1",function(d){return margins.top-10})
     .attr("y2",function(d){return height})
     .style("stroke", "black")
     .style("stroke-width", 1)
     .style("opacity",0.5)
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
     .on("mouseover",function(d){
          d3.select("#tooltip1")
            .style("left",width+margin.left+margin.right+300)
            .style("top",20)
            .select("#percentage")
            .text("");
           d3.select("#day1")
             .text("Day: "+d.day)
         d3.select("#tooltip1").classed("hiddened",false);
        })
        .on("mouseout",function(){
         d3.select("#tooltip1").classed("hiddened",true);
        });
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
     .attr("x",width+2)
     .attr("y",function(d,i){return yScale(i)+5})
     .text(function(d){return d.UndergraduateMajor})
  var xAxis=d3.axisBottom(xScale).ticks(5)
  svg.append("g")
     .attr("id","barxAxis")
     .call(xAxis)
     .attr('transform', 'translate(' +(0.5)+','+(height)+')')
  var barlegendtext=["10 percentile","25 percentile","Median","75 percentile","90 percentile"]
  var barlegendcolor=["#C2C9B4","#9BAD8F","#70916B","#47744E","#345849"]
  svg.append("g").selectAll("rect")
           .data(barlegendcolor)
           .enter()
           .append("rect")
           .attr("x",function(d,i){return i*width/barlegendcolor.length+10+margins.left})
           .attr("y",20)
           .attr("width",10)
           .attr("height",10)
           .style("fill",function(d){return d})
  svg.append("g").selectAll("text")
           .data(barlegendtext)
           .enter()
           .append("text")
           .attr("x",function(d,i){return i*width/barlegendcolor.length+25+margins.left})
           .attr("y",30)
           .text(function(d){return d})
}
var hideall=function(){
  d3.selectAll("div").style("display","none")
}
var showall=function(){
  d3.selectAll("div").style("display","block")
}
d3.select("body").append("button").text("Starting Salary by Region").attr("id","mapbutton")
  .on("click",function(){
    hideall()
    d3.select("#map").style("display","block")
    document.getElementById("heading").innerHTML = "Average Starting Median Salary by Region"
  })
d3.select("body").append("button").text("MidCareer Salary by Region").attr("id","midmapbutton")
  .on("click",function(){
    hideall()
    d3.select("#midmap").style("display","block")
    document.getElementById("heading").innerHTML = "Average Mid-Career Median Salary by Region"
  })
d3.select("body").append("button").text("Salary correlation").attr("id","correlationbutton")
  .on("click",function(){
    hideall()
    d3.select("#majorcorrelation").style("display","block")
    document.getElementById("heading").innerHTML = "Correlation between Starting Median Salary and Mid-Career Median Salary"
  })
d3.select("body").append("button").text("percentile chart").attr("id","barchartbutton")
  .on("click",function(){
    hideall()
    d3.select("#majorbar").style("display","block")
    document.getElementById("heading").innerHTML = "Mid-Career Salary percentile chart by Major"
  })
