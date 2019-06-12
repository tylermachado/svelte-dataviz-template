var stack, series, categories;
var countries = ["can", "uk", "us"];

function barstack(questionid, data) {
    var svg = d3.select("#vis" + questionid).append("svg")
        .attr("width", width)
        .attr("height", height);

    var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleLinear()
        .rangeRound([0, (width-margin.left-margin.right)]);

    var y = d3.scaleBand()
        .rangeRound([0, (height-margin.top-margin.bottom)])
        .paddingInner(0.3)
        .align(0);

    var z = d3.scaleLinear()
        .range(["#ce0201", "#ddd", "#4dac26"])
        .interpolate(d3.interpolateCubehelix);

    var newdata = [];

    countries.forEach(function(c) {
        var n = {};
        n.country = c;
        data[questionid][1].forEach(function(a) {
            n[a.answer] = a[c + "_pct"];
        });
        newdata.push(n);
    });

    console.log(newdata);

    categories = d3.keys(newdata[0]).filter(function(d) { return d !== "Total" && d !== "country"; }).sort();

    stack = d3.stack()
    .keys(categories)
    .order(d3.stackOrderNone)
    .offset(d3.stackOffsetNone);

    series = stack(newdata);

    x.domain([0,100]);
    y.domain(newdata.map(function(d) {return d.country;}));
    z.domain([0, (categories.length-1)/2, categories.length-1]);

    g.append("g")
        .selectAll("g")
        .data(d3.stack().keys(categories)(newdata))
        .enter().append("g")
          .attr("fill", function(d,i) { return z(i); })
        .selectAll("rect")
        .data(function(d) { return d; })
        .enter().append("rect")
          .attr("y", function(d) { return y(d.data.country); })
          .attr("x", function(d) { return x(d[0]); })
          .attr("width", function(d) { return x(d[1]) - x(d[0]); })
          .attr("height", y.bandwidth());
}

d3.json('/interactive/2019/06/gallup/data/countrylevel.json').then(function(data) {

    data = Array.from(d3.group(data, function(d) { return d.question_id; }));
    data.unshift("zero-index placeholder");

    barstack(16, data);
});
