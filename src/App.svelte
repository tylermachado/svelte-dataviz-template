<script>
	import { onMount } from 'svelte';
	import DotPlot from './charts/DotPlot.svelte'
	import GraphicTitle from './components/GraphicTitle.svelte'
	import GraphicFooter from './components/GraphicFooter.svelte'
	import * as colors from './helpers/colors.js'
	import * as dataset from '../public/datasets/turnout.json'
	import * as applemaps from '../public/datasets/applemaps.json'

	export let width = Math.min(
		document.getElementById('interactive').getBoundingClientRect().width,
		1000
	);

	export let height = Math.min(
		document.getElementById('interactive').getBoundingClientRect().height,
		1000
	);

	console.log(colors)
</script>

<style>

</style>

<GraphicTitle
	title={"Data Viz Templates"}
	subhed={"A look at something etc"}
/>
<DotPlot
	data = {dataset.default}
	width = {width}
	height = {2800}
	groupings={["turnout16", "earlyvotes20"]}
	category={"state"}
/>
<GraphicFooter
	source={'<a href="https://electproject.github.io/Early-Vote-2020G/index.html">United States Elections Project</a>'}
	note={'Accessed Nov 2020'}
	credit={'Developer Credit/Northeastern University'}
/>
