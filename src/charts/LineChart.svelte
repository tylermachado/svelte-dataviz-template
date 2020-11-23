<script>
import { onMount } from 'svelte';
	import { scaleLinear, scaleBand, scaleTime } from 'd3-scale';
	import { axisLeft, axisRight, axisTop, axisBottom } from 'd3-axis';
	import { line } from 'd3-shape';
	import { path } from 'd3-path';
	import { extent } from 'd3-array';
	import { select } from 'd3-selection';
    	import { timeParse } from 'd3-time-format';

        let d3 = {
        		scaleLinear: scaleLinear,
        		scaleBand: scaleBand,
        		scaleTime: scaleTime,
        		select: select,
        		axisLeft: axisLeft,
        		axisRight: axisRight,
        		axisBottom: axisBottom,
        		axisTop: axisTop,
        		line: line,
        		extent: extent,
        		timeParse: timeParse,
        		path: path
        	}
let el;

const padding = { top: 10, right: 40, bottom: 40, left: 100 };

export let data = {data}
export let width = {width}
export let height = {height}
export let xVar = {xVar}
export let yVar = {yVar};

$: xScale = d3.scaleBand()
    .domain(data.map(function(o) { return o[xVar]; }))
    .rangeRound([0, width - padding.left - padding.right])
    .padding(0.2);

$: yScale = d3.scaleLinear()
    .domain([0, Math.max.apply(Math, data.map(function(o) { return o[yVar]; }))])
    .range([height - padding.bottom, padding.top]);

onMount(generateLineChart);

function generateLineChart(){
console.log(data);

var svg = d3.select(el)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform",
          "translate(" + padding.left + "," + padding.top + ")");

          svg.append("path")
                  .datum(data)
                  .attr("fill", "none")
          		  .attr("stroke", "#d51e2d")
                  .attr("stroke-width", 3)
                  .attr("d", d3.line()
                    .x(function(d) { return xScale(d[xVar]) })
                    .y(function(d) { return yScale(d[yVar]) })
                    )

                    svg.append("path")
        .datum(data)
        .attr("fill", "none")
		  .attr("stroke", "#02acac")
        .attr("stroke-width", 3)
        .attr("d", d3.line()
          .x(function(d) { return xScale(d[xVar]) })
          .y(function(d) { return yScale(d[yVar] + 10)})
      )
		 svg.append("g")
			 .attr("transform", "translate(0," + (height-padding.bottom) + ")")
			 .call(d3.axisBottom(xScale));
		 svg.append("g")
				 .call(d3.axisLeft(yScale));
}


</script>
<style>
.chart :global(){
	display:inline;
}
	.chart :global(path.domain) {
		stroke: #888;
	}

</style>
<div bind:this={el} class="chart"></div>
