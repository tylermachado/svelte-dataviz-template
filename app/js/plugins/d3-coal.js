function coalTemplate(data, targetElement) {

    margin.left = 75;
    var width = d3.select(targetElement).node().getBoundingClientRect().width;
    var height = width * 0.4;

    // set the ranges
    var x = d3.scaleLinear()
        .domain([d3.min(data, function(d) { return d.polarity * 1.1; }), d3.max(data, function(d) { return d.polarity * 1.1; })])
        .range([0, width - margin.left - margin.right])
        .nice();

    var y = d3.scaleBand()
        .domain(data.map(function(d) { return d.candidate }))
        .range([0, height - margin.top - margin.bottom])
        .padding(0.4);

    // create container SVG
    var svg = d3.select(targetElement).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        // .attr("transform", "translate(" + ((width < 768) ? 10 : 120) + ",0)");
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    // bottom axis
    // svg.append("g")
    //     .attr("transform", "translate(0," + height + ")")
    //     .call(d3.axisBottom(x).ticks(0))
    //     .select(".domain").remove();

    // side axis
    svg.append("g")
        .call(d3.axisLeft(y).tickSize(0))
        .attr("transform", "translate(0,0)")
        .attr("text-anchor", ((width < 768) ? "start" : "end"))
        .select(".domain")
        .remove();

    // colorscale
    var colorscale = d3.scaleLinear()
        .domain(x.domain())
        .range(colors.procon)
        .interpolate(d3.interpolateHcl);

      // tooltip
    var tooltip = d3.tip()
        .attr('class', 'd3-tip')
        .direction('n')
        .html(function(d,i) {
          return "<h4>" + d.candidate + "</h4>" +
          d.polarity + " mentions";
        });

    // svg.append('circle').attr('id','tooltip_point' + questionid);
    svg.call(tooltip);

    // draw the horizontal grid lines
    svg
      .selectAll("lines")
      .data(data)
      .enter()
      .append("line")
        .attr("x1", x(x.domain()[0]))
        .attr("x2", x(x.domain()[1]))
        .attr("y1", function(d){return(y(d.candidate) + y.bandwidth()/2); })
        .attr("y2", function(d){return(y(d.candidate) + y.bandwidth()/2); })
        .attr("stroke", "#7d7d7d")
        .style("width", 40);

    // draw center line
    svg
      .append("line")
          .attr("x1", x(0))
          .attr("x2", x(0))
          .attr("y1", 0)
          .attr("y2", height - margin.bottom - margin.top)
          .attr("stroke", "#7d7d7d")
          .style("width", 40);

    // draw lower label
    svg
      .append("text")
          .attr("class","label")
          .attr("x", x(0))
          .attr("y", height - margin.bottom)
          .attr("text-anchor", "middle")
          .html("&#8592; | &#8594;");

    // draw the dots on the chart
    var datapts = svg
      .selectAll("indPoints")
      .data(data)
      .enter()
      .append("g")
      .attr("transform",function(d) {
              return "translate(" + x(d.polarity) + "," + (y(d.candidate) + (y.bandwidth()/2)) + ")";
      });

    datapts.append("text")
      .text(function(d){return d.demographic})
      .attr("font-size","10px")
      .attr("transform", function(d) {return "translate(8,-8), rotate(-35)" })
      .attr("fill","white");

    var jitterWidth = 20;
    datapts.append("circle")
      // .attr("cx", function(d){ return(x(d.remain - d.leave))})
      // .attr("cy", function(d){ return( y(d.group) + (y.bandwidth()/2)); })
      .attr("r", 8)
      .style("fill", function(d) { return colorscale(d.polarity); })
      .on('mouseover', tooltip.show)
      .on('mouseout', tooltip.hide);
}
