function groupedBarTemplate(data, targetElement) {

    var width = d3.select(targetElement).node().getBoundingClientRect().width;
    var height = width * 0.4;

    // this is to ensure that charts with fewer variables have extra breathing space between groups, instead of comically wide data bars
    var groupPadScale = d3.scaleLinear()
        .domain([7,2])
        .range([0.2, 0.35]);

    // set the ranges
    var xGrouping = d3.scaleBand()
        .domain(data.map(function(d) {return d.candidate; }))
        .rangeRound([0, ((width < 768) ?
            (height + 175 + ((newdata.length-3) * 40)) :
            (width-margin.right))])
        .paddingInner(0.25)
        .paddingOuter(0.25);

    var xBar = d3.scaleBand()
        .domain(["negative", "positive"])
        .rangeRound([0, xGrouping.bandwidth()])
        .padding(0);

    var y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return d.positive; })])
        .range([height, 0])
        .nice();

    var colorscale = d3.scaleOrdinal()
        .domain(["negative", "positive"])
        .range(colors.procon);

    // create container SVG
    var svg = d3.select(targetElement).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

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
      var tooltip = d3.tip()
          .attr('class', 'd3-tip')
          .offset([-10,0])
          .html(function(d) {
              return d.candidate + ": " + d.negative+ ", " + d.positive;
            });

      svg.append('circle').attr('class', 'tiptarget');
      svg.call(tooltip);


      svg.append("g")
          .selectAll("g")
          .data(data)
          .join("g")
            .attr("transform", function(d) { return 'translate(' + xGrouping(d.candidate) + ',0)'; })
            .attr("class", function(d) {return d.candidate;})
            .on('mouseover, mousemove', function (d) {
                var target = d3.select(targetElement + ' .tiptarget')
                    .attr('cx', d3.event.offsetX - 45)
                    .attr('cy', d3.event.offsetY - 45) // 5 pixels above the cursor
                    .node();
                tooltip.show(d, target);
            })
            .on('mouseout', tooltip.hide)
          .selectAll("rect")
          .data(function(d) {
              console.log(d3.entries(d).filter(function(dd) { return dd.key == "negative" || dd.key == "positive"; }));
              return d3.entries(d).filter(function(dd) { return dd.key == "negative" || dd.key == "positive"; });
          })
          .join("rect")
        .attr("x", function(d) { return xBar(d.key); })
        .attr("y", function(d) { return y(d.value); })
        .attr("width", xBar.bandwidth())
        .attr("height", function(d) { return y(0) - y(d.value); })
        .attr("fill", function(d) { return colorscale(d.key); });


          // axes
      svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(xGrouping));

      svg.append("g")
          .call(d3.axisLeft(y));

}
