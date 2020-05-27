<script>
	import { onMount } from 'svelte';
	import * as d3 from 'd3';
</script>

<style>
	#map-tooltip {
		background-color:white;
		border:1px solid black;
		border-radius: 4px;
		padding:10px;
		display:inline-block;
	}

	h4 {
		font-size:1.2rem;
		margin:0;
	}

	div.infocell {
		display:inline-block;
		width:100px;
		font-size:0.7rem;
	}

	span.value {
		font-size:1.3rem;
		font-weight: 700;
		color: darkgreen;
		display:block;
	}


</style>

<div id="map-tooltip">
	<h4>Boston, MA</h4>
	<div class="infocell">City Population: <span class="value">674913</span></div>
	<div class="infocell">Acres of Parkland: <span class="value">5072</span></div>
	<div class="infocell">Percent of Residents within Half-Mile Walk of Park: <span class="value">100%</span></div>
</div>
