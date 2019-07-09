function barTemplate(data, targetElement) {

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

    // create container SVG
    var svg = d3.select(targetElement).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

    // create tooltip using d3-tip library
    var tooltip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10,0])
        .html(function(d) {
            return d.candidate + ": " + d.positive;
          });

    svg.append('circle').attr('class', 'tiptarget');
    svg.call(tooltip);

    // append the rectangles for the bar chart
    svg.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.candidate);})
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(d.positive); })
        .attr("height", function(d) { return height - y(d.positive); })
        .attr("fill", function(d,i) { return colors.bold[i]; })
        .on('mouseover, mousemove', function (d) {
            var target = d3.select(targetElement + ' .tiptarget')
                .attr('cx', d3.event.offsetX - 45)
                .attr('cy', d3.event.offsetY - 45) // 5 pixels above the cursor
                .node();
            tooltip.show(d, target);
        })
        .on('mouseout', tooltip.hide);

    // add the x Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // add the y Axis
    svg.append("g")
        .call(d3.axisLeft(y));
}
