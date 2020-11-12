<script>
	import { onMount } from 'svelte';
	import MapUSA from './charts/MapUSA.svelte'
	import GraphicTitle from './components/GraphicTitle.svelte'
	import GraphicFooter from './components/GraphicFooter.svelte'
	import * as dataset from '../public/datasets/turnout.json'

	export let width = Math.min(
		document.getElementById('interactive').getBoundingClientRect().width,
		1000
	);
</script>

<style>

</style>

<GraphicTitle
	title={"2020 votes cast early as percentage of total 2016 turnout"}
	subhed={"A look at something etc"}
/>
<!-- <MapUSA
	width={width}
	data={dataset.default}
	maptype={"hex"}
/> -->
<MapUSA
	width={width}
	data={dataset.default}
	maptype={"geo"}
/>
<GraphicFooter
	source={'<a href="https://electproject.github.io/Early-Vote-2020G/index.html">United States Elections Project</a>'}
/>
