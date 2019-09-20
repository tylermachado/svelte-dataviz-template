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
