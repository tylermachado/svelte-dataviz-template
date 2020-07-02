<script>
	import { onMount } from 'svelte';
	import { scaleLinear, scaleBand } from 'd3-scale';
	import { axisLeft, axisRight, axisTop, axisBottom } from 'd3-axis';
	import { select } from 'd3-selection';

	let d3 = {
		scaleLinear: scaleLinear,
		scaleBand: scaleBand,
		select: select,
		axisLeft: axisLeft,
		axisRight: axisRight,
		axisBottom: axisBottom,
		axisTop: axisTop
	}

	let el;

	const padding = { top: 10, right: 40, bottom: 40, left: 50 };


		export let data = {data};
		export let width = {width};
		export let height = {height};
		export let xVar = {xVar};
		export let yVar = {yVar};

	$: xScale = d3.scaleBand()
		.domain(data.map(function(o) { return o[xVar]; }))
		.rangeRound([0, width - padding.left - padding.right])
		.padding(0.2);

	$: yScale = d3.scaleLinear()
		.domain([0, Math.max.apply(Math, data.map(function(o) { return o[yVar]; }))])
		.range([height - padding.bottom, padding.top]);

	onMount(generateBarChart);

	function generateBarChart() {
		console.log(data)

		var svg = d3.select(el)
			.append("svg")
			.attr("width", width)
			.attr("height", height)
			.append("g")
			.attr("transform",
				  "translate(" + padding.left + "," + padding.top + ")");

		svg.append("g")
		   .attr("transform", "translate(0," + (height-padding.bottom) + ")")
		   .call(d3.axisBottom(xScale));

		svg.append("g")
  			.call(d3.axisLeft(yScale));

		svg.append('g')
	    .selectAll("rect")
	    .data(data)
	    .enter()
	    .append("rect")
		 .attr("x", function (d) { return xScale(d[xVar]); })
	    .attr("y", function (d) { return yScale(d[yVar]); })
		 .attr("width", xScale.bandwidth())
		 .attr("height", function (d) { return height - padding.bottom - yScale(d[yVar]); });
	}
</script>

<style>
	.chart :global(rect) {
		fill: #d51e2d;
	}
</style>

<div bind:this={el} class="chart"></div>
