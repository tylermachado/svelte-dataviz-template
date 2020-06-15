<script>
   import { onMount } from "svelte";
   import { geoAlbersUsa, geoPath } from "d3-geo";
   import * as d3 from 'd3';
   import * as d3legend from 'd3-svg-legend';
   import { feature } from "topojson";
   import { join } from "../helpers/join.js";
   import states from "../helpers/USStates.js";
   import HoverCard from "../components/HoverCard.svelte"
   import SvelteTable from "svelte-table"
   import TextField from "smelte/src/components/TextField";


   export let width;
   export let height;
   export let filtercity = '';
   export let filtercitytyped = '';

   $: if (filtercitytyped.length == 2) {
      filtercity = ", " + filtercitytyped
   } else if (states.find(s => s.name.toLowerCase() == filtercitytyped.toLowerCase()) === undefined) {
      filtercity = filtercitytyped
   } else {
      let found = states.find(s => s.name.toLowerCase() == filtercitytyped.toLowerCase())
      filtercity = ", " + found.abbreviation
   }

   export let active = {
      city: "test",
      acres: 11056,
      population:678933,
      walkablepct: "50%"
   };
   export let citylist;


   let data;
   let legendSizeDiv;
   let legendColor;

   const projection = geoAlbersUsa().scale([width*1.35]).translate([width/2, height/2]);
   const path = geoPath().projection(projection);

   let marginLimiter = d3.scaleLinear()
      .domain([0,width])
      .range([0, width-250])

   let radiusScale = d3.scaleSqrt()
   .range([width/200, width/14]);
   let radiusVariable = "population"

   let colorScale = d3.scaleSequential()
   .interpolator(d3.interpolateYlGn);
   let colorVariable = "walkablepct"

   function buildLegendColors() {
      var legendColorDiv = d3.select(legendColor);

      var svg = legendColorDiv.append("svg")
      .attr("width", 308)
      .attr("height", 60)

      svg.append("g")
      .attr("class", "legendColor")
      .attr("transform", "translate(0,10)");

      var legendSequential = d3legend.legendColor()
      .classPrefix('circle')
      .shapeRadius(2*(300/32/2))
      .shapePadding(3*(300/32))
      .shape('circle')
      .cells(7)
      .orient("horizontal")
      .scale(colorScale)
      .labelFormat(d3.format(".0f"))
      .title("Percent of Residents within Half-Mile Walk to Park")
      .titleWidth(305)

      svg.select(".legendColor")
      .call(legendSequential);
   }

   function handleMouseover(city, event) {
      active = city;

      if (width > 700) {
         d3.select('#hover-card')
         .style('display',    'block')
         .style('position',   'fixed')
         .style('top',        (event.pageY - 775) + "px")
         .style('left',       (marginLimiter(event.pageX)) + "px")
      }
   }

   function handleMouseout(city, event) {
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
      // d3.csv("/datasets/citylist.csv"),
      // d3.csv("/datasets/parksdata.csv")
      d3.csv("//news.northeastern.edu/interactive/2020/06/city-parkland/datasets/citylist.csv"),
      d3.csv("//news.northeastern.edu/interactive/2020/06/city-parkland/datasets/parksdata.csv")
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

         radiusScale.domain(
         [Math.min.apply(Math, combodata.map(function(o) { return o[radiusVariable]; })),
         Math.max.apply(Math, combodata.map(function(o) { return o[radiusVariable]; }))]
         )

         colorScale.domain(
         [Math.min.apply(Math, combodata.filter(d => {
            return !isNaN(d.walkablepct);
         }).map(function(o) { return o[colorVariable]; })),
         Math.max.apply(Math, combodata.filter(d => {
            return !isNaN(d.walkablepct);
         }).map(function(o) { return o[colorVariable]; }))]
         )

         buildLegendColors();

         const columns =  [
         {
            key: "city",
            title: "City",
            value: v => v.city,
            sortable: true,
            headerClass: "text-left"
         },
         {
            key: "population",
            title: "Population",
            value: v => v.population,
            renderValue: v => v.population.toLocaleString('en-US'),
            sortable: true,
            headerClass: "text-left"
         },
         {
            key: "density",
            title: "Population Density",
            value: v => v.density,
            renderValue: v => v.density.toLocaleString('en-US'),
            sortable: true,
            headerClass: "text-left"
         },
         {
            key: "acresper1000",
            title: "Acres of Parkland Per 1000 Residents",
            value: v => v.acresper1000,
            renderValue: v => v.acresper1000.toLocaleString('en-US'),
            sortable: true,
            headerClass: "text-left"
         },
         {
            key: "walkablepct",
            title: "Percent of Residents within Half-Mile of Park",
            value: function(v) {
               if (isNaN(v.walkablepct)) {
                  return 0
               } else {
                  return v.walkablepct
               }
            },
            renderValue: function(v) {
               if (isNaN(v.walkablepct)) {
                  return "not available"
               } else {
                  return v.walkablepct + "%"
               }
            },
            sortable: true,
            headerClass: "text-left"
         },
         ];


         return [
            combodata,
            columns
         ];


      });

      citylist = await files;

   });
</script>

<style>
   .border {
      stroke: #444444;
      fill: #e9e9e9;
   }

   circle.circle, circle.circleswatch {
      opacity: 0.8;
      stroke: #000000;
   }

   text.circlelegendTitle {
      font-size:0.75rem;
   }

   input {
      width:100%;
   }

</style>

<div id="svgContainer"><svg width="{width}" height="{height}">
   <path d={data} class="border" />
   {#if citylist}
   {#each citylist[0].filter(function (d) {
      return d.city.toLowerCase().indexOf(filtercity.toLowerCase()) > -1
   }) as city}
   <circle
   class="city circle"
   cx={projection([city.lon, city.lat])[0]}
   cy={projection([city.lon, city.lat])[1]}
   r={radiusScale(city[radiusVariable])}
   fill={
      (!isNaN(city[colorVariable])) ?
      colorScale(city[colorVariable]) :
      '#e9e9e9'
   }
   on:mousemove={handleMouseover(city, event)}
   on:mouseout={handleMouseout(city, event)}
   />
   {/each}
   {/if}
</svg></div>

<div class="legendContainer" bind:this={legendColor}></div>
<div class="sourceline">SOURCE: <a href="https://www.tpl.org/2019-city-park-facts">Center for City Park Excellence, Trust for Public Land</a></div>

<HoverCard
city={active.city}
population={active.population}
acres={active.acres}
walkablepct={active.walkablepct}
/>

{#if citylist}
<div class="interactivefilter">
   <span>Filter by city or state abbreviation:</span>
   <TextField bind:value={filtercitytyped} outlined  />
</div>
<SvelteTable
   columns={citylist[1]}
   rows={citylist[0].filter(function (d) {
      return d.city.toLowerCase().indexOf(filtercity.toLowerCase()) > -1
   })}
   sortOrder={-1}
   clickCol={(event,row,key) => console.log(event,row,key)}
   sortBy={"population"}
   classNameCell={"infocell"}
>
</SvelteTable>
<div class="sourceline">SOURCE: <a href="https://www.tpl.org/2019-city-park-facts">Center for City Park Excellence, Trust for Public Land</a></div>
{/if}
