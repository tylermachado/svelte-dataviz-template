<script>
	import { onMount } from 'svelte';
	import * as d3 from 'd3';

	export let city;
	export let population;
	export let acres;
	export let walkablepct;
</script>

<style>
	#hover-card {
		background-color:white;
		border:1px solid black;
		border-radius: 4px;
		padding:10px;
		display:none;
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
		font-size:1.2rem;
		font-weight: 700;
		color: darkgreen;
		display:block;
	}


</style>

<div id="hover-card">
	<h4>{city}</h4>
	<div class="infocell">City Population: <span class="value">{(population).toLocaleString()}</span></div>
	<div class="infocell">Acres of Parkland: <span class="value">{(acres).toLocaleString()}</span></div>
	<div class="infocell">Residents within Half-Mile of Park: <span class="value">{
		isNaN(walkablepct) ?
		"N/A" :
		walkablepct + "%"
	}</span></div>
</div>
