<script>
	import { onMount } from 'svelte';
	import { extent } from 'd3-array';
	import { scaleLinear, scaleLog, scaleOrdinal } from 'd3-scale';
	import { axisLeft, axisRight, axisTop, axisBottom } from 'd3-axis';
	import { geoAlbersUsa, geoMercator, geoPath } from 'd3-geo';
	import { legendColor } from 'd3-svg-legend';
	import { select, selectAll } from 'd3-selection';
	import { format } from 'd3-format'
	import { transition } from 'd3-transition'
	import { pastels } from '../helpers/colors.js'
   import usaalbers from "../helpers/USAGeoAlbers.js";
	import statehex from "../helpers/USStateHexbin.js";

	let d3 = {
		extent: extent,
		scaleLinear: scaleLinear,
		scaleOrdinal: scaleOrdinal,
		scaleLog: scaleLog,
		select: select,
		selectAll: selectAll,
		axisLeft: axisLeft,
		axisRight: axisRight,
		axisBottom: axisBottom,
		axisTop: axisTop,
		geoAlbersUsa: geoAlbersUsa,
		geoMercator: geoMercator,
		geoPath: geoPath,
		legendColor: legendColor,
		format: format
	}

	export let data = {data};
	export let width = {width};
	export let maptype = "geo";
	export let height = width * 0.5;
	export let colorscheme = pastels;
	export let variable = {variable}

	let el;

	let geojson;
	let projection;

	console.log(
		data.map(d => d[variable])
	)


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
		.domain(data.map(d => d[variable]))
		.range(colorscheme)


	const padding = { top: 10, right: 40, bottom: 40, left: 50 };

	const path = d3.geoPath()
		.projection(projection);

	onMount(generateMap);

	function generateMap() {

		colorScale.domain(d3.extent(Object.values(data.map(d => parseFloat(d[variable])))))

		let svg = d3.select(el).append("svg");

		svg
			.attr("width", width)
			.attr("height", height)

		svg.append("g")
      .selectAll("path")
      .data(geojson.features)
      .enter()
      .append("path")
			.attr("class", "state")
          .attr("fill", function(d){
				 let result = data.filter(obj => {
					 return obj.state === d.properties.name
				 })[0]
				 if (result) {
					return colorScale(result[variable])
				 } else {
				 	return "gray"
				 }
			 })
          .attr("d", path)
          .attr("stroke", "#fff")
			 .attr("stroke-width", width/1200)
			 .on("mouseover mousemove", function(event, d) {
				 let result = data.filter(obj => {
					 return obj.state === d.properties.name
				 })[0]
				 if (result) {
					 let centroid = path.centroid(d);
					 tooltip.select(".line1").text(d.properties.name)
					 tooltip.select(".line2").text(variable + ": " + parseFloat(result[variable]) + "%")

					 tooltip
					 	.style("visibility", "unset")
						.style("left", (centroid[0]-100) + "px")
						.style("top", (centroid[1]-100) + "px")


				 }
			 }).on("mouseleave", function(d) {
				 tooltip
					.style("visibility", "hidden")
			 })




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
    				 return "#fff"
    			 })
	  }


	   // add the tooltip
	   let tooltip = d3.select(el).append("div")
			.attr("class", "tooltip")

		tooltip.append("span")
			.attr("class", "line1")
			.text("TESTING")

		tooltip.append("span")
			.attr("class", "line2")
			.text("x")


		const legend = d3.legendColor()
			.scale(colorScale)
			// .labels(function(d,i){
			// 	for (let j=0; j<d.generatedLabels.length; j++) {
			// 		d.generatedLabels[j] = (parseFloat(d.generatedLabels[j]) + "%")
			// 	}
			// 	return d.generatedLabels[d.i]
			// })
			.orient("horizontal")
			.shapeWidth((width-25)/colorScale.domain().length)
			.shapePadding(0)
			.labelWrap(130)

		const legendContainer = d3.select(el).append("svg")
			.attr("width", width-25)
			.attr("class","legendContainer")
			.attr("height", 40)
			.append("g")
			.attr("transform", "translate(0,0)")
			.call(legend)







	}
</script>

<style>
	:global(.legendContainer) {
		font-family:"akkurat", sans-serif
	}
	:global(div.tooltip) {
		background-color:rgba(0,0,0,0.7);
		display:inline-block;
		padding:8px;
		border-radius:3px;
		color: #fff;
		text-align:center;
		position:absolute;
		visibility:hidden;
		width:200px;
		height:60px;
	}

	:global(div.tooltip .line1) {
		display:block;
		font-weight:bold;
		font-size:1.1rem;
		margin:0;
	}

	:global(div.tooltip .line2) {
		display:block;
		font-size:0.9rem;
		line-height: 1.1;
		margin:0;
	}

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
