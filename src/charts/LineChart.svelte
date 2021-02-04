<script>
import { onMount } from 'svelte';
import { scaleLinear, scaleBand, scaleTime, scaleOrdinal } from 'd3-scale';
import { axisLeft, axisRight, axisTop, axisBottom } from 'd3-axis';
import { line } from 'd3-shape';
import { path } from 'd3-path';
import { extent } from 'd3-array';
import { select, selectAll } from 'd3-selection';
import { timeParse, timeFormat } from 'd3-time-format';
import { legendColor } from 'd3-svg-legend';
import { vibrant } from '../helpers/colors.js'

let d3 = {
	scaleLinear: scaleLinear,
	scaleBand: scaleBand,
	scaleTime: scaleTime,
	scaleOrdinal: scaleOrdinal,
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
	path: path,
	legendColor: legendColor
}

let el;

const padding = { top: 5, right: 5, bottom: 40, left: 30 };

export let data = {data};
export let width = {width};
export let height = {height};
export let xVar = {xVar};
export let yGroups = {yGroups};
export let yDomain = {yDomain};
export let colorscheme = vibrant;

let lines;
if (Array.isArray(yGroups)) {
	lines = yGroups
} else {
	lines = [yGroups]
}

const parseTime = d3.timeParse("%m/%d/%y");

$: xScale = d3.scaleTime()
	.range([0, width - padding.left - padding.right]);

$: yScale = d3.scaleLinear()
	.range([height - padding.bottom, padding.top]);

$: colors = d3.scaleOrdinal()
	.domain(lines)
	.range(colorscheme)

onMount(generateLineChart);

function generateLineChart() {
	xScale.domain(d3.extent(data, function(d) { return parseTime(d[xVar]) }))
	yScale.domain(yDomain)

	var svg = d3.select(el)
		.append("svg")
		.attr("width", width)
		.attr("height", height)
		.append("g")
		.attr("transform",
		"translate(" + padding.left + "," + 0 + ")");

		svg.append("g")
	   	.attr("transform", "translate(0," + (height-padding.bottom) + ")")
	   	.call(d3.axisBottom(xScale)
			  .tickFormat(d3.timeFormat('%b %e'))
	   	  .tickSizeInner(5)
	   	  .tickSizeOuter(0)
	   	  .tickPadding(5)
	     )
	     .call(g => g.select(".domain").remove())
	     .call(g => g.selectAll(".tick text").attr("text-anchor","end").attr("transform","rotate(-40 -8 8)"));

	   svg.append("g")
	   	.call(d3.axisLeft(yScale)
	   	  .ticks(10)
	   	  .tickSizeInner(-width)
	   	  .tickSizeOuter(0)
	   	  .tickPadding(3)
	     )
	     .call(g => g.select(".domain").remove());




	// add data lines
	for (let l in lines) {
		let category = lines[l];
		svg.append("path")
			.datum(data)
			.attr("fill", "none")
			.attr("stroke", colors(category))
			.attr("stroke-width", 3)
			.attr("d", d3.line()
			.x(function(d) { return xScale(parseTime(d[xVar])) })
			.y(function(d) { return yScale(parseFloat(d[category]))}));
	}



// line labels
lines.forEach(function(l,i){
	let offset = 6;

	if (
		(i == 1) &&
		((data[data.length-1][lines[i]] - data[data.length-1][lines[i-1]]) < 40)
		)
	{
		offset = yScale(data[data.length-1][l]) - 5;
	}
	else if (
		(i == 1) &&
		((data[data.length-1][lines[i-1]] - data[data.length-1][lines[i]]) < 40) &&
		((data[data.length-1][lines[i-1]] - data[data.length-1][lines[i]]) > 0)
		)
	{
		offset = yScale(data[data.length-1][l]) + 5;
	}
	else
	{
		offset = yScale(data[data.length-1][l]);
	}

}) // lines ForEach

}
</script>

<style>
	.chart :global(g.tick line) {
		stroke: #ccc;
	}
</style>


<div bind:this={el} class="chart"></div>
