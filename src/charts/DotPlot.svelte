<script>
	import { onMount } from 'svelte';
	import { scaleLinear, scaleOrdinal } from 'd3-scale'
	import { csv } from 'd3-fetch'
	import { select } from 'd3-selection'
	import { transition } from 'd3-transition'
	import { legendColor } from 'd3-svg-legend';
	import { political } from "../helpers/colors.js"

	const d3 = {
		scaleLinear: scaleLinear,
		scaleOrdinal: scaleOrdinal,
		csv: csv,
		select: select,
		legendColor: legendColor
	}

	let el;

	export let data = {data}
	export let width = {width}
	export let height = 500
	export let datapoints = {datapoints}
	export let category;
	export let radius = 12;

	onMount(generatePlot);

	function generatePlot() {
		const legend = d3.legendColor()
			.scale(colors)
			.orient("horizontal")
			.shape("circle")
			.shapeRadius(radius * 0.67)
			.shapePadding(100)
			.labelWrap(130)

		const legendContainer = d3.select(el).append("svg")
			.attr("width", (3*100) + (3 * (radius)))
			.attr("class","legendContainer")
			.attr("height", 60)
			.append("g")
			.attr("transform", "translate(50," + (radius * 0.67) + ")")
			.call(legend)
	}



	$: xScale = d3.scaleLinear()
		.domain([0, 3000000])
		.range([radius, width - radius]);

	$: yScale = d3.scaleLinear()
		.domain([0, (data.length)])
		.range([35, height]);

	$: colors = d3.scaleOrdinal()
		.domain(datapoints)
		.range(political);

	let marginLimiter = d3.scaleLinear()
	      .domain([0,width])
	      .range([0, width-100])


</script>

<style>
	.legend, svg {
		font-family:"akkurat", sans-serif;

	}

	text.dot-label {
		font-size:9px;
	}

	:global(.legend text.label) {
		font-size:12px;
		text-transform:uppercase;
		fill: #666;
	}

	:global(.legend) {
		text-align:center;
		margin:0 auto;
	}

	:global(.legendContainer) {
		border:1px solid #ccc;
		border-radius: 3px;
	}
</style>

<div bind:this={el} class="legend"></div>
<svg width={width} height={height}>
	{#if data.length > 0}
	{#each data as d, i}
		<g>
			<text y={yScale(i) - 20} class="dotplot-header">
			<tspan>{d[category]}</tspan>
  			</text>
			<g>
				<line
					x1={xScale(xScale.domain()[0])}
					x2={xScale(xScale.domain()[1])}
					y1={yScale(i)}
					y2={yScale(i)}
					stroke="#dedede"
					stroke-width="2"
				/>
				{#each datapoints as group}
					{#if d[group]}
						<circle cx={xScale(d[group])} cy={yScale(i)} r={radius} fill={colors(group)}
					   />
						<text x={xScale(d[group])} y={yScale(i) + (radius*0.33)} fill="white" text-anchor="middle" class="dot-label">
							<tspan font-size="11px">{d[group]}</tspan>
						</text>
					{/if}
				{/each}
			   />
			</g>
		</g>
	{/each}
	{/if}

</svg>
