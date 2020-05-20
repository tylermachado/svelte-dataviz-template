<script>
	import { onMount } from 'svelte';
	import * as d3 from 'd3';

	export let data = [
		{"City Population": 1000, "Parkland per 1,000 Residents": 8},
		{"City Population": 800, "Parkland per 1,000 Residents": 9},
		{"City Population": 933, "Parkland per 1,000 Residents": 6.5}
	];
	let el;

	let svg;
	let width = 500;
	let height = 600;

	const padding = { top: 20, right: 40, bottom: 40, left: 25 };

	$: xScale = d3.scaleLinear()
		.domain([200000, Math.max.apply(Math, data.map(function(o) { return o["City Population"]; }))])
		.range([0, width]);

	$: yScale = d3.scaleLinear()
		.domain([0.5, Math.max.apply(Math, data.map(function(o) { return o["Parkland per 1,000 Residents"]; }))])
		.range([height, padding.top]);

	$: xTicks = width > 180 ?
		[0, 4, 8, 12, 16, 20] :
		[0, 10, 20];

	$: yTicks = height > 180 ?
		[0, 2, 4, 6, 8, 10, 12] :
		[0, 4, 8, 12];

	$: d3yScale = d3.scaleLinear()
		.domain([0, height])
		.range([height, 0]);

	onMount(generateScatter);

	function generateScatter() {
		console.log(data);

		var svg = d3.select(el)
			.append("svg")
			.attr("width", width + padding.left + padding.right)
			.attr("height", height + padding.top + padding.bottom)
			.append("g")
			.attr("transform",
				  "translate(" + padding.left + "," + padding.top + ")");

		svg.append("g")
		   .attr("transform", "translate(0," + height + ")")
		   .call(d3.axisBottom(xScale));

		svg.append("g")
  			.call(d3.axisLeft(yScale));

		svg.append('g')
	    .selectAll("dot")
	    .data(data)
	    .enter()
	    .append("circle")
	      .attr("cx", function (d) { return xScale(d["City Population"]); } )
	      .attr("cy", function (d) { return yScale(d["Parkland per 1,000 Residents"]); } )
	      .attr("r", 6)
	      .style("fill", "#69b3a2")
	}
</script>

<style>
	.chart :global(div) {
		font: 10px sans-serif;
		background-color: steelblue;
		text-align: right;
		padding: 3px;
		margin: 1px;
		color: white;
	}
</style>

<div bind:this={el} class="chart"></div>
