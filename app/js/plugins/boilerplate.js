var margin = {top:25, right:0, bottom:25, left:25};

var colors = {
    bold: ["#d51e2d", "#52CFE5", "#385775", "#FFBF3D", "#6f2b6e", "#00CFB5"],
    pastel: ["#e59097", "#c0adcc", "#b3cadd", "#a3ceaf"],
    procon: ["#ce0201", "#a5d65a"],
    political: ["#D41B2C", "#006EB5"]
}

d3.json('/interactive/2018/10/bubble/data/aggregated.json')
  .then(function(data) {

  barTemplate(data, "#bar");

  groupedBarTemplate(data, "#groupedbar");

  donutTemplate(data, "#donut");

  coalTemplate(data, "#coal");

}).catch(function(error){
   // handle error
});
