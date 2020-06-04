<script>
	import { onMount } from 'svelte';
	import * as d3 from 'd3';
	import BarChart from './charts/BarChart.svelte';
	import Scatter from './charts/Scatter.svelte';
	import MapUSA from './charts/MapUSA.svelte';

	export let chartdata;
	export let width = document.getElementById('interactive').getBoundingClientRect().width;
	export let height = Math.round(width*0.7);

	onMount(async () => {

   	const res = await d3.csv("datasets/parklandper1000.csv")
		.then(function(data) {
		   data.forEach(function(d) {
				if (!isNaN(+d["Parkland per 1,000 Residents"])) {
					d["City Population"] = +d["City Population"];
	 		      d["Parkland per 1,000 Residents"] = +d["Parkland per 1,000 Residents"];
				} else {
					console.log(d);
					d["City Population"] = +d["City Population"];
	 		      d["Parkland per 1,000 Residents"] = 0;
				}

		   });
			return data;
		});

	   chartdata = await res;
   });

</script>

<style>
	.chart {
		margin: 0 auto;
	}

	
</style>

<MapUSA width={width} height={height} />
<!-- {#if chartdata}
	<Scatter
		data={chartdata}
	/>
{:else}
	<p>Loading</p>
{/if} -->
