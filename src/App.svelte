<script>
	import { onMount } from 'svelte';
	import BarChart from './charts/BarChart.svelte'
	import DotPlot from './charts/DotPlot.svelte'
	import LineChart from './charts/LineChart.svelte'
	import LollipopChart from './charts/LollipopChart.svelte'
	import MapUSA from './charts/MapUSA.svelte'
	import Scatter from './charts/Scatter.svelte'
	import WaffleChart from './charts/WaffleChart.svelte'
	import XYHeatmap from './charts/XYHeatmap.svelte'
	import GraphicTitle from './components/GraphicTitle.svelte'
	import GraphicFooter from './components/GraphicFooter.svelte'
	import * as colors from './helpers/colors.js'
	import * as turnout from '../public/datasets/turnout.json'
	import * as applemaps from '../public/datasets/applemaps.json'
	import * as cannabislaws from '../public/datasets/cannabislaws.json'

	export let width = Math.min(
		document.getElementById('interactive').getBoundingClientRect().width,
		1000
	);

	// export let height = Math.min(
	// 	document.getElementById('interactive').getBoundingClientRect().height,
	// 	1000
	// );
	export let height = 350;
</script>

<style>

</style>

<GraphicTitle
	title={"2020 vs. 2016 Votes"}
/>
<BarChart
	data={turnout.default.filter(d => (["Massachusetts", "Rhode Island", "Connecticut", "New Hampshire", "Maine", "Vermont"].indexOf(d["State"]) > -1))}
	width={width}
	height={height}
	xVar={"State"}
	yVar={["2020 Early Votes", "2016 Total Votes"]}
	yDomain={[0, 3500000]}
	orientation={"horizontal"}
/>


<hr />


<GraphicTitle
	title={"2020 vs. 2016 Votes"}
/>
<DotPlot
	data={turnout.default.filter(d => (["Massachusetts", "Rhode Island", "Connecticut", "New Hampshire", "Maine", "Vermont"].indexOf(d["State"]) > -1))}
	width = {width}
	height = {height}
	groupings={["2020 Early Votes", "2016 Total Votes"]}
	category={"State"}
/>


<hr />


<GraphicTitle
	title={"Transportation mode usage changes in March 2020"}
/>
<LineChart
	data={applemaps.default}
	width = {width}
	height = {height}
	xVar={"date"}
	yGroups={["driving", "transit", "walking"]}
	yDomain={[0, 200]}
/>


<hr />



<GraphicTitle
	title={"2020 vs. 2016 Votes"}
/>
<LollipopChart
	data={turnout.default.filter(d => (["Massachusetts", "Rhode Island", "Connecticut", "New Hampshire", "Maine", "Vermont"].indexOf(d["State"]) > -1))}
	width={width}
	height={height}
	xVar={"State"}
	yVar={"2020 Early Votes"}
	yDomain={[0, 3500000]}
/>


<hr />


<GraphicTitle
	title={"Cannabis laws by state"}
/>
<MapUSA
	data={cannabislaws.default}
	width = {width}
	height = {height * 2}
	variable={"combined"}
	maptype={"geo"}
/>
<hr />



<GraphicTitle
	title={"Transportation mode usage changes in March 2020"}
/>
<Scatter
	data={turnout.default}
	width = {width/2}
	height = {width/2}
	xVar={"2020 Early Votes"}
	yVar={"2016 Total Votes"}
/>


<hr />



<GraphicTitle
	title={"2020 Vs. 2016 Votes"}
/>
<XYHeatmap
	data={applemaps.default}
	width = {width}
	height = {height}
	xVar={"date"}
	yGroups={["driving", "transit", "walking"]}
	yDomain={[0, 200]}
/>


<hr />


<GraphicFooter
	source={'<a href="https://electproject.github.io/Early-Vote-2020G/index.html">United States Elections Project</a>'}
	note={'Accessed Nov 2020'}
	credit={'Developer Credit/Northeastern University'}
/>
