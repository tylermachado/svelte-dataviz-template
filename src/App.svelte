<script>
	import BarChart from './BarChart.svelte';


	var data = [30, 86, 168, 281, 100, 77];
</script>

<style>
	.chart {
		width: 100%;
		max-width: 640px;
		height: calc(100% - 4em);
		min-height: 280px;
		max-height: 480px;
		margin: 0 auto;
	}
</style>

<div class="chart">
	<BarChart data={data}/>
</div>
