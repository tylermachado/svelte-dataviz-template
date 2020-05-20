<script>
	import { onMount } from 'svelte';
	import * as d3 from 'd3';

	let el;

	onMount(() => {
		d3.csv("/datasets/popdensity.csv")
		.then(function(data) {
			data.sort(function (a, b) {
			  return b["Density"] - a["Density"];
			});

			d3.select(el)
				.selectAll("div")
				.data(data)
				.enter()
				.append("div")
				.style("width", function(d) {
					return (+d["Density"] * 30) + "px";
				})
				.text(function(d) {
					return d["City"];
				});
		});
	});

</script>

<style>
	.chart :global(div) {
		font: 10px sans-serif;
		background-color: steelblue;
		text-align: right;
		padding: 3px;
		margin: 1px;
		color: white;
	}
</style>

<div bind:this={el} class="chart"></div>
