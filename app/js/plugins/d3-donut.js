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
