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


d3.json('/interactive/2018/10/bubble/data/aggregated.json')
  .then(function(data) {

  columnTemplate(data, "#column");

  groupedColumnTemplate(data, "#groupedcolumn");

  lineTemplate(data, "#line");

  multiLineTemplate(data, "#multiline");

    barTemplate(data, "#bar");

   groupedbarTemplate(data, "#groupedbar");

}).catch(function(error){
   // handle error
});

function barTemplate(data, targetElement) {

    var width = d3.select(targetElement).node().getBoundingClientRect().width;
    var height = width * 0.4;


    var x = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) {
            return d.positive + 100;
        })])
        .range([0, width - margin.left - margin.right]);

    var y = d3.scaleBand()
        .domain(data.map(function(d) {
            return d.candidate;
        }))
        .range([height, 0])
        .padding(0.2);

    var xAxis = d3.axisBottom(x)
        .tickSize(-height);

    var yAxis = d3.axisLeft(y)
        .ticks(7)
        .tickSize(0);
    // .ticks(7)
    // .tickSize(-width);
    // create container SVG
    var svg = d3.select(targetElement).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
        .attr("class", "xAxis")
        .attr("transform", "translate(0," + height + ")")
        .style("font-size", "14px")
        .call(customXAxis);

    svg.append("g")
        .attr("class", "yAxis")
        .style("font-size", "12px")
        .call(customYAxis);

  function customXAxis(g){
      var s = g.selection ? g.selection() : g;
      g.call(xAxis);
      s.select(".domain").remove();
      s.selectAll(".tick line").filter(Number).attr("stroke", "#777").attr("stroke-dasharray", "2,2");
      // s.selectAll(".tick text").attr("x", 10).attr("dy", -4);
  }

  function customYAxis(g) {
    g.call(yAxis);
    g.select(".domain").remove();
  }

  svg.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("width", function(d){
        return x(d.positive);
      })
      .attr("y", function(d){
        return y(d.candidate);
      })
      .attr("height", y.bandwidth())
      .attr("fill", function(d,i) { return "#cc0000"; })
      .on("mouseover, mousemove", function(d){
          d3.select(this)
              .attr("fill", "#f08080");
      })
      .on("mouseout", function(d,i){
          d3.select(this).attr("fill", function() {
              return "#cc0000";
      });
  });
}

function columnTemplate(data, targetElement) {

    var width = d3.select(targetElement).node().getBoundingClientRect().width;
    var height = width * 0.4;

    // set the ranges
    var x = d3.scaleBand()
        .domain(data.map(function(d) { return d.candidate; }))
        .range([0, width - margin.left - margin.right])
        .padding(0.33);

    var y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return d.positive; })])
        .range([height, 0])
        .nice();

    var xAxis = d3.axisBottom(x)
                  .tickFormat(function(d){
                        return d;
                    })
                    .tickSize(0);

    var yAxis = d3.axisLeft(y)
                  .ticks(7)
                  .tickSize(-width);

    // create container SVG
    var svg = d3.select(targetElement).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
        .attr("class", "xAxis")
        .attr("transform", "translate(0," + height + ")")
        .style("font-size", "14px")
        .call(customXAxis);
        // .selectAll(".tick:not(:first-of-type) line")
        // .attr("stroke-opacity", 0);

    svg.append("g")
        .attr("class", "yAxis")
        .style("font-size", "12px")
        .call(customYAxis);
        // .selectAll(".tick:not(:first-of-type) line")
        // .attr("stroke", "gray")
        // .attr("stroke-dasharray", "2,2")
        // .attr("stroke-opacity", 0.5);


    // create tooltip using d3-tip library
    // var tooltip = d3.tip()
    //     .attr('class', 'd3-tip')
    //     .offset([-10,0])
    //     .html(function(d) {
    //         return d.candidate + ": " + d.positive;
    //       });
    //
    // svg.append('circle')
    //     .attr('class', 'tiptarget');
    // svg.call(tooltip);

    function customXAxis(g) {
      g.call(xAxis);
      g.select(".domain").remove();
    }

    function customYAxis(g) {
      var s = g.selection ? g.selection() : g;
      g.call(yAxis);
      s.select(".domain").remove();
      s.selectAll(".tick line").filter(Number).attr("stroke", "#777").attr("stroke-dasharray", "2,2");
      s.selectAll(".tick text").attr("x", 10).attr("dy", -4);
      // if (s !== g) g.selectAll(".tick text").attrTween("x", null).attrTween("dy", null);
    }

    // append the rectangles for the bar chart
    svg.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.candidate);})
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(d.positive); })
        .attr("height", function(d) { return height - y(d.positive); })
        .attr("fill", function(d,i) { return "#cc0000"; })
        .on('mouseover, mousemove', function(d){
            // console.log("hover");
            var target = d3.select(targetElement + ' .tiptarget');
            d3.select(this)
                .attr("fill", "#f08080");
            // d3.select(".label").attr("fill", "#777");
        })
        .on("mouseout", function(d, i) {
         d3.select(this).attr("fill", function() {
             return "#cc0000";
             d3.select(".label").attr("fill", "#e6e6e6");
         });
     });

     svg.selectAll(".text")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "label")
        .attr("fill", "#e6e6e6")
        .attr("x", function(d,i){
            return x(d.candidate) + (x.bandwidth()/2 - 10);
            // return i * (width/data.length);
        })
        .attr("y", function(d){
             return y(d.positive) + 25;
            // height - (d * 4);
        })
        // .attr("dy", ".75em")
        .text(function(d){
            return d.positive;
        });



    // svg.append("text")
    //     .attr("class", "label")
    //     .attr("y", function(d){
    //         return y(d.positive) + 3;
    //     })
    //     .text(function(d){
    //         return d.positive;
    //     });
    // add the x Axis
    // svg.append("g")
    //     .attr("transform", "translate(0," + height + ")")
    //     .call(d3.axisBottom(x));

    // add the y Axis
    // svg.append("g")
    //     .call(d3.axisLeft(y));
}

