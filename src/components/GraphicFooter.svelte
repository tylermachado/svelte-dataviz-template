<script>

   export let source;
   export let note;
   export let credit;

</script>

<style>
   #graphic-footer {
      display: grid;
      grid-column-gap: 5px;
      grid-template-columns: 1fr;
   }

   #footer-logo img, #footer-logo svg {
      max-width:75px;
   }

   @media screen and (min-width: 600px) {
      #graphic-footer {
         grid-template-columns: 4fr 1fr;
      }

      #footer-logo img, #footer-logo svg {
         max-width:unset;
      }
   }

   #footer-meta span {
      display:block;
      color: #666;
      font-family: "akkurat",sans-serif;
      font-size:0.75rem;
      line-height:0.75rem;
      margin-bottom:0.25rem;
   }

   :global(#footer-meta a) {
      color: #666;
   }

   #footer-meta .nav__logo-mod .logo__news {
      fill: #000;
   }




</style>

<div id="graphic-footer">
   <div id="footer-meta">
      <span class="graphic-footer-text">SOURCE: {@html source}</span>
      {#if note}
         <span class="graphic-footer-text">NOTE: {@html note}</span>
      {/if}
      {#if credit}
         <span class="graphic-footer-text">VISUALIZATION: {@html credit}</span>
      {/if}
   </div>
</div>
