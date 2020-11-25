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
// import { negativepositive } from '../helpers/colors.js'

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

const padding = { top: 5, right: 5, bottom: 40, left: 30 };

export let data = {data};
export let width = {width};
export let height = {height};
export let xVar = {xVar};
export let yGroups = {yGroups};
export let yDomain = {yDomain};
// export let colorscheme = {colorscheme};

let lines = yGroups;
const parseTime = d3.timeParse("%m/%d/%y");

$: xScale = d3.scaleBand()
	.range([0, width - padding.left - padding.right]);

$: yScale = d3.scaleBand()
	.range([height - padding.bottom, padding.top]);

$: colors = d3.scaleLinear()
	.domain([0, 100, 200])
	.range(['#a6611a','#f5f5f5','#018571'])

onMount(generateGraphic);

function generateGraphic() {
	xScale.domain(d3.values(data).map(function(d) { return d.date; }))
	yScale.domain(d3.keys(data[0]).filter(function(d) {return d !== "date"}))

	console.log(
		data
	)

	var svg = d3.select(el)
		.append("svg")
		.attr("width", width)
		.attr("height", height)
		.append("g")
		.attr("transform",
		"translate(" + padding.left + "," + 0 + ")");

	let dates = svg.selectAll('g')
		.data(data)
		.enter()
		.append('g')
		.attr("class", "date");

	yScale.domain().forEach(function(mode) {
		dates
			.append('rect')
			.attr("x", 		function(d) { return xScale(d.date) })
			.attr("width", xScale.bandwidth())
			.attr("y", 		yScale(mode))
			.attr("height", yScale.bandwidth())
			.attr("fill", function(d) { return colors(d[mode]) })
	})

	dates.selectAll("rect")
		.data(yScale.domain())
		.enter()
		.append('rect')
		.attr("x", 		0)
		.attr("width", xScale.bandwidth())
		.attr("y", 		function (d,i) { return yScale(d); })
		.attr("height", yScale.bandwidth())
		.attr("fill", "red")


		 // .selectAll("rect")
		 // .data(data)
		 // .enter()
		 // .data(datum)
		 // .append("rect")
		 // .attr("x", function (d) { console.log(d); return xScale(d); })
		 // .attr("y", function (d) { return yScale(d[xVar]); })
		 //
		 // .attr("height", yScale.bandwidth())
		 // .attr("width", function (d) { return xScale(d[yVar]); });

	// console.log(data)

	// let axisBottomRender = svg.append("g")
	// 	.attr("transform", "translate(0," + (height-padding.bottom) + ")")
	// 	.attr("class","horizontalAxis")
	// 	.call(d3.axisBottom(xScale)
	// 		.ticks(data.length)
	// 		.tickSize(0)
	// 		.tickFormat(d3.timeFormat("%m/%d/%y"))
	// 	);
	//
	// axisBottomRender.selectAll("path")
	// 	.attr("stroke", "#ccc")
	// 	.attr("transform", "translate(-0,0) scale(1.05 1)");
	//
	// axisBottomRender.selectAll("text")
	// 	.style("text-anchor", "end")
	// 	.attr("transform", ("rotate(-45)"))
	// 	.attr("dx", -2)
	// 	.attr("dy", 6)
	//
	//
	// let axisVerticalRender = svg.append("g")
	// 	.call(d3.axisLeft(yScale)
	// 	.ticks(4)
	// 	.tickSize(0)
	// 	.tickFormat(function(d,i){
	// 		if (yScale.domain()[1] <= 10) {
	// 			return d + '%'
	// 		} else {
	// 			return d
	// 		}
	//
	// 	}));
	//
	// axisVerticalRender.selectAll("path")
	// 	.attr("stroke", "#ccc");






}
</script>

<style>
.chart :global(){
	display:inline;
}


.chart :global(.legendCells .cell) {
	font-size:0.65rem;
	fill: #777;
	text-transform:uppercase;
}

.chart :global(.linetooltip) {
	display:none;
	position: absolute;
	background-color: white;
	border:2px solid black;
	border-radius:10px;
	padding: 10px;
	width:220px;
	font-size:1rem;
}

.chart :global(.linetooltip div) {
	margin-bottom:0.75rem;
}

.chart :global(.tipdate) {
	font-size:1.2rem;
	font-weight:bold;
	margin:0 auto 0.5rem;
}

.chart :global(.horizontalAxis .tick) {
	 visibility: hidden;
}

.chart :global(.horizontalAxis .tick:nth-child(2)),
.chart :global(.horizontalAxis .tick:last-child) {
	 visibility: visible;
}

/* @media screen and (max-width:600px) {
	.chart :global(.horizontalAxis .tick) {
		 visibility: hidden;
	}

	.chart :global(.horizontalAxis .tick:nth-last-child(4n+1)) {
		 visibility: visible;
	}
} */
</style>


<div bind:this={el} class="chart"></div>
