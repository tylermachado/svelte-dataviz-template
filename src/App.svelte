<script>
	import { onMount } from 'svelte';
	import Scatter from './charts/Scatter.svelte'
	import Map from './charts/Map.svelte'
	import GraphicTitle from './components/GraphicTitle.svelte'
	import GraphicFooter from './components/GraphicFooter.svelte'

	export let chartdata;
	export let width = Math.min(
		document.getElementById('interactive').getBoundingClientRect().width,
		1000
	);
	export let height = Math.round(width*0.7);
</script>

<style>
	.chart {
		margin: 0 auto;
	}
</style>

<GraphicTitle
	title={"Today's chart"}
	subhed={"A look at something etc"}
/>
<Scatter
	width={width}
	height={width/2}
	
/>
<GraphicFooter
	source={"Northeastern University"}
	note={"Data averaged from last year"}
/>
