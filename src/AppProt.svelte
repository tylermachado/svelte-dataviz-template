<script>
	import { onMount, afterUpdate } from 'svelte';
	import BarChart from './charts/BarChart.svelte'
	import GraphicTitle from './components/GraphicTitle.svelte'
	import GraphicFooter from './components/GraphicFooter.svelte'

	import * as colors from './helpers/colors.js'
	import * as protests from '../public/datasets/protests.json'

		let dataset;
		let schemes = [colors.divergingbrownteal, colors.political, colors.dark]

		function getorientation(x) {
			if (x > 600) {
				return "vertical"
			} else {
				return "horizontal"
			}
		}

		onMount(function() {
			dataset = protests.default
		})

		afterUpdate(function() {
		})

		let width = Math.min(
			document.getElementById('demographics').getBoundingClientRect().width,
			1000
		);

		function chartwidth(x) {
			if (window.innerWidth >= 700) {
				return (width / x)
			} else {
				return width
			}
		}


	</script>

	<style>
		:global(div.chart) {
			display:inline;
		}

		:global(form) {
			display:inline;

		}

		:global(form select) {
			font-size:1.25rem;
			font-family: "Akkurat", sans-serif;
			padding:0.5rem 0.2rem;
		}

		:global(#demographics-filter) {
			display:block;
			width: 100%;
			text-align:center;
			margin:0 0 2rem;
			font-size:1.1rem;
		}

	</style>

<GraphicTitle
	title={"Gun purchases in 2020 among protest and rally attendees"}
/>
{#if dataset && dataset.length > 0}
		<!-- <h4>{item}</h4> -->
		<BarChart
			width={
				(width > 750) ?
				600 :
				width
			}
			height={
				(width > 750) ?
				250 :
				400
			}
			data={dataset}
			xVar={"protest"}
			yVar={"yes"}
			yDomain={[0,0.25]}
			colorscheme={colors.dark}
			orientation={getorientation(width)}
		/>
{/if}
<GraphicFooter
	source={"<a href='//covidstates.org'>The COVID-19 Consortium for Understanding the Public's Policy Preferences Across States</a>."}
	credit={"Tyler Machado/Northeastern University"}
/>
