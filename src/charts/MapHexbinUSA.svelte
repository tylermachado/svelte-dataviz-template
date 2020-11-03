<script>
	import { onMount } from 'svelte';
	import { scaleLinear, scaleLog, scaleOrdinal } from 'd3-scale';
	import { axisLeft, axisRight, axisTop, axisBottom } from 'd3-axis';
	import { geoMercator, geoPath } from 'd3-geo';
	import { select } from 'd3-selection';
   import statehex from "../helpers/USStateHexbin.js";

	let d3 = {
		scaleLinear: scaleLinear,
		scaleOrdinal: scaleOrdinal,
		scaleLog: scaleLog,
		select: select,
		axisLeft: axisLeft,
		axisRight: axisRight,
		axisBottom: axisBottom,
		axisTop: axisTop,
		geoMercator: geoMercator,
		geoPath: geoPath
	}

	export let data = {data};
	export let width = {width};
	export let height = {height};
	export let xVar = {xVar};
	export let yVar = {yVar};

	let el;

	let colorScale = d3.scaleOrdinal()
		.domain(["Democrats", "Republicans"])
		.range(["#006EB5", "#D41B2C"]);


	const padding = { top: 10, right: 40, bottom: 40, left: 50 };

	const projection = d3.geoMercator()
		.scale(width * 0.83)
		.translate([(width * 2), (height * 1.465)]);

	const path = d3.geoPath()
		.projection(projection);


	onMount(generateMap);

	function generateMap() {

		console.log(data);

		let svg = d3.select(el).append("svg");

		svg
			.attr("width", width)
			.attr("height", height);

		svg.append("g")
      .selectAll("path")
      .data(statehex.features)
      .enter()
      .append("path")
          .attr("fill", function(d){
				 let result = data.filter(obj => {
					 return obj.state === d.properties.fullname
				 })[0]
				 if (result) {
					 console.log(result.winner)
					return colorScale(result.winner)
				 } else {
				 	return "gray"
				 }

			 })
          .attr("d", path)
          .attr("stroke", "white")

			 console.log(statehex.features)

	  // Add the labels
	  svg.append("g")
	      .selectAll("labels")
	      .data(statehex.features)
	      .enter()
	      .append("text")
	        .attr("x", function(d){return path.centroid(d)[0]})
	        .attr("y", function(d){return path.centroid(d)[1]})
	        .text(function(d){ return d.properties.postalcode})
	        .attr("text-anchor", "middle")
	        .attr("alignment-baseline", "central")
	        .style("font-size", 11)
	        .style("fill", "white")
	}
</script>

<style>
	.chart :global(circle)  {
		fill: #d51e2d;
	}
</style>

<div bind:this={el} class="chart"></div>
