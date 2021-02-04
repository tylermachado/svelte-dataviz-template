<script>
	import { onMount } from 'svelte';
	import { scaleLinear, scaleBand, scaleOrdinal } from 'd3-scale';
	import { axisLeft, axisRight, axisTop, axisBottom } from 'd3-axis';
	import { select } from 'd3-selection';
	import { format } from 'd3-format';
	import { wrapLabel } from '../helpers/wrapLabel.js'
	import { vibrant } from '../helpers/colors.js'

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

	const padding = { top: 10, right: 0, bottom: 100, left: 30 };



	export let data = {data};
	export let width = {width};
	export let height = {height};
	export let xVar = {xVar};
	export let yVar = {yVar};
	export let yDomain = ([0, 100])
	export let colorscheme = vibrant;

	if (Array.isArray(yVar)) {
		yVar = yVar
	} else {
		yVar = [yVar]
	}

	$: xScale = d3.scaleBand()
		.domain(data.map(function(o) { return o[xVar]; }))
		.rangeRound([0, width - padding.left - padding.right])
		.padding(0.9);

	$: yScale = d3.scaleLinear()
		.domain(yDomain)
		.range([height - padding.bottom, padding.top]);

	$: colorScale = d3.scaleOrdinal()
		.domain(data.map(function(o) { return o[xVar]; }))
		.range(colorscheme);

	onMount(generateChart);

	function generateChart() {
		// draw chart SVG
		var svg = d3.select(el)
			.append("svg")
			.attr("width", width)
			.attr("height", height)
			.append("g")
			.attr("transform",
				  "translate(" + padding.left + "," + padding.top + ")");


		// axes
		let axisBottom = svg.append("g")
		   .attr("transform", "translate(0," + (height-padding.bottom) + ")")
		   .call(d3.axisBottom(xScale)
				.tickSizeInner(0)
				.tickSizeOuter(0)
				.tickPadding(5)
			)
			.call(g => g.select(".domain").remove())

		if (width > 600) {
			axisBottom.selectAll(".tick text")
		      .call(wrapLabel, width/xScale.domain().length - 15);
		} else {
			axisBottom.selectAll(".tick text")
				.attr("text-anchor", "end")
				.attr("transform", "rotate(-90) translate(-3 -10)")
				.call(wrapLabel, 100);
		}

		svg.append("g")
  			.call(d3.axisLeft(yScale)
				.ticks(10)
				.tickSizeInner(-width)
				.tickSizeOuter(0)
				.tickPadding(3)
				// .tickFormat(d3.format(".0%"))
			)
			.call(g => g.select(".domain").remove());



			// add data points
			let length = yVar.length
			for (let v in yVar) {
				let datapoint = svg.append('g')
				    .selectAll("g")
				    .data(data)
				    .enter()
				    .append("g");

				datapoint.append("rect")
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

				datapoint.append("circle")
					 .attr("r", 25)
					 .attr("cx", function (d) {
						 return xScale(d[xVar]) + (xScale.bandwidth() / 2);
					 })
				    .attr("cy", function (d) {
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

				datapoint.append("text")
					.text(function(d) {
						return d[yVar[v]];
					})
					.attr("fill", "white")
					.attr("text-anchor", "middle")
					.attr("x", function (d) {
						return xScale(d[xVar]) + (xScale.bandwidth() / 2);
					})
					.attr("y", function (d) {
						return yScale(d[yVar[v]]) + 6;
					})
					.attr("class", "datalabel")
			}

	} // generateChart
</script>

<style>
	.chart :global(g.tick line) {
		stroke: #ccc;
	}

	.chart :global(text.datalabel) {
		fill: #fff;
		font-family:"akkurat",Arial,sans-serif;
		letter-spacing:-0.05rem;
	}
</style>

<div bind:this={el} class="chart"></div>
