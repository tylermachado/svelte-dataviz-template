<script>
  import { geoAlbers, geoPath } from "d3-geo";
  	import * as d3 from 'd3';
  import { onMount } from "svelte";
  import { feature } from "topojson";
   import { cities } from "./cities";
   export let citylist;
  let data;
  const projection = geoAlbers();
  const path = geoPath().projection(projection);

onMount(async function() {
   const response = await fetch(
   "https://gist.githubusercontent.com/rveciana/a2a1c21ca1c71cd3ec116cc911e5fce9/raw/79564dfa2c56745ebd62f5655a6cc19d2cffa1ea/us.json"
   );
   const json = await response.json();
   const land = feature(json, json.objects.land);
   data = path(land);

   const citylistres = await d3.csv("datasets/citylist.csv")
   .then(function(data) {
      // data.forEach(function(d) {
      //    if (!isNaN(+d["Parkland per 1,000 Residents"])) {
      //       d["City Population"] = +d["City Population"];
      //       d["Parkland per 1,000 Residents"] = +d["Parkland per 1,000 Residents"];
      //    } else {
      //       console.log(d);
      //       d["City Population"] = +d["City Population"];
      //       d["Parkland per 1,000 Residents"] = 0;
      //    }
      //
      // });


      return data;
   });

   citylist = await citylistres;
   console.log(citylist);
   console.log(cities);
});
</script>

<style>
  svg {
    width: 960px;
    height: 500px;
  }
  .border {
    stroke: #444444;
    fill: #cccccc;
  }
</style>

<svg width="960" height="500">
  <path d={data} class="border" />
   {#if citylist}
     {#each citylist as city}
        <circle
          class="city"
          cx={projection([city.lon, city.lat])[0]}
          cy={projection([city.lon, city.lat])[1]}
          r="15"
          opacity="0.5"
          fill="#888888"
          stroke="#000000" />
      {/each}
   {/if}
</svg>