function donutTemplate(data, targetElement) {

    var width = d3.min([document.documentElement.clientWidth, (d3.select(targetElement).node().getBoundingClientRect().width / 3.1)]);
    var height = width;
    var radius = Math.min(width, height) / 2;
    // var newdata = [];

    var colorscale = d3.scaleOrdinal()
        .domain(["negative", "positive"])
        .range(colors.procon);

    var pie = d3.pie()
        .value(function(d) {return d.value; });

        // tooltip
    var tooltip = d3.tip()
        .attr('class', 'd3-tip')
        .direction('e')
        .html(function(d) { return d.data.key + ": " + d.data.value + "%"; });

        // re-arrange data file to fit D3 pie preferences
    data.forEach(function(c) {

        var newfiltered = pie(d3.entries(c).filter(function(d) { return d.key == "negative" || d.key == "positive"; }));

            // append one div for each of the three countries
        var countrydiv = d3.select(targetElement)
          .append('div')
          .attr("class", c.candidate + " piecontainer")
          .style("display", "inline-block");

        countrydiv.append('h3')
          .attr('style','text-align:center;')
          .text(c.candidate);

        var countrygraph = countrydiv
          .append('svg')
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", "translate(" + width/2 + "," + width/2 + ")");

        countrygraph.append('circle').attr('class', 'tooltip_target');
        countrygraph.call(tooltip);

        countrygraph
            .selectAll('.donutchart')
            .data(newfiltered)
            .enter()
            .append('path')
            .on('mouseover, mousemove', function (d) {
                var target = d3.select(targetElement + ' .' + c.candidate + ' .tooltip_target')
                    .attr('cx', d3.event.offsetX)
                    .attr('cy', d3.event.offsetY) // 5 pixels above the cursor
                    .node();
                tooltip.show(d, target);
            })
            .on('mouseout', tooltip.hide)
            .attr('d', d3.arc()
                .innerRadius(radius/3)
                .outerRadius(radius - margin.top - margin.bottom)
            )
            .attr('fill', function(d){ return(colorscale(d.data.key)); });
    });


        // legend -- this time we're putting this at the end to display it under the charts
    // container.append("svg")
    //       .attr("class", "legendOrdinal")
    //       .attr("transform", "translate(" + ((width/2)-50) + ",0)");
    //
    // var legendOrdinal = d3.legendColor()
    //   .shapeWidth(50)
    //   .shapeHeight(25)
    //   .orient('vertical')
    //   .scale(colorscale);
    //
    // container.select(".legendOrdinal")
    //   .call(legendOrdinal);

}


