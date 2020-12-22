<script>
	import { onMount } from 'svelte';
	import BarChart from './charts/BarChart.svelte'
	import LineChart from './charts/LineChart.svelte'
	import MultiLineChart from './charts/MultiLineChart.svelte'
	import XYHeatmap from './charts/XYHeatmap.svelte'
	import GraphicTitle from './components/GraphicTitle.svelte'
	import GraphicFooter from './components/GraphicFooter.svelte'
	import { political, vibrant, pastels } from './helpers/colors.js'
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
	data = {dataset.default.filter(d => (["Massachusetts","Vermont","New Hampshire","Maine","Connecticut","Rhode Island"]).indexOf(d.state) > -1)}
	width = {width}
	height = {width * 0.5}
	title={"Transit Changes"}
	xVar={"state"}
	yVar={["earlyvotes20", "turnout16"]}
	yDomain={[0, 3500000]}
	orientation={"horizontal"}
/>
<!-- <XYHeatmap
	data = {applemaps.default}
	width = {width}
	height = {500}
	title={"Transit Changes"}
	xVar={"date"}
	yGroups={["driving", "transit", "walking"]}
	yDomain={[0, 200]}
/> -->
<!-- <LineChart
	data = {applemaps.default}
	width = {width}
	height = {height}
	xVar={"date"}
	yVar={"transit"}
/>
<MultiLineChart
	data = {applemaps.default}
	width = {width}
	height = {height}
	xVar={"date"}
	yGroups={["driving", "transit", "walking"]}
	yDomain={[0, 200]}
/> -->
<GraphicFooter
	source={'<a href="https://electproject.github.io/Early-Vote-2020G/index.html">United States Elections Project</a>'}
	note={'Accessed Nov 2020'}
	credit={'Developer Credit/Northeastern University'}
/>
