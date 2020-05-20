<script>
	import { onMount } from 'svelte';
	import * as d3 from 'd3';
	import BarChart from './BarChart.svelte';
	import Scatter from './Scatter.svelte';

	export let chartdata;

	async function update() {
	   chartdata = [...chartdata,
			{"City Population": 30500, "Parkland per 1,000 Residents": 4.5}
		];
		console.log(chartdata)
   }

	onMount(async () => {
   	const res = await d3.csv("datasets/parklandper1000.csv")
		.then(function(data) {
		   data.forEach(function(d) {
				if (!isNaN(+d["Parkland per 1,000 Residents"])) {
					d["City Population"] = +d["City Population"];
	 		      d["Parkland per 1,000 Residents"] = +d["Parkland per 1,000 Residents"];
				} else {
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

<div class="chart">
	{#if chartdata}
		<Scatter data={chartdata}/>
	{:else}
		<p>Loading</p>
	{/if}
</div>
