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
   let fillscale = d3.scaleLog()
   .range([5, 50]);
   let slice = "population"

   function handleMouseover(city, event) {
      // console.log(event)
   }



   onMount(async function() {
      const response = await fetch(
      "https://gist.githubusercontent.com/rveciana/a2a1c21ca1c71cd3ec116cc911e5fce9/raw/79564dfa2c56745ebd62f5655a6cc19d2cffa1ea/us.json"
      );
      const json = await response.json();
      const land = feature(json, json.objects.land);
      data = path(land);


      const files = await Promise.all([
      d3.csv("datasets/citylist.csv"),
      d3.csv("datasets/parksdata.csv")
      ])
      .then(function(data) {
         var firstresult = join(data[1], data[0], "City", "city", function(cityloc, dens) {
            return {
               city: cityloc.city,
               lat: +cityloc.lat,
               lon: +cityloc.lon,
               population: parseFloat((dens["City Population"]).replace(/,/g, '')),
               landarea: parseFloat((dens["Land Area"]).replace(/,/g, '')),
               revisedarea: parseFloat((dens["Revised Area"]).replace(/,/g, '')),
               density: +dens["Density"],
               walkablepct: isNaN(parseFloat((dens["Percent of Residents within Half-Mile Walk of Park"]).replace(/%/g, ''))),
               acres: +dens["Acres of Parkland"],
               acresper1000: +dens["Parkland per 1,000 Residents"]
            };
         });

         fillscale.domain(
         [Math.min.apply(Math, firstresult.map(function(o) { return o[slice]; })),
         Math.max.apply(Math, firstresult.map(function(o) { return o[slice]; }))]
         )

         return firstresult;
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
   r={fillscale(city[slice])}
   opacity="0.5"
   fill="#888888"
   stroke="#000000"
   on:mouseover={handleMouseover(city.city, event)}
   />
   {/each}
   {/if}
</svg>
