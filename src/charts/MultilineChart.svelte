<script>
import { onMount } from 'svelte';
import { scaleLinear, scaleBand, scaleTime } from 'd3-scale';
import { axisLeft, axisRight, axisTop, axisBottom } from 'd3-axis';
import { line } from 'd3-shape';
import { path } from 'd3-path';
import { extent } from 'd3-array';
import { select, selectAll } from 'd3-selection';
import { timeParse, timeFormat } from 'd3-time-format';


let d3 = {
	scaleLinear: scaleLinear,
	scaleBand: scaleBand,
	scaleTime: scaleTime,
	select: select,
	selectAll: selectAll,
	axisLeft: axisLeft,
	axisRight: axisRight,
	axisBottom: axisBottom,
	axisTop: axisTop,
	line: line,
	extent: extent,
	timeParse: timeParse,
	timeFormat: timeFormat,
	path: path
}

let el;

const padding = { top: 10, right: 45, bottom: 40, left: 25 };
const backcolors = ["#841e77", "#02acac", "#d51e2d"]

export let  data = {data};
export let width = {width};
export let height = {height};
export let  title = {title};
export let xVar = {xVar};
export let lineA = {lineA};
export let lineB = {lineB};
export let lineC = {lineC};

let lines = [lineA, lineB, lineC];

$: xScale = d3.scaleBand()
    .domain(data.map(function(o) { return o[xVar]; }))
    .rangeRound([0, width - padding.left - padding.right])
    .padding(0.2);

$: yScale = d3.scaleLinear()
	.domain([0, 2400000])
	.range([height - padding.bottom, padding.top, 0]);


function plusminus(value) {
	if ((value-100) > 0) {
		return "+" + Math.round(value-100)
	} else if  ((value-100) == 0) {
		return Math.round(value-100)
	} else if ((value-100) < 0) {
		return Math.round(value-100)
	}
}

function generateAnno(value, type) {
	if (type == 0) {
		return "<tspan>" + plusminus(value) + "%</tspan>"
	} else if (type == 1) {
		return "<tspan>" + plusminus(value) + "%</tspan>"
	} else if (type == 2) {
		return "<tspan>" + plusminus(value) + "%</tspan>"
	}
}

function generateIcon(value, type) {
	if (type == 0) {
		return "\uf101"
	} else if (type == 1) {
		return "\uf102"
	} else if (type == 2) {
		return "\uf100"
	}
}

onMount(generateLineChart);
function generateLineChart() {
	xScale.domain(d3.extent(data, function(d) { return d[xVar]; }))
	var svg = d3.select(el)
		.append("svg")
		.attr("width", width)
		.attr("height", height)
		.append("g")
		.attr("transform",
			"translate(" + padding.left + "," + padding.top + ")"
		);
		// individual chart titles
	svg.append("text")
		.text(title)
		.attr("transform","translate(" + 10 + ",10)")
		.attr("text-anchor", "left")
		.attr("font-size", "14px")
		// add data lines
	svg.append("path")
		.datum(data)
		.attr("fill", "none")
		.attr("stroke", "#841e77")
		.attr("stroke-width", 1)
		.attr("d", d3.line()
			.x(function(d) { return xScale(d[xVar] )})
			.y(function(d) { return yScale(d[lineA])})
		)
	svg.append("path")
		.datum(data)
		.attr("fill", "none")
		.attr("stroke", "#02acac")
		.attr("stroke-width", 1)
		.attr("d", d3.line()
			.x(function(d) { return xScale(d[xVar] )})
			.y(function(d) { return yScale(d[lineB])})
		)
	svg.append("path")
		.datum(data)
		.attr("fill", "none")
		.attr("stroke", "#d51e2d")
		.attr("stroke-width", 1)
		.attr("d", d3.line()
			.x(function(d) { return xScale(d[xVar]) })
			.y(function(d) { return yScale(d[lineC])})
		)
		// add axes
	svg.append("g")
		.attr("transform", "translate(0," + (height-padding.bottom) + ")")
		.call(d3.axisBottom(xScale));

	svg.append("g")
		.call(d3.axisLeft(yScale));
		// line labels
	lines.forEach(function(l,i){
		let offset;
		if (
			(i < 2) &&
			((data[data.length-1][lines[i]] - data[data.length-1][lines[i-1]]) < 15) &&
			((data[data.length-1][lines[i]] - data[data.length-1][lines[i-1]]) > 0)
			)
		{
			offset = yScale(data[data.length-1][l]) - 15;
		}
		else if (
			(i < 2) &&
			((data[data.length-1][lines[i]] - data[data.length-1][lines[i+1]]) < 15) &&
			((data[data.length-1][lines[i]] - data[data.length-1][lines[i+1]]) > 0)
			)
		{
			offset = yScale(data[data.length-1][l]) - 15;
		}
		else
		{
			offset = yScale(data[data.length-1][l]);
		}
			// add line label squares
		let g = svg.append("g")
			.attr("transform", "translate(" + (xScale.range()[1]-2) + ", " + (offset-6) + ")")
		g.append("rect")
			.attr("width",40)
			.attr("height",12)
			.attr("fill", backcolors[i])
		g.append("text")
			.attr("class","linelabel")
			.attr("text-anchor", "start")
			.attr("fill", "white")
			.attr("x", 0)
			.attr("y", 9)
			.attr("font-size", "10px")
			.attr("font-family", "Flaticon")
			.text(generateIcon(data[data.length-1][l], i))
		g.append("text")
			.attr("class","linelabel")
			.attr("text-anchor", "end")
			.attr("fill", "white")
			.attr("x", 38)
			.attr("y", 9)
			.attr("font-size", "10px")
			.html(generateAnno(data[data.length-1][l], i))
	}) // lines ForEach
}

</script>
<style>
.chart :global(){
	display:inline;
}
.chart :global(path.domain) {
	stroke: #888;
}
</style>
<div bind:this={el} class="chart"></div>
