<script>
	import { onMount } from 'svelte';
	import Scatter from './charts/Scatter.svelte'
	import Map from './charts/Map.svelte'
	import GraphicTitle from './components/GraphicTitle.svelte'
	import GraphicFooter from './components/GraphicFooter.svelte'

	// gather data set. the Rollup JSON plugin loads everything with key "default", hence the second line below.
	import * as jsondata from '../public/datasets/parkland.json'
	let dataset = jsondata.default

	export let width = Math.min(
		document.getElementById('interactive').getBoundingClientRect().width,
		1000
	);
	export let height = Math.round(width*0.7);
</script>

<style>

</style>

<GraphicTitle
	title={"Today's chart"}
	subhed={"A look at something etc"}
/>
<Scatter
	width={width}
	height={width/2}
	data={dataset}
	xVar={"population"}
	yVar={"acresparkland"}
/>
<GraphicFooter
	source={"The Trust for Public Land"}
	note={"Data includes the top 100 cities by population in the US"}
/>
