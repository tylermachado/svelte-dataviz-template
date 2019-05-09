// set the ranges
var x = d3.scaleBand()
  .range([0, width])
  .padding(0.33);

var y = d3.scaleLinear()
  .range([height, 0]);

var svg = d3.select(".wrapper").append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
  "translate(" + margin.left + "," + margin.top + ")");

d3.json('/interactive/2018/10/bubble/data/sportstitles.json')
      .then(function(data) {


            data = data.filter(function(d) { return d.gender == "men"; });
          console.log(data);




          // Scale the range of the data in the domains
        x.domain(data.map(function(d) { return d.sport; }));
        y.domain([0, d3.max(data, function(d) { return d.championships; })]);

        // append the rectangles for the bar chart
        svg.selectAll(".bar")
            .data(data)
          .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.sport);})
            .attr("width", x.bandwidth())
            .attr("y", function(d) { return y(d.championships); })
            .attr("height", function(d) { return height - y(d.championships); });

        // add the x Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // add the y Axis
        svg.append("g")
            .call(d3.axisLeft(y));


      }) //read-in function
      .catch(function(error){
         // handle error
      });
