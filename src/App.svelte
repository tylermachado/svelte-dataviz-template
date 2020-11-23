<script>
	import { onMount } from 'svelte';
	import MapUSA from './charts/MapUSA.svelte'
	import BarChart from './charts/BarChart.svelte'
	import ColumnChart from './charts/ColumnChart.svelte'
	import LineChart from './charts/LineChart.svelte'
	import MultilineChart from './charts/MultilineChart.svelte'
	import ScatterChart from './charts/Scatter.svelte'
	import GraphicTitle from './components/GraphicTitle.svelte'
	import GraphicFooter from './components/GraphicFooter.svelte'
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
</script>

<style>

</style>

<GraphicTitle
	title={"Data Viz Templates"}
	subhed={"A look at something etc"}
/>


<BarChart
	data = {dataset.default}
	width = {width}
	height = {500}
	xVar = {"state"}
	yVar = {"vep16"}

/>
<ColumnChart
	data = {dataset.default}
	width = {width}
	height = {500}
	xVar = {"state"}
	yVar = {"vep16"}

/>

<LineChart
	data = {dataset.default}
	width = {width}
	height = {500}
	xVar = {"state"}
	yVar = {"vep16"}

/>

<MultilineChart
	data = {applemaps.default}
	width = {width}
	height = {500}
	title={"Transit Changes"}
	xVar={"date"}
	yGroups={["driving", "transit", "walking"]}
	yDomain={[0, 200]}
/>


<MapUSA
	width={400}
	data={dataset.default}
	maptype={"geo"}
/>
<GraphicFooter
	source={'<a href="https://electproject.github.io/Early-Vote-2020G/index.html">United States Elections Project</a>'}
/>
