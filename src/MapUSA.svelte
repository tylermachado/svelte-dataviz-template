<script>
   import { geoAlbersUsa, geoPath } from "d3-geo";
   import * as d3 from 'd3';
   import { onMount } from "svelte";
   import { feature } from "topojson";
   import { join } from "./join.js";
   import HoverCard from "./HoverCard.svelte"
    import SvelteTooltip from 'svelte-tooltip';

    export let active = {
      city: "test",
      acres: 11056,
      population:678933,
      walkablepct: "50%"
   };
   export let citylist;
   let data;

   const projection = geoAlbersUsa();
   const path = geoPath().projection(projection);

   let radiusScale = d3.scaleSqrt()
   .range([5,50]);
   let radiusVariable = "population"

   let colorScale = d3.scaleSequential()
      .interpolator(d3.interpolateBuGn);
   let colorVariable = "walkablepct"

   function handleMouseover(city, event) {
      active = city;

      d3.select('#hover-card')
         .style('display',    'block')
         .style('position',   'absolute')
         .style('top',        (event.clientY + 10) + "px")
         .style('left',       (event.clientX - 150) + "px")
   }

   function handleMouseout(city, event) {
      console.log("out")
      d3.select('#hover-card')
         .style('display',    'none')
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
         var combodata = join(data[1], data[0], "City", "city", function(cityloc, dens) {
            let walkablepct = parseFloat((dens["Percent of Residents within Half-Mile Walk of Park"]).replace(/%/g, ''));

               return {
                  city: cityloc.city,
                  lat: +cityloc.lat,
                  lon: +cityloc.lon,
                  population: parseFloat((dens["City Population"]).replace(/,/g, '')),
                  landarea: parseFloat((dens["Land Area"]).replace(/,/g, '')),
                  revisedarea: parseFloat((dens["Revised Area"]).replace(/,/g, '')),
                  density: +dens["Density"],
                  walkablepct: parseFloat((dens["Percent of Residents within Half-Mile Walk of Park"]).replace(/%/g, '')),
                  acres: +dens["Acres of Parkland"],
                  acresper1000: +dens["Parkland per 1,000 Residents"]
               }

         });

         combodata.sort(function (a, b) {
           return b.population - a.population;
         });

         if (colorVariable == "walkablepct") {
            combodata = combodata.filter(d => {
               return !isNaN(d.walkablepct);
            })
         }
         radiusScale.domain(
            [Math.min.apply(Math, combodata.map(function(o) { return o[radiusVariable]; })),
            Math.max.apply(Math, combodata.map(function(o) { return o[radiusVariable]; }))]
         )

         colorScale.domain(
            [Math.min.apply(Math, combodata.map(function(o) { return o[colorVariable]; })),
            Math.max.apply(Math, combodata.map(function(o) { return o[colorVariable]; }))]
         )

         return combodata;
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
         r={radiusScale(city[radiusVariable])}
         opacity="0.8"
         fill={colorScale(city[colorVariable])}
         stroke="#000000"
         on:mousemove={handleMouseover(city, event)}
         on:mouseout={handleMouseout(city, event)}
      />
   {/each}
   {/if}
</svg>

<HoverCard city={active.city} population={active.population} acres={active.acres} walkablepct={active.walkablepct}  />