function groupedColumnTemplate(data, targetElement) {

    var width = d3.select(targetElement).node().getBoundingClientRect().width;
    var height = width * 0.4;

    // this is to ensure that charts with fewer variables have extra breathing space between groups, instead of comically wide data bars
    // var groupPadScale = d3.scaleLinear()
    //     .domain([7,2])
    //     .range([0.2, 0.35]);

    // set the ranges
    var xGrouping = d3.scaleBand()
        .domain(data.map(function(d) {
            return d.candidate;
        }))
        .rangeRound([0, ((width < 768) ?
            (height + 175 + ((newdata.length - 3) * 40)) :
            (width - margin.right))])
        .paddingInner(0.25)
        .paddingOuter(0.25);

    var xBar = d3.scaleBand()
        .domain(["negative", "positive"])
        .rangeRound([0, xGrouping.bandwidth()])
        .padding(0);


    var y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) {
            return d.positive;
        })])
        .range([height, 0])
        .nice();

    var xAxis = d3.axisBottom(xGrouping)
        .tickFormat(function(d) {
            return d;
        })
        .tickSize(0);

    var yAxis = d3.axisLeft(y)
        .ticks(7)
        .tickSize(-width);

    var colorscale = d3.scaleOrdinal()
        .domain(["negative", "positive"])
        .range(colors.procon);


    function customXAxis(g) {
        g.call(xAxis);
        g.select(".domain").remove();
    }

    function customYAxis(g) {
        var s = g.selection ? g.selection() : g;
        g.call(yAxis);
        s.select(".domain").remove();
        s.selectAll(".tick line").filter(Number).attr("stroke", "#777").attr("stroke-dasharray", "2,2");
        s.selectAll(".tick text").attr("x", 10).attr("dy", -4);
        // if (s !== g) g.selectAll(".tick text").attrTween("x", null).attrTween("dy", null);
    }

    // create container SVG
    var svg = d3.select(targetElement).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
        .attr("class", "xAxis")
        .attr("transform", "translate(0," + height + ")")
        .style("font-size", "14px")
        // .call(d3.axisBottom(xGrouping));
        .call(customXAxis);

    svg.append("g")
        // .call(d3.axisLeft(y));
        .attr("class", "yAxis")
        .style("font-size", "12px")
        .call(customYAxis);


    // legend
    // svg.append("g")
    //       .attr("class", "legendOrdinalGroup")
    //       .attr("transform", "translate(" + ((width < 768) ? (width-225) : (width-350)) + ",0)");
    //
    // var legendOrdinalGroup = d3.legendColor()
    //   .shapeWidth((width < 768) ? 50 : 90)
    //   .shapeHeight(10)
    //   .shapePadding(15)
    //   .orient('horizontal')
    //   .scale(countrycolors)
    //   .labels(spellout.range())
    //   .labelWrap((width < 768) ? 50 : 90);
    //
    // svg.select(".legendOrdinalGroup")
    //   .call(legendOrdinalGroup);

    // create tooltip using d3-tip library
    // var tooltip = d3.tip()
    //     .attr('class', 'd3-tip')
    //     .offset([-10,0])
    //     .html(function(d) {
    //         return d.candidate + ": " + d.negative+ ", " + d.positive;
    //       });
    //
    // svg.append('circle').attr('class', 'tiptarget');
    // svg.call(tooltip);


    svg.append("g")
        .selectAll("g")
        .data(data)
        .enter().append("g")
        .attr("transform", function(d){
            return 'translate(' + xGrouping(d.candidate) + ',0)';
        })
        .selectAll("rect")
        .data(function(d) {

            // console.log(d3.entries(d).filter(function(dd) {
            //     return dd.key == "negative" || dd.key == "positive" || dd.key == "percent_positive";
            // }));

            return d3.entries(d).filter(function(dd) {
                return dd.key == "negative" || dd.key == "positive";
            });
        })
        .enter().append("rect")
        .attr("width", xBar.bandwidth())
        .attr("height", function(d){
            return y(0) - y(d.value);
        })
        .attr("x", function(d,i) {
            return xBar(d.key);
        })
        .attr("y", function(d) {

            return y(d.value);
        })
        .attr("fill",
            function(d) {
                return colorscale(d.key);
            })
        .on('mouseover, mousemove', function(d){
            if(d.key == "negative"){
                d3.select(this).attr("fill", "#f08080");
            }
            else{
                d3.select(this).attr("fill", "#c0c0c0")
            }

        })
        .on('mouseout', function(d,i){
            if(d.key == "negative"){
                d3.select(this).attr("fill", "#cc0000");
            }
            else{
                d3.select(this).attr("fill", "#808080")
            }
        });



    svg.selectAll(".text")
       .data(data)
       .enter()
       .append("text")
       .attr("class", "label")
       .attr("x", function(d, i){

           return i * (width/(data.length));
       })
       .attr("y", function(d, i){
           // console.log(d);
           return y(d.value);
           // return height * i/12 ;
       })
       .text(function(d){

           // var val = d3.entries(d).filter(function(dd) {
           //     return dd.key == "negative" || dd.key == "positive" || dd.key == "percent_positive";
           // });
           //
           // console.log(val);
           // val.keys(d).map(function(key){
           //     return d[key];
           // });
           // console.log(val);
           var values = Object.keys(d).map(function(key){


                  return d[key];


           });
           // console.log(values);
           // // console.log(d.value[key]);
           // console.log(d.negative && d.positive);
           // return d.candidate;
           return "";
            // console.log(d);

          });
        // .selectAll(".bar")
        // .data(data)
        // .join("g")
        // .attr("transform", function(d) { return 'translate(' + xGrouping(d.candidate) + ',0)'; })
        // .attr("class", function(d) {return d.candidate;})
        // .on('mouseover, mousemove', function (d) {
        //     var target = d3.select(targetElement + ' .tiptarget')
        //         .attr('cx', d3.event.offsetX - 45)
        //         .attr('cy', d3.event.offsetY - 45) // 5 pixels above the cursor
        //         .node();
        //     tooltip.show(d, target);
        //
        // })
        // .on('mouseout', function(d){
        //   tooltip.hide();
        // })
        // .on('mouseout', tooltip.hide)
        // .selectAll("rect")
        // .data(function(d) {
        //     console.log(d3.entries(d).filter(function(dd) {
        //         return dd.key == "negative" || dd.key == "positive";
        //     }));
        //     return d3.entries(d).filter(function(dd) {
        //         return dd.key == "negative" || dd.key == "positive";
        //     });
        // })
        // .join("rect")
        // .attr("x", function(d) {
        //     return xBar(d.key);
        // })
        // .attr("y", function(d) {
        //     return y(d.value);
        // })
        // .attr("width", xBar.bandwidth())
        // .attr("height", function(d) {
        //     return y(0) - y(d.value);
        // })
        // .attr("fill",
        //     function(d) {
        //         return colorscale(d.key);
        //     });


    // svg.selectAll(".text")
    //    .data(data)
    //    .enter()
    //    .append("text")
    //    .attr("class", "label")
    //    .attr("fill", "#000")
    //    .attr("x", function(d,i){
    //      return xBar(d.candidate) + (xBar.bandwidth()/2 - 10);
    //    })
    //    .attr("y", function(d){
    //      return y(d) + 25;
    //    })
    //    .text(function(d, i){
    //      return d.negative + ":" + d.positive;
    //    });
    // axes

}

