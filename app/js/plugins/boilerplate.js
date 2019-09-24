var margin = {top:25, right:0, bottom:25, left:25};

// var colors = {
//     bold: ["#d51e2d", "#52CFE5", "#385775", "#FFBF3D", "#6f2b6e", "#00CFB5"],
//     pastel: ["#e59097", "#c0adcc", "#b3cadd", "#a3ceaf", "lavender", "aquamarine", "gold"],
//     procon: ["#ce0201", "#a5d65a"],
//     political: ["#D41B2C", "#006EB5"]
// }

var colors = {
    bold: ["#d51e2d", "#52CFE5", "#385775", "#FFBF3D", "#6f2b6e", "#00CFB5"],
    pastel: ["#e59097", "#c0adcc", "#b3cadd", "#a3ceaf", "lavender", "aquamarine", "gold"],
    procon: ["#cc0000", "#808080", "#000"],
    political: ["#D41B2C", "#006EB5"]
}

var chartmeta = {
    title: "Title goes here",
    subtitle: "Subtitle goes here",
    source: "Bureau of Labor Statistics",
    note: "Caveat to the data"
}


d3.json('/interactive/2019/charts/data/aggregated.json')
  .then(function(data) {

  columnTemplate(data, chartmeta, "#column");

  groupedColumnTemplate(data, chartmeta, "#groupedcolumn");

  lineTemplate(data, chartmeta, "#line");

  multiLineTemplate(data, chartmeta, "#multiline");

    barTemplate(data, chartmeta, "#bar");

   groupedbarTemplate(data, chartmeta, "#groupedbar");



}).catch(function(error){
   // handle error
});
