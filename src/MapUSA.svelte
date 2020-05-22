<script>
  import { geoAlbersUsa, geoPath } from "d3-geo";
  	import * as d3 from 'd3';
  import { onMount } from "svelte";
  import { feature } from "topojson";
    import { join } from "./join.js";
   export let citylist;
  let data;
  const projection = geoAlbersUsa();
  const path = geoPath().projection(projection);

onMount(async function() {
   const response = await fetch(
   "https://gist.githubusercontent.com/rveciana/a2a1c21ca1c71cd3ec116cc911e5fce9/raw/79564dfa2c56745ebd62f5655a6cc19d2cffa1ea/us.json"
   );
   const json = await response.json();
   const land = feature(json, json.objects.land);
   data = path(land);

   const files = await Promise.all([
      d3.csv("datasets/citylist.csv"),
      d3.csv("datasets/popdensity.csv")
   ])
   .then(function(data) {
      console.log(data)
      var result = join(data[1], data[0], "City", "city", function(cityloc, dens) {
          return {
              city: cityloc.city,
              lat: +cityloc.lat,
              lon: +cityloc.lon,
              population: parseFloat((dens["City Population"]).replace(/,/g, '')),
              density: +dens["Density"]
              // brand: (brand !== undefined) ? brand.name : null
          };
      });
      console.log(result);

      return result;
   });

   citylist = await files;
});
</script>

<style>
  svg {
    width: 960px;
    height: 500px;
  }
  .border {
    stroke: #444444;
    fill: #eee;
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
          r={city.density}
          opacity="0.5"
          fill="#888888"
          stroke="#000000" />
      {/each}
   {/if}
</svg>