function lineTemplate(data, targetElement){

    var width = d3.select(targetElement).node().getBoundingClientRect().width;
    var height = width * 0.4;

    // set the ranges
    var x = d3.scaleBand()
        .domain(data.map(function(d) { return d.candidate; }))
        .range([0, width - margin.left - margin.right])
        .padding(0.33);

    var y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return d.positive; })])
        .range([height, 0])
        .nice();

    var xAxis = d3.axisBottom(x)
                  .tickFormat(function(d){
                        return d;
                    })
                    .tickSize(0);

    var yAxis = d3.axisLeft(y)
                  .ticks(7)
                  .tickSize(-width);
                  // create container SVG
  var svg = d3.select(targetElement).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

  svg.append("g")
      .attr("class", "xAxis")
      .attr("transform", "translate(0," + height + ")")
      .style("font-size", "14px")
      .call(customXAxis);
      // .selectAll(".tick:not(:first-of-type) line")
      // .attr("stroke-opacity", 0);

  svg.append("g")
      .attr("class", "yAxis")
      .style("font-size", "12px")
      .call(customYAxis);

      function customXAxis(g) {
        g.call(xAxis);
        g.select(".domain").remove();
      }

      function customYAxis(g) {
        var s = g.selection ? g.selection() : g;
        g.call(yAxis);
        s.select(".domain").remove();
        s.selectAll(".tick line").filter(Number).attr("stroke", "#777").attr("stroke-dasharray", "2,2");
        s.selectAll(".tick text").attr("x", 10).attr("dy", -4);
        // if (s !== g) g.selectAll(".tick text").attrTween("x", null).attrTween("dy", null);
      }

      var line = d3.line()
        .x(function(d) { return x(d.candidate) + 50})
        .y(function(d) { return y(d.positive) });

        // var tooltip = d3.tip()
        //  .attr('class', 'd3-tip')
        //  .offset([-10,0])
        //  .html(function(d) {
        //      return d.candidate + ": " + d.positive;
        //    })
        //  .attr("fill", "red");

           // svg.append('circle').attr('class', 'tiptarget');
           // svg.call(tooltip);

      svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "#cc0000")
            .attr("stroke-width", 2)
            .attr("d", line) ;


            var div = d3.select("body").append("div")
       .attr("class", "tooltip")
       .style("opacity", 0);

      svg.selectAll(".dot")
          .data(data)
          .enter().append("circle")
          .attr("classs", "dot")
          .attr("cx", function(d, i){
            return x(d.candidate) + 50;
          })
          .attr("cy", function(d,i){
            return y(d.positive);
          })
          .attr("r", 3)
          .attr("fill", "#cc0000")
          .on('mouseover, mousemove', function(d){
              d3.select(this)
                .attr("fill", "#f08080")
                .attr("r", 5);

              // var target = d3.select(targetElement + ' .tiptarget')
              // .attr('dx', d3.event.pageX + "px")
              // .attr('dy', d3.event.pageY + "px") // 5 pixels above the cursor
              // .node();
              // tooltip.show(d, target);
              //
              // console.log(d.candidate + ":" + d.positive);

              div.transition().style("opacity", .7);

              div.html(d.candidate + ": " + d.positive)
                  .style("left", (d3.event.pageX) + "px")
                  .style("top", (d3.event.pageY -28) + "px");
          })
          .on('mouseout', function(d,i){
            d3.select(this)
            .attr("fill", "#cc0000")
            .attr("r", 3);
            div.transition().style("opacity", 0);

            // tooltip.hide();
          });

}

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

