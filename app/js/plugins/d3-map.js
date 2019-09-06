//
// var svg = container.append("svg")
//     .attr("width", width)
//     .attr("height", height)
//     .attr("id", "mapsvg")
//     .call(d3.zoom().on("zoom", function () {
//         svg.attr("transform", d3.event.transform);
//      }))
//      .append("g");
//
// var tip = d3.tip()
//     .attr('class', 'd3-tip')
//     .html(function(d) {
//       return "<b>" + d.properties.name + ":</b> " + d.properties.flags;
//     });
//
// // Map and projection
// var projection  = d3.geoMercator()
//     .scale(width / 6)
//     .translate([(width*0.5), (width*0.375)]);
//
// var path = d3.geoPath().projection(projection);
//
// Promise.all([
//   d3.json("interactive/2019/05/flags/js/library/world.json"),
//   d3.csv("interactive/2019/05/flags/js/library/dataclean.csv"),
//   d3.json("interactive/2019/05/flags/js/library/country-codes.json")
// ]).then(function(data) {
//
//     var world = data[0];
//     var selections = d3.nest()
//       .key(function(d) { return d.country; })
//       .rollup(function(v) { return v.length; })
//       .entries(data[1]);
//     var countryCodes = d3.map(data[2]).entries();
//
//     world.features.map(function (country){
//         if (country.properties.name == "United States of America") {
//             country.properties.centroid = projection([-97,38]);
//         } else {
//             country.properties.centroid = path.centroid(country);
//         }
//
//         var countryAbbrev = countryCodes.filter(function(c) {
//             return c.value == country.properties.name;
//         });
//         if (countryAbbrev.length == 0) {
//             country.properties.code = null;
//             // console.log(country.properties.name + " -- has no code.");
//         } else {
//             country.properties.code = countryAbbrev[0].key;
//         }
//
//         var timesSelected = selections.filter(function(s) {
//             return s.key == country.properties.name;
//         });
//         if (timesSelected.length == 0) {
//             country.properties.flags = 0;
//             // console.log(country.properties.name + " -- was not selected by any students.");
//         } else {
//             country.properties.flags = timesSelected[0].value;
//         }
//     });
//
//     svg.append('circle')
//         .attr('id', 'tipfollowscursor')
//         .attr('r',5) /*  to debug */
//     svg.call(tip);
//
//     svg.selectAll("path")
//       .data(world.features)
//     .enter().append("svg:path")
//         .call(tip)
//       .attr("d", path)
//       .attr("class", function(d) { return d.properties.name; })
//       .on('mouseover', function (d) {
//             if (d.properties.flags > 0) {
//                 var target = d3.select('#tipfollowscursor')
//                     .attr('cx', d3.event.offsetX)
//                     .attr('cy', d3.event.offsetY - 5) // 5 pixels above the cursor
//                     .node();
//                 tip.show(d, target);
//             }
//         })
//       .on('mouseout', tip.hide);
//
//
//
//         var centroidPoints = svg.selectAll("svg.flag")
//             .data(world.features)
//         .enter().append("image")
//             .filter(function(d) { return d.properties.flags !== 0; })
//             .attr("href", function(d) {
//                 return "interactive/2019/05/flags/images/" + d.properties.code.toLowerCase() + ".png";
//             })
//             .attr("preserveAspectRatio", "xMinYMin")
//             .attr("width", function(d) { return flagscale(d.properties.flags); })
//             .attr("height", function(d) { return flagscale(d.properties.flags) * .66; })
//             // .attr("r", function(d) { return flagscale(d.properties.flags); })
//             .attr("class", function(d) { return d.properties.name + " flag"; })
//             .attr("x", function(d) { return d.properties.centroid[0]; })
//             .attr("y", function(d) { return d.properties.centroid[1]; })
//             .attr("transform", function(d) {
//                 return "translate(-" + (flagscale(d.properties.flags)/2) + ",-" + (flagscale(d.properties.flags)/3) + ")";
//             })
//             .on('mouseover', function (d) {
//                 if (d.properties.flags > 0) {
//                     var target = d3.select('#tipfollowscursor')
//                         .attr('cx', d3.event.offsetX)
//                         .attr('cy', d3.event.offsetY - 5) // 5 pixels above the cursor
//                         .node();
//                     tip.show(d, target);
//                 }
//               })
//             .on('mouseout', tip.hide);
//
//             console.log(world);
//             // console.log(selections);
// });
