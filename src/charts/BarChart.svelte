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

	const padding = { top: 0, right: 40, bottom: 40, left: 100 };


		export let data = {data};
		export let width = {width};
		export let height = {height};
		export let xVar = {xVar};
		export let yVar = {yVar};

	$: xScale = d3.scaleLinear()
		.domain([0, Math.max.apply(Math, data.map(function(o) { return o[yVar]; }))])
		.range([0, width - padding.left - padding.right]);

	$: yScale = d3.scaleBand()
		.domain(data.map(function(o) { return o[xVar]; }))
		.rangeRound([padding.top, height - padding.bottom])
		.padding(0.2);



	onMount(generateBarChart);

	function generateBarChart() {
		var svg = d3.select(el)
			.append("svg")
			.attr("width", width)
			.attr("height", height)
			.append("g")
			.attr("transform",
				  "translate(" + padding.left + "," + padding.top + ")");

			svg.append("g")
			.attr("transform", "translate(0," + (height-padding.bottom) + ")")
		   .call(d3.axisBottom(xScale)
				.ticks(Math.round(width/100))
				.tickSizeInner(-width)
				.tickSizeOuter(0)
				.tickPadding(3)
			)
			.call(g => g.select(".domain").remove());

	  		svg.append("g")
	  			   .call(d3.axisLeft(yScale)
						.tickSizeInner(0)
						.tickSizeOuter(0)
						.tickPadding(5)
					)
					.call(g => g.select(".domain").remove());

		svg.append('g')
	    .selectAll("rect")
	    .data(data)
	    .enter()
	    .append("rect")
		 .attr("y", function (d) { return yScale(d[xVar]); })
	    .attr("x", function (d) { return 0; })
		 .attr("height", yScale.bandwidth())
		 .attr("width", function (d) { return xScale(d[yVar]); });


	}
</script>

<style>
	.chart :global(rect) {
		fill: #d51e2d;
	}

	.chart :global(g.tick line) {
		stroke: #ccc;
	}
</style>

<div bind:this={el} class="chart"></div>
