<script>
	import { onMount } from 'svelte';
	import { scaleLinear } from 'd3-scale'
	import { csv } from 'd3-fetch'
	import { select } from 'd3-selection'
   import HoverCard from "../components/HoverCard.svelte"

	const d3 = {
		scaleLinear: scaleLinear,
		csv: csv,
		select: select
	}

	export let active = {}

   export let width = 200;
	let radius = 6;
	let data = [];

	onMount(loadData);

	function loadData() {
	  	// d3.csv("../datasets/complaints.csv").then(function(dataset){
		d3.csv("//news.northeastern.edu/interactive/2020/07/fireworks/datasets/complaints.csv").then(function(dataset){
			data = dataset;
		})
	}

	function hover(d,event) {
		const pyro = document.getElementById("pyro");
		console.log(pyro.style.display)
		pyro.style.display === "block"

	}

	$: xScale = d3.scaleLinear()
		.domain([0, 8000])
		.range([radius, width - radius]);

	$: yScale = d3.scaleLinear()
		.domain([0, (data.length - 1)])
		.range([50, 1200 - (radius*2)]);

	let marginLimiter = d3.scaleLinear()
	      .domain([0,width])
	      .range([0, width-100])

	function startfireworks(pass, event) {
	    var d = document.getElementById('pyro');
	    d.style.display = "block";
	d.style.position = "fixed";
	d.style.top = (event.clientY + 9) + 'px';
	d.style.left = (event.clientX + 9) + 'px';
	}

	function stopfireworks() {
	    d.style.display = "none";
	}

	function handleMouseover(pass, event, year, city) {
		active.year = year;
		active.city = city;
		active.complaints = pass;

      d3.select('#hover-card')
         .style('display',    'block')
         .style('position',   'fixed')
         .style('top',        (event.clientY - 120) + "px")
         .style('left',       marginLimiter(event.clientX) + "px")
   }

   function handleMouseout(d, event) {
      d3.select('#hover-card')
      .style('display',    'none')
   }

</script>

<style>
	text {
		font-size:0.9rem;
	}

	text a {
	 fill: #999999;
	 font-size:0.65rem;
	}

	text tspan.pctred {
		fill: #d51e2d;
		font-weight:900;
	}

	text tspan {
		margin-right:3rem;
	}

	#pyro {
    display:none;
	 z-index:0
  }

.pyro > .before, .pyro > .after {

  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  box-shadow: -120px -218.66667px blue, 248px -16.66667px #00ff84, 190px 16.33333px #002bff, -113px -308.66667px #ff009d, -109px -287.66667px #ffb300, -50px -313.66667px #ff006e, 226px -31.66667px #ff4000, 180px -351.66667px #ff00d0, -12px -338.66667px #00f6ff, 220px -388.66667px #99ff00, -69px -27.66667px #ff0400, -111px -339.66667px #6200ff, 155px -237.66667px #00ddff, -152px -380.66667px #00ffd0, -50px -37.66667px #00ffdd, -95px -175.66667px #a6ff00;
  -moz-animation: 1s bang ease-out infinite backwards, 1s gravity ease-in infinite backwards, 5s position linear infinite backwards;
  -webkit-animation: 1s bang ease-out  backwards, 1s gravity ease-in infinite backwards, 5s position linear infinite backwards;
  -o-animation: 1s bang ease-out  backwards, 1s gravity ease-in infinite backwards, 5s position linear infinite backwards;
  -ms-animation: 1s bang ease-out  backwards, 1s gravity ease-in infinite backwards, 5s position linear infinite backwards;
  animation: 1s bang ease-out infinite backwards, 1s gravity ease-in infinite backwards, 5s position linear infinite backwards; }

.pyro > .after {
  -moz-animation-delay: 1.25s, 1.25s, 1.25s;
  -webkit-animation-delay: 1.25s, 1.25s, 1.25s;
  -o-animation-delay: 1.25s, 1.25s, 1.25s;
  -ms-animation-delay: 1.25s, 1.25s, 1.25s;
  animation-delay: 1.25s, 1.25s, 1.25s;
  -moz-animation-duration: 1.25s, 1.25s, 6.25s;
  -webkit-animation-duration: 1.25s, 1.25s, 6.25s;
  -o-animation-duration: 1.25s, 1.25s, 6.25s;
  -ms-animation-duration: 1.25s, 1.25s, 6.25s;
  animation-duration: 1.25s, 1.25s, 6.25s; }

@-webkit-keyframes bang {
  from {
    box-shadow: 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod; } }
@-moz-keyframes bang {
  from {
    box-shadow: 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod; } }
@-o-keyframes bang {
  from {
    box-shadow: 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod; } }
@-ms-keyframes bang {
  from {
    box-shadow: 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod; } }
@keyframes bang {
  from {
    box-shadow: 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod, 0 0 goldenrod; } }
@-webkit-keyframes gravity {
  to {
    transform: translateY(200px);
    -moz-transform: translateY(200px);
    -webkit-transform: translateY(200px);
    -o-transform: translateY(200px);
    -ms-transform: translateY(200px);
    opacity: 0; } }
@-moz-keyframes gravity {
  to {
    transform: translateY(200px);
    -moz-transform: translateY(200px);
    -webkit-transform: translateY(200px);
    -o-transform: translateY(200px);
    -ms-transform: translateY(200px);
    opacity: 0; } }
@-o-keyframes gravity {
  to {
    transform: translateY(200px);
    -moz-transform: translateY(200px);
    -webkit-transform: translateY(200px);
    -o-transform: translateY(200px);
    -ms-transform: translateY(200px);
    opacity: 0; } }
@-ms-keyframes gravity {
  to {
    transform: translateY(200px);
    -moz-transform: translateY(200px);
    -webkit-transform: translateY(200px);
    -o-transform: translateY(200px);
    -ms-transform: translateY(200px);
    opacity: 0; } }
@keyframes gravity {
  to {
    transform: translateY(200px);
    -moz-transform: translateY(200px);
    -webkit-transform: translateY(200px);
    -o-transform: translateY(200px);
    -ms-transform: translateY(200px);
    opacity: 0; } }


</style>

<div class="pyro" id="pyro">
    <div class="before"></div>
    <div class="after"></div>
</div>


<HoverCard
	year={active.year}
	city={active.city}
	complaints={active.complaints}
/>
<svg width={width} height="1200">
	{#if data.length > 0}
	{#each data as d, i}
		<g>
			<text y={yScale(i) - 15}>
			<tspan>{d.city}</tspan>
			<tspan class="pctred" dx="10" font-size={fontScale(parseFloat(d.increase)) + "rem"}>&#9650; {d.increase}</tspan>
  			<tspan  dx="10"><a href="{d.source}">(source)</a></tspan>
  			</text>
			<g>
				<line
					x1={xScale(d.complaints19)}
					x2={xScale(d.complaints20)}
					y1={yScale(i)}
					y2={yScale(i)}
					stroke="#999999"
					stroke-width="2"
				/>
				<circle cx={xScale(d.complaints19)} cy={yScale(i)} r={radius} fill="#006EB5"
			   on:mousemove={handleMouseover(d.complaints19, event, 2019, d.city)}
			   on:mouseout={handleMouseout(d, event)}
			   />
				<circle cx={xScale(d.complaints20)} cy={yScale(i)} r={radius} fill="#d51e2d"
			   on:mousemove={handleMouseover(d.complaints20, event, 2020, d.city)}
			   on:mouseout={handleMouseout(d, event)}
			   />
			</g>
		</g>
	{/each}
	{/if}

</svg>
