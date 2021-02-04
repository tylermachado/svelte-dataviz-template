<script>
import { onMount } from 'svelte';
import { scaleLinear, scaleBand, scaleTime, scaleOrdinal } from 'd3-scale';
import { axisLeft, axisRight, axisTop, axisBottom } from 'd3-axis';
import { line } from 'd3-shape';
import { path } from 'd3-path';
import { extent } from 'd3-array';
import { keys, values } from 'd3-collection';
import { select, selectAll } from 'd3-selection';
import { timeParse, timeFormat } from 'd3-time-format';
import { legendColor } from 'd3-svg-legend';
import { divergingbrownteal } from '../helpers/colors.js'

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
	keys: keys,
	values: values,
	timeParse: timeParse,
	timeFormat: timeFormat,
	path: path,
	legendColor: legendColor
}

let el;

const padding = { top: 35, right: 15, bottom: 40, left: 60 };

export let data = {data};
export let width = {width};
export let height = {height};
export let xVar = {xVar};
export let yGroups = {yGroups};
export let yDomain = {yDomain};
export let colorscheme = divergingbrownteal;

let lines = yGroups;
const parseTime = d3.timeParse("%m/%d/%y");

$: xScale = d3.scaleBand()
	.range([0, width - padding.left - padding.right]);

$: yScale = d3.scaleBand()
	.range([height - padding.bottom, padding.top]);

$: colors = d3.scaleLinear()
	.domain([0, 100, 200])
	.range(colorscheme)

onMount(generateGraphic);

function generateGraphic() {

	xScale.domain(d3.values(data).map(function(d) { return d[xVar]; }))
	yScale.domain(d3.keys(data[0]).filter(function(d) {return d !== xVar}))

	var svg = d3.select(el)
		.append("svg")
		.attr("width", width)
		.attr("height", (xScale.bandwidth() * yScale.domain().length) + padding.top)
		.append("g")
		.attr("transform",
		"translate(" + padding.left + "," + 0 + ")");

		// make columns
	let dates = svg.selectAll('g')
		.data(data)
		.enter()
		.append('g')
		.attr("class", "date");

		// space for side labels
	let labels = svg.append('g')

		// for each yGroup, create a square
	yScale.domain().forEach(function(mode,i) {
		dates
			.append('rect')
			.attr("x", 		function(d) { return xScale(d[xVar]) })
			.attr("width", xScale.bandwidth())
			.attr("y", 		(xScale.bandwidth() * i) + padding.top)
			.attr("height", xScale.bandwidth())
			.attr("fill", function(d) { return colors(d[mode]) })

		labels
			.append("text")
			.attr("x", 		-5)
			.attr("y", 		(xScale.bandwidth() * (i + 0.75))  + padding.top)
			.attr("text-anchor", "end")
			.attr("class", "label")
			.text(mode)
	})

		// labels for each column
	dates.append("text")
		.attr("x", 	function(d) { return xScale(d[xVar]) + 11 })
		.attr("y", 	padding.top + 6)
		.attr("transform", function(d) {
			return "rotate(-45 " + xScale(d[xVar]) + " " + padding.top + " )"
		})
		.attr("class", "label")
		.text(function(d) {return d[xVar]})





}
</script>

<style>
.chart :global(){
	display:inline;
	font-family: "akkurat", sans-serif
}

.chart :global(text.label) {
	text-transform:uppercase;
	font-size:10px
}


</style>


<div bind:this={el} class="chart"></div>
