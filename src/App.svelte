<script>
	import { onMount } from 'svelte';
	import MapHexbinUSA from './charts/MapHexbinUSA.svelte'
	import GraphicTitle from './components/GraphicTitle.svelte'
	import GraphicFooter from './components/GraphicFooter.svelte'

	// gather data set. the Rollup JSON plugin loads everything with key "default", hence the second line below. (also filtering to California only)
	import * as jsondata from '../public/datasets/parkland.json'
	import * as electoral from '../public/datasets/2016electoral.json'
	let dataset = jsondata.default.filter(d => {
		return d.city.indexOf(", CA") > -1
	})

	export let width = Math.min(
		document.getElementById('interactive').getBoundingClientRect().width,
		1000
	);
</script>

<style>

</style>

<GraphicTitle
	title={"Today's chart"}
	subhed={"A look at something etc"}
/>
<MapHexbinUSA
	width={width}
	height={width * 0.66}
	data={electoral.default}
	xVar={"city"}
	yVar={"population"}
/>
<GraphicFooter
	source={"The Trust for Public Land"}
	note={"Data includes the top 100 cities by population in the US"}
/>
