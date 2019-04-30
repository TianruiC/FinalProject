console.log("HelloWorld")
var majorData=d3.csv("data/degrees-that-pay-back.csv")
majorData.then(function(data){console.log(data)},function(err){console.log("err")})

var collegeData=d3.csv("data/salaries-by-college-type.csv")
collegeData.then(function(data){
  //console.log(data)
  var newCollegeData=data.map(function(d){return {SchoolName:d.SchoolName,
                                           SchoolType:d.SchoolType,
                                           StartingMedianSalary:d.StartingMedianSalary,
                                           MidCareerMedianSalary:d.MidCareerMedianSalary,
                                           MidCareer25thPercentileSalary:d.MidCareer25thPercentileSalary,
                                           MidCareer75thPercentileSalary:d.MidCareer75thPercentileSalary};})
  console.log(newCollegeData)
},function(err){console.log("err")})

var regionData=d3.csv("data/salaries-by-region.csv")
regionData.then(function(data){
  //console.log(data)
  var newRegionData=data.map(function(d){return {SchoolName:d.SchoolName,
                                                 Region:d.Region,
                                                 StartingMedianSalary:d.StartingMedianSalary,
                                                 MidCareerMedianSalary:d.MidCareerMedianSalary,
                                                 MidCareer25thPercentileSalary:d.MidCareer25thPercentileSalary,
                                                 MidCareer75thPercentileSalary:d.MidCareer75thPercentileSalary};})
  console.log(newRegionData)
},function(err){console.log("err")})
