<script>
	import { onMount, afterUpdate } from 'svelte';
	import BarChart from './charts/BarChart.svelte'
	import GraphicTitle from './components/GraphicTitle.svelte'
	import GraphicFooter from './components/GraphicFooter.svelte'

	import * as colors from './helpers/colors.js'
	import * as gunpurchase from '../public/datasets/gunpurchase.json'

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
			dataset = gunpurchase.default
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
	title={"How likely were different demographic groups to buy guns in 2020?"}
/>
{#if dataset && dataset.length > 0}
	{#each ["prior gun ownership", "political party", "age group"] as item, i}
		<!-- <h4>{item}</h4> -->
		<BarChart
			width={
				(width > 750) ?
				(50 + (dataset.filter(d => {return d["group"] === item}).length * (width/12))) :
				width
			}
			height={
				(width > 750) ?
				220 :
				(25 + (dataset.filter(d => {return d["group"] === item}).length * (220/3)))
			}
			data={dataset.filter(d => {
				return d["group"] === item
			})}
			grouping={item}
			xVar={"subgroup"}
			yVar={"yes"}
			yDomain={[0,0.25]}
			colorscheme={schemes[i]}
			orientation={getorientation(width)}
		/>
	{/each}
{/if}
<GraphicFooter
	source={"<a href='//covidstates.org'>The COVID-19 Consortium for Understanding the Public's Policy Preferences Across States</a>."}
	credit={"Tyler Machado/Northeastern University"}
/>
