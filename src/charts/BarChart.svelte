<script>
	import { onMount } from 'svelte';
	import { scaleLinear, scaleBand, scaleOrdinal } from 'd3-scale';
	import { axisLeft, axisRight, axisTop, axisBottom } from 'd3-axis';
	import { format } from 'd3-format';
	import { select } from 'd3-selection';
	import { vibrant } from '../helpers/colors.js'
	import { wrapLabel } from '../helpers/wrapLabel.js'

	let d3 = {
		scaleLinear: scaleLinear,
		scaleBand: scaleBand,
		scaleOrdinal: scaleOrdinal,
		select: select,
		axisLeft: axisLeft,
		axisRight: axisRight,
		axisBottom: axisBottom,
		axisTop: axisTop,
		format: format
	}

	let el;

	const padding = { top: 10, right: 0, bottom: 50, left: 50 };



	export let data = {data};
	export let width = {width};
	export let height = {height};
	export let xVar = {xVar};
	export let yVar = {yVar};
	export let yDomain = ([0, 100])
	export let colorscheme = vibrant;
	export let orientation = "vertical";

	if (Array.isArray(yVar)) {
		yVar = yVar
	} else {
		yVar = [yVar]
	}

	$: xScale = d3.scaleBand()
		.domain(data.map(function(o) { return o[xVar]; }))
		.rangeRound([0, width - padding.left - padding.right])
		.padding(0.2);

	$: yScale = d3.scaleLinear()
		.domain(yDomain)
		.range([height - padding.bottom, padding.top]);

	$: colorScale = d3.scaleOrdinal()
		.domain(data.map(function(o) { return o[xVar]; }))
		.range(colorscheme);

	onMount(generateBarChart);

	function generateBarChart() {
		if (orientation !== "vertical") {
			padding.top = 0;
			padding.left = 75;
			padding.right = 15;
			if (xVar === "protest") {
				padding.left = 180
			}
			xScale.rangeRound([padding.top, height - padding.bottom])
			yScale.range([0, width - padding.left - padding.right])
		}

		// draw chart SVG
		var svg = d3.select(el)
			.append("svg")
			.attr("width", width)
			.attr("height", height)
			.append("g")
			.attr("transform",
				  "translate(" + padding.left + "," + padding.top + ")");

		if (orientation !== "vertical") {
			// axes
			let axisLeft = svg.append("g")
			   .call(d3.axisLeft(xScale)
					.tickSizeInner(0)
					.tickSizeOuter(0)
					.tickPadding(5)
				)
				.call(g => g.select(".domain").remove());

			axisLeft.selectAll(".tick text")
				.call(wrapLabel, padding.left);

			let axisBottom = svg.append("g")
				.attr("transform", "translate(0," + (height-padding.bottom) + ")")
	  			.call(d3.axisBottom(yScale)
					.ticks(5)
					.tickSizeInner(-width)
					.tickSizeOuter(0)
					.tickPadding(3)

				)
				.call(g => g.select(".domain").remove())

			// add data points
			let length = yVar.length
			for (let v in yVar) {
				svg.append('g')
				    .selectAll("rect")
				    .data(data)
				    .enter()
				    .append("rect")
					 .attr("y", function (d) {
						 return xScale(d[xVar]) + ((xScale.bandwidth() / length) * v);
					 })
				    .attr("x", function (d) {
						 return 0;
					 })
					 .attr("height",
					 	xScale.bandwidth() / length
					)
					 .attr("width", function (d) {
						 return yScale(d[yVar[v]]);
					 })
					 .attr("fill", function(d){
						 return colorScale(d[xVar]);
					 });
			}

		} else {
			// axes
			let axisBottom = svg.append("g")
			   .attr("transform", "translate(0," + (height-padding.bottom) + ")")
			   .call(d3.axisBottom(xScale)
					.tickSizeInner(0)
					.tickSizeOuter(0)
					.tickPadding(5)
				)
				.call(g => g.select(".domain").remove());



			axisBottom.selectAll(".tick text")
				.call(wrapLabel, width/xScale.domain().length - 30)

			svg.append("g")
	  			.call(d3.axisLeft(yScale)
					.ticks(5)
					.tickSizeInner(-width)
					.tickSizeOuter(0)
					.tickPadding(3)

				)
				.call(g => g.select(".domain").remove());

			// add data points
			let length = yVar.length
			for (let v in yVar) {
				svg.append('g')
				    .selectAll("rect")
				    .data(data)
				    .enter()
				    .append("rect")
					 .attr("x", function (d) {
						 return xScale(d[xVar]) + ((xScale.bandwidth() / length) * v);
					 })
				    .attr("y", function (d) {
						 return yScale(d[yVar[v]]);
					 })
					 .attr("width",
					 	xScale.bandwidth() / length
					)
					 .attr("height", function (d) {
						 return height - padding.bottom - yScale(d[yVar[v]]);
					 })
					 .attr("fill", function(d){
						 return colorScale(d[xVar]);
					 });
			}
		} // if-else on vertical/horizontal

	} // generateBarChart
</script>

<style>
	.chart :global(g.tick line) {
		stroke: #ccc;
	}
</style>

<div bind:this={el} class="chart"></div>
