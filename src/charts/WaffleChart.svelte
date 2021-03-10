<script>
	import { onMount } from 'svelte';
	import { scaleLinear, scaleBand, scaleOrdinal, scaleQuantize, scaleThreshold, scaleQuantile } from 'd3-scale';
	import { axisLeft, axisRight, axisTop, axisBottom } from 'd3-axis';
	import { select } from 'd3-selection';
	import { legendColor } from 'd3-svg-legend';
	import { vibrant } from '../helpers/colors.js'

	let d3 = {
		scaleLinear: scaleLinear,
		scaleBand: scaleBand,
		scaleOrdinal: scaleOrdinal,
		scaleQuantize: scaleQuantize,
		scaleQuantile: scaleQuantile,
		scaleThreshold: scaleThreshold,
		select: select,
		axisLeft: axisLeft,
		axisRight: axisRight,
		axisBottom: axisBottom,
		axisTop: axisTop,
		legendColor: legendColor
	}

	let el;

	const padding = { top: 20, right: 0, bottom: 0, left: 0 };



	export let data = [];
	export let width = {width};
	export let groups = {groups};
	export let columns = {columns};
	export let colorscheme = vibrant;
	export let orientation = "vertical";

	export let thresholds = [0]
	export let total;

	for (let g in groups) {
		total = data[groups[g]] + thresholds[thresholds.length-1];
		thresholds.push(total)
	}


	export let squaresize = Math.floor(width / columns) - 1;
	$: rows = Math.ceil(total/columns)
	$: height = rows * (squaresize+1)


	$: xScale = d3.scaleLinear()
		.domain([0, total])
		.range([0, columns * squaresize]);

	$: colorScale = d3.scaleQuantile()
		.domain(thresholds)
		.range(colorscheme.splice(0, thresholds.length-1));

	onMount(generateWaffleChart);

	function generateWaffleChart() {
		let svg = d3.select(el)
			.append("svg")
			.attr("width", width)
			.attr("height", height + padding.top);

		let gviz = svg.append("g")
			.attr("transform",
			  "translate(" + padding.left + "," + padding.top + ")")


		for (let i=0; i < total; i++) {
			gviz.append("rect")
				.attr("class", "rect" + i)
				.attr("x", 		Math.floor(i / rows) * (squaresize+1))
				.attr("y", 		(i % rows) * (squaresize+1))
				.attr("height", squaresize)
				.attr("width",  squaresize)
				.attr("fill", 	 colorScale(i))
		}

		// if (width >= 750) {
		// 	let glabels = svg.append("g")
		// 		.selectAll("text")
		// 		.data(groups)
		// 		.enter()
		// 		.append("text")
		// 		.text(function(d,i){
		// 			return d + ": " + data[d]
		// 		})
		// 		.attr("x", function(d,i){
		// 			let number = [0, ((thresholds[1] + thresholds[2]) / 2), thresholds[3]]
		// 			return xScale(number[i])
		// 		})
		// 		.attr("y", 12)
		// 		.attr("fill", "black")
		// 		.attr("text-anchor", function(d,i) {
		// 			return ["start", "middle", "end"][i]
		// 		})
		// }







		// const legend = d3.legendColor()
		// 	.scale(colorScale)
		// 	.orient("horizontal")
		// 	.shapeWidth(40)
		// 	.shapePadding(60)
		// 	.labelWrap(80)
		//
		// const legendContainer = d3.select(el).append("svg")
		// 	.attr("width",
		// 		(
		// 			(colorScale.domain().length * 40) + (colorScale.domain().length * 60)
		// 		)
		// 	)
		// 	.attr("class","legendContainer")
		// 	.attr("height", 50)
		// 	.append("g")
		// 	.attr("transform", "translate(" + (padding.left + (10))  + ",0)")
		// 	.call(legend)

	} // generateBarChart
</script>

<style>
	.chart :global(text){
		font-family:'akkurat',sans-serif;
		font-size:12px;
		text-transform: uppercase;
	}

	.chart :global(g.tick line) {
		stroke: #ccc;
	}

	.chart :global(.legendContainer) {
		display:block;
		margin:0 auto;
		padding:10px 0;
		border:1px solid #ccc;
		border-radius:3px;
	}

	.chart :global(.legendContainer text) {
		font-family:'akkurat',sans-serif;
		text-transform: uppercase;
		fill: #666;
		font-size: 11px;
	}

	.stats {
		display:grid;
		grid-template-columns: var(--proportions);
		margin:0
	}

	.stats div {
		font-family:'akkurat',sans-serif;
		font-size:11px;
		text-transform: uppercase;
	}

	h3 {
		font-family:'akkurat',sans-serif;
		font-size:1.5rem;
		text-transform: unset;
		margin: 0 auto 1rem;
	}
</style>

<div bind:this={el} class="chart"></div>
