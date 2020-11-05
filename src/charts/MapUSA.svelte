<script>
	import { onMount } from 'svelte';
	import { scaleLinear, scaleLog, scaleOrdinal } from 'd3-scale';
	import { axisLeft, axisRight, axisTop, axisBottom } from 'd3-axis';
	import { geoAlbersUsa, geoMercator, geoPath } from 'd3-geo';
	import { legendColor } from 'd3-svg-legend';
	import { select } from 'd3-selection';
	import { transition } from 'd3-transition'
   import usaalbers from "../helpers/USAGeoAlbers.js";
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
		geoAlbersUsa: geoAlbersUsa,
		geoMercator: geoMercator,
		geoPath: geoPath,
		legendColor: legendColor
	}

	export let data = {data};
	export let width = {width};
	export let maptype = {maptype};
	export let height = width * 0.67;

	let el;

	console.log(statehex);
	console.log(usaalbers);

	let geojson;
	let projection;


	if (maptype === "hex") {
		geojson = statehex;
		projection = d3.geoMercator()
			.scale(width * 0.83)
			.translate([(width * 2), (height * 1.465)]);
	} else {
		geojson = usaalbers;
		projection = d3.geoAlbersUsa()
			.scale(width * 1.3)
			.translate([(width / 2), (height / 2)]);
	}


	let labelSize = d3.scaleLinear()
		.domain([250, 1000])
		.range([7, 12])

	let colorScale = d3.scaleOrdinal()
		.domain(["111", "011", "010", "001", "000"])
		.range(['#006d2c', '#74c28c', '#e8c83c', '#7099ff', '#dbdbdb'])
		// .range(['#006d2c','#2ca25f','#66c2a4','#b2e2e2','#edf8fb']);


	const padding = { top: 10, right: 40, bottom: 40, left: 50 };

	const path = d3.geoPath()
		.projection(projection);


	onMount(generateMap);

	function generateMap() {

		console.log(geojson.features)

		let svg = d3.select(el).append("svg");

		svg
			.attr("width", width)
			.attr("height", height);

		svg.append("g")
      .selectAll("path")
      .data(geojson.features)
      .enter()
      .append("path")
          .attr("fill", function(d){
				 let result = data.filter(obj => {
					 return obj.state === d.properties.name
				 })[0]
				 if (result) {
					return colorScale(result.combined.toString())
				 } else {
				 	return "gray"
				 }
			 })
          .attr("d", path)
          .attr("stroke", "#fff")
			 .attr("stroke-width", width/1200)



	  // Add the labels
	  if (maptype === "hex") {
		  svg.append("g")
   	      .selectAll("labels")
   	      .data(geojson.features)
   	      .enter()
   	      .append("text")
   	        .attr("x", function(d){return path.centroid(d)[0]})
   	        .attr("y", function(d){return path.centroid(d)[1]})
   	        .text(function(d){ return d.properties.postalcode})
   	        .attr("text-anchor", "middle")
   	        .attr("alignment-baseline", "central")
   	        .style("font-size", labelSize(width))
   	        .style("fill", function(d){
    				 let result = data.filter(obj => {
    					 return obj.state === d.properties.name
    				 })[0]
    				 if (result.combined.toString() === "000") {
    					return "#aaa"
    				 } else {
    				 	return "#fff"
    				 }
    			 })
	  }


		const legend = d3.legendColor()
			.scale(colorScale)
			.labels(["Legal for recreational use","Legal for medical use/decriminalized","Decriminalized","Legal for medical use","No legalization"]);

		const legendContainer = d3.select(el).append("svg")
			.attr("width", width-25)
			.attr("height", 100)
			.attr("class","legendContainer")

		if (width > 600) {
			legend
				.orient("horizontal")
				.shapePadding((width-75)/5)
				.labelWrap(130)

			legendContainer.append("g")
				.attr("transform", "translate(60,0)")
				.call(legend)
		} else {
			legend
				.orient("vertical")
				// .shapePadding((width-75)/5)
				// .labelWrap(130)

			legendContainer.append("g")
				.attr("transform", "translate(" + ((width-300)/2) + ",0)")
				.call(legend)
		}






	}
</script>

<style>
	.chart :global(circle)  {
		fill: #d51e2d;
	}

	:global(svg g text.label) {
		text-transform: uppercase;
		fill: #666;
		font-size:11px;
	}
</style>

<div bind:this={el} class="chart"></div>
