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
