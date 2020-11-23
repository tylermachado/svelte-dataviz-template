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
let campusstats = false;
const parseTime = d3.timeParse("%m/%d/%y");


if (lines[0].indexOf("Campus") > -1) {
	data = data.filter(function(d,i){
		return parseTime(d["Date"]) >= parseTime("9/7/20")
	})
	campusstats = true;
	padding.right = 60;
}

$: xScale = d3.scaleTime()
	.range([0, width - padding.left - padding.right]);

$: yScale = d3.scaleLinear()
	.range([height - padding.bottom, padding.top]);

$: colors = d3.scaleOrdinal()
	.domain(lines)
	.range(["red","green","blue"])

onMount(generateLineChart);

function generateLineChart() {
	xScale.domain(d3.extent(data, function(d) { return parseTime(d[xVar]) }))
	yScale.domain(yDomain)

	var tooltip = d3.select(el)
		.append("div")
		.style("opacity", 0)
		.attr("class", "linetooltip")

	var mouseover = function(d) {
		tooltip
			.style("opacity", 1)
	}

	var mousemove = function(d) {
		let mouseaccess = Math.round(xScale.invert(d3.mouse(this)[0]))
		let mousedate = new Date(mouseaccess);
		let findDate = ((mousedate.getMonth()+1) + "/" + (mousedate.getDate()) + "/" + (mousedate.getYear()-100))

		let thisDate = data.filter(function(d) {
			return d["Date"] == findDate
		})

		if (thisDate.length > 0) {
			tooltip
				.html(
					"<div class='tipdate'>" + thisDate[0]["Date"] + "</div>"
				)
				.style("left", (d3.mouse(this)[0] + document.getElementById('covid-testing-dashboard').offsetLeft - 100) + "px")
				.style("top", (d3.mouse(this)[1] + document.getElementById('covid-testing-dashboard').offsetTop + 600) + "px")
				.style("opacity", 1)
				.style("display", "block");

			// focusA
			// 	.attr("cx", xScale(parseTime(thisDate[0]["Date"])))
			// 	.attr("cy", yScale(parseFloat(thisDate[0][lineA])))
			// 	.attr("opacity", 1);
			//
			// focusB
			// 	.attr("cx", xScale(parseTime(thisDate[0]["Date"])))
			// 	.attr("cy", yScale(parseFloat(thisDate[0][lineB])))
			// 	.attr("opacity", 1);
		}

	}

	var mouseleave = function(d) {
		tooltip
			.style("opacity", 0)

		d3.selectAll(".focuscircle")
			.attr("opacity", 0)
	}


	var svg = d3.select(el)
		.append("svg")
		.attr("width", width)
		.attr("height", height)
		.append("g")
		.attr("transform",
		"translate(" + padding.left + "," + 0 + ")");

	let axisBottomRender = svg.append("g")
		.attr("transform", "translate(0," + (height-padding.bottom) + ")")
		.attr("class","horizontalAxis")
		.call(d3.axisBottom(xScale)
			.ticks(data.length)
			.tickSize(0)
			.tickFormat(d3.timeFormat("%m/%d/%y"))
		);

	axisBottomRender.selectAll("path")
		.attr("stroke", "#ccc")
		.attr("transform", "translate(-0,0) scale(1.05 1)");

	axisBottomRender.selectAll("text")
		.style("text-anchor", "end")
		.attr("transform", ("rotate(-45)"))
		.attr("dx", -2)
		.attr("dy", 6)


	let axisVerticalRender = svg.append("g")
		.call(d3.axisLeft(yScale)
		.ticks(4)
		.tickSize(0)
		.tickFormat(function(d,i){
			if (yScale.domain()[1] <= 10) {
				return d + '%'
			} else {
				return d
			}

		}));

	axisVerticalRender.selectAll("path")
		.attr("stroke", "#ccc");




	// add data lines
	for (let l in lines) {
		let category = lines[l];
		svg.append("path")
			.datum(data)
			.attr("fill", "none")
			.attr("stroke", colors(category))
			.attr("stroke-width", 2.3)
			.attr("d", d3.line()
			.x(function(d) { return xScale(parseTime(d[xVar])) })
			.y(function(d) { return yScale(parseFloat(d[category]))}));
	}


	var focusA = svg.append("circle")
	.attr("class", "focuscircle")
	.attr("opacity", 0)
	.attr("fill", "#D41B2C")
	.attr("r", 5.5)
	.attr("cx", 1)
	.attr("cy", 1);

// svg.append("path")
// .datum(data)
// .attr("fill", "none")
// .attr("stroke", "#333")
// .attr("stroke-width", 3)
// .attr("d", d3.line()
// .x(function(d) { return xScale(parseTime(d[xVar])) })
// .y(function(d) { return yScale(parseFloat(d[lineB]))})
// );
//
// var focusB = svg.append("circle")
// .attr("class", "focuscircle")
// .attr("opacity", 0)
// .attr("fill", "#333")
// .attr("r", 5.5)
// .attr("cx", 1)
// .attr("cy", 1);





var tooltipgrid = svg.append("rect")
.attr("class","tooltip-grid")
.attr("width", width)
.attr("height", height)
.attr("opacity", 0)
.on("mouseover", mouseover)
.on("mousemove", mousemove)
.on("mouseleave", mouseleave)



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

		// add line label squares
		if (campusstats) {
			let g = svg.append("g")
				.attr("transform", "translate(" + (xScale.range()[1]) + ", " + (offset-6) + ")")

			g.append("rect")
				.attr("width",56)
				.attr("height",12)
				.attr("fill", colorscheme[i])

			g.append("text")
				.attr("class","linelabel")
				.attr("text-anchor", "middle")
				.attr("fill", "white")
				.attr("x", 28)
				.attr("y", 9)
				.attr("font-size", "9px")
				.html(["ON CAMPUS","OFF CAMPUS"][i])
		}

}) // lines ForEach

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