function multiLineTemplate(data, targetElement) {

    var width = d3.select(targetElement).node().getBoundingClientRect().width;
    var height = width * 0.4;

    var xGrouping = d3.scaleBand()
        .domain(data.map(function(d) {
            return d.candidate;
        }))
        .rangeRound([0, ((width < 768) ?
            (height + 175 + ((newdata.length - 3) * 40)) :
            (width - margin.right))])
        .paddingInner(0.25)
        .paddingOuter(0.25);

    var xBar = d3.scaleBand()
        .domain(["negative", "positive"])
        .rangeRound([0, xGrouping.bandwidth()])
        .padding(0);


    var y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) {
            return d.positive;
        })])
        .range([height, 0])
        .nice();

    var xAxis = d3.axisBottom(xGrouping)
        .tickFormat(function(d) {
            return d;
        })
        .tickSize(0);

    var yAxis = d3.axisLeft(y)
        .ticks(7)
        .tickSize(-width);

    var colorscale = d3.scaleOrdinal()
        .domain(["negative", "positive"])
        .range(colors.procon);

    function customXAxis(g) {
        g.call(xAxis);
        g.select(".domain").remove();
    }

    function customYAxis(g) {
        var s = g.selection ? g.selection() : g;
        g.call(yAxis);
        s.select(".domain").remove();
        s.selectAll(".tick line").filter(Number).attr("stroke", "#777").attr("stroke-dasharray", "2,2");
        s.selectAll(".tick text").attr("x", 10).attr("dy", -4);
        // if (s !== g) g.selectAll(".tick text").attrTween("x", null).attrTween("dy", null);
    }

    // create container SVG
    var svg = d3.select(targetElement).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
        .attr("class", "xAxis")
        .attr("transform", "translate(0," + height + ")")
        .style("font-size", "14px")
        // .call(d3.axisBottom(xGrouping));
        .call(customXAxis);

    svg.append("g")
        // .call(d3.axisLeft(y));
        .attr("class", "yAxis")
        .style("font-size", "12px")
        .call(customYAxis);



    var line = d3.line()
      .x(function(d) { return xGrouping(d.candidate) + 50})
      .y(function(d) { return y(d.positive) });

  var line2 = d3.line()
    .x(function(d) { return xGrouping(d.candidate) + 50})
    .y(function(d) { return y(d.negative) });

    var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

      svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "#cc0000")
            .attr("stroke-width", 2)
            .attr("d", line);


        // svg.selectAll(".dot")
        //     .data(data)
        //     .enter().append("circle")
        //     .attr("class", "dot")
        //     .attr("cx", function(d,i){
        //       return xGrouping(d.candidate) + 50;
        //     })
        //     .attr("cy", function(d,i){
        //       return y(d.negative);
        //     })
        //     .attr("r", 3)
        //     .attr("fill", "#808080");
        //
        // svg.selectAll(".dot2")
        //     .data(data)
        //     .enter().append("circle2")
        //     .attr("class", "dot2")
        //     .attr("cx", function(d,i){
        //       return xGrouping(d.candidate) + 50;
        //     })
        //     .attr("cy", function(d,i){
        //       return y(d.negative);
        //     })
        //     .attr("r", 3)
        //     .attr("fill", "#cc0000");

    svg.append("path")
          .datum(data)
          .attr("fill", "none")
          .attr("stroke", "#808080")
          .attr("stroke-width", 2)
          .attr("d", line2);

          var fixeddot = svg.selectAll("dot")
                     .data(data)
                     .enter().append("circle")
                     .attr("r", 3)
                 var fixeddot2 = svg.selectAll("dot")
                     .data(data)
                     .enter().append("circle")
                     .attr("r", 3)


           fixeddot.attr("cx", function (d) {
                   return xGrouping(d.candidate) + 50;
               })
               .attr("cy", function (d) {
                   return y(d.positive);
               })
               .attr("fill", "#cc0000")
               .on('mouseover, mousemove', function(d){
                   d3.select(this)
                     .attr("fill", "#f08080")
                     .attr("r", 5);

                   // var target = d3.select(targetElement + ' .tiptarget')
                   // .attr('dx', d3.event.pageX + "px")
                   // .attr('dy', d3.event.pageY + "px") // 5 pixels above the cursor
                   // .node();
                   // tooltip.show(d, target);
                   //
                   // console.log(d.candidate + ":" + d.positive);

                   div.transition().style("opacity", .7);

                   div.html(d.candidate + ": " + d.positive)
                       .style("left", (d3.event.pageX) + "px")
                       .style("top", (d3.event.pageY -28) + "px");
               })
               .on('mouseout', function(d,i){
                 d3.select(this)
                 .attr("fill", "#cc0000")
                 .attr("r", 3);
                 div.transition().style("opacity", 0);

                 // tooltip.hide();
               });

               fixeddot2.attr("cx", function (d) {
                  return xGrouping(d.candidate) + 50;
              })
              .attr("cy", function (d) {
                  return y(d.negative);
              })
              .attr("fill", "#808080")
              .on('mouseover, mousemove', function(d){
                      d3.select(this)
                        .attr("fill", "#000")
                        .attr("r", 5);

                      // var target = d3.select(targetElement + ' .tiptarget')
                      // .attr('dx', d3.event.pageX + "px")
                      // .attr('dy', d3.event.pageY + "px") // 5 pixels above the cursor
                      // .node();
                      // tooltip.show(d, target);
                      //
                      // console.log(d.candidate + ":" + d.positive);

                      div.transition().style("opacity", .7);

                      div.html(d.candidate + ": " + d.negative)
                          .style("left", (d3.event.pageX) + "px")
                          .style("top", (d3.event.pageY -28) + "px");
                  })
                  .on('mouseout', function(d,i){
                    d3.select(this)
                    .attr("fill", "#808080")
                    .attr("r", 3);
                    div.transition().style("opacity", 0);

                    // tooltip.hide();
                  });;



}




