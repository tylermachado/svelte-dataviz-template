<script>
   import { onMount } from "svelte"
   import mapboxgl from 'mapbox-gl'

  let mapRef;

  // props
  export let centerlnglat
  export let zoom


   onMount(async () => {
      mapboxgl.accessToken = 'pk.eyJ1IjoidHlsZXJtYWNoYWRvIiwiYSI6ImNpbXY1YmMxMTAybTh1cGtrYmY3bjFiNHMifQ.e7Jn45kHrT5m2SbpSCZq5Q';

     // Create the map
      mapRef = new mapboxgl.Map({
         container: 'map',
         style: 'mapbox://styles/mapbox/light-v10?optimize=true',
         center: centerlnglat,
         zoom: zoom
      });

   });
</script>



<style>
   #map {
       width: 900px;
       height: 600px;
     }
</style>

<div id="map"></div>
