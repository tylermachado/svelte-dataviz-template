<script>
	import { onMount } from 'svelte';
	import * as d3 from 'd3';

	export let data;
	export let xVar;
	export let yVar;

	console.log()
</script>

<style>
	#hover-card {
		background-color:white;
		border:1px solid black;
		border-radius: 4px;
		padding:10px;
		display:none;
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
	<div class="infocell">{xVar}: <span class="value">{data[xVar]}</span></div>
	<div class="infocell">{yVar}: <span class="value">{data[yVar]}</span></div>
</div>
