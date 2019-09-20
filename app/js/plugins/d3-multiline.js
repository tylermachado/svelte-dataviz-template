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