var $ = jQuery;

( function( $ ) {
  var Neu = Neu || {};

  $.fn.scrollmagicControls = function(options) {
      return this.each(function() {
          var scrollmagicControls = Object.create(Neu.scrollmagicControls);
          scrollmagicControls.init(this, options);
      });
  };

  $.fn.scrollmagicControls.options = {
      pinned: ".pinned-content"
  };

  Neu.scrollmagicControls = {
      init: function(elem, options) {
          var self = this;
          self.$container = $(elem);
          self.options = $.extend({}, $.fn.scrollmagicControls.options, options);
          self.bindElements();
          self.bindEvents();

          $(document).ready( function() {
              self.triggerScrollMagic();
          });
      },
      bindElements: function() {
        var self = this;

        self.$pinned = self.$container.find(self.options.pinned);
        self.controller = new ScrollMagic.Controller({addIndicators: true});
    },
    bindEvents: function() {
      var self = this;
    },
    triggerScrollMagic: function() {
      var self = this;
      
      //if you want the same function to run for multiple slides you can use the function below. The for function goes through all slides with the class name "pinned-content" and adds a pinned scrollmagic slide for each.
      for (var i=0; i<self.$pinned.length; i++) {
  			var slide = self.$pinned[i];
        var duration;
      
        duration = $(slide).height();
      
  			new ScrollMagic.Scene({
					triggerElement: slide,
					duration: duration,
					triggerHook: 0,
					reverse: true
				})
				.setPin(slide)
        .on("enter leave", function(e) {
          //if you want something to happen on enter and/or leave, you can add it below. If it should only happen on enter then remove "leave" above.
      
          //the trigger is ".pinned-content"
          var trigger = this.triggerElement();
          var triggerClass = $(trigger).attr("class");
      
          if (e.type === "leave") {
            console.log("left slide: " + triggerClass);
          } else {
            console.log("entered slide: " + triggerClass);
          }
        })
				.addTo(self.controller);
  		}
      
      //if you want a function to only run for a specific slide, you can use the function below.
      var customScene = new ScrollMagic.Scene({
        triggerElement: "#customScene",
        duration: 1000,
        reverse: true
      })
      .setClassToggle("#customScene", "custom-active")
      .on("enter", function() {
        $(".box").animate({
          height: "300px",
          width: "400"
        });
      })
      .on("leave", function() {
        $(".box").animate({
          height: "150px",
          width: "200"
        });
      })
      .addTo(self.controller);
    }
  };

}( $ ) );

