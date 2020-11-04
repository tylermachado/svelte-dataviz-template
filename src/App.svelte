<script>
	import { onMount } from 'svelte';
	import MapHexbinUSA from './charts/MapHexbinUSA.svelte'
	import GraphicTitle from './components/GraphicTitle.svelte'
	import GraphicFooter from './components/GraphicFooter.svelte'

	// gather data set. the Rollup JSON plugin loads everything with key "default", hence the second line below. (also filtering to California only)
	import * as dataset from '../public/datasets/laws.json'

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
	data={dataset.default}
	xVar={"city"}
	yVar={"population"}
/>
<GraphicFooter
	source={"Marijuana Policy Project"}
	note={"Data includes the top 100 cities by population in the US"}
/>