(function init () {
  $(document).ready(function() {
    $(".wrapper").scrollmagicControls();
  });
})();

d3.json("/interactive/2019/06/suffrage-100/data/data.json")
  .then(function(processedData) {
  var tikTok = new TikTok({
    dateFormat: ['MMM DD, YYYY', 'YYYY'],
    dateDisplay: 'MMMM DD, YYYY',
    groupByDisplay: 'YYYY[s]',
    el: 'tik-tok',
    title: 'Title',
    entries: processedData
  });
});

// create AP Style 
moment.updateLocale('en', {
    months : [
        'Jan.', 'Feb.', 'March', 'April', 'May', 'June',
        'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.',
    ]
});

var width = document.getElementById('vis').parentElement.offsetWidth;
var linear = vega.scale('linear');
var fontscale = linear().domain([300, 1000]).range([16, 22]);
var heightscale = linear().domain([300, 1000]).range([60, 120]);

var chartSpec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v3.0.json',
    width: width / 2,
    height: 400,
    title: 'Chart Title Goes Here',
    description: 'A simple bar chart with embedded data.',
    data: {url: '/interactive/2018/10/bubble/data/aggregated.json'},
    mark: 'bar',
    encoding: {
        x: {
            field: 'candidate',
            type: 'ordinal'
        },
        y: {
            field: 'polarity',
            type: 'quantitative'
        },
        color: {
            field: 'candidate',
            type: 'ordinal',
            legend: false,
            scale: {
              range: colors.bold
            }
        }
    },
    config: {
        axis: {
            labelFont: 'Akkurat',
            labelFontSize: 14,
            titleFont: 'Akkurat',
            titleFontSize: 18,
            titlePadding: 20
        },
        title: {
            font: 'Akkurat',
            fontSize: fontscale(width),
            fontWeight: 700,
            anchor: 'middle'
        },
        view: {stroke: 'transparent'}

    }
};
vegaEmbed('#vis', chartSpec, {actions:false, renderer:'svg'});
