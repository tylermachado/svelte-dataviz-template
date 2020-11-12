<script>

   export let source;
   export let note;

</script>

<style>
   #graphic-footer {
      display: grid;
      grid-column-gap: 5px;
      grid-template-columns: 1fr;
   }

   #footer-logo img, #footer-logo svg {
      max-width:125px;
   }

   @media screen and (min-width: 600px) {
      #graphic-footer {
         grid-template-columns: 3fr 1fr;
      }

      #footer-logo img, #footer-logo svg {
         max-width:unset;
      }
   }

   #footer-meta span {
      display:block;
      color: #666;
      font-size:0.75rem;
      margin-bottom:0.25rem;
   }

   #footer-meta .nav__logo-mod .logo__news {
      fill: #000;
   }




</style>

<div id="graphic-footer">
   <div id="footer-meta">
      <span class="graphic-footer-text">SOURCE: {@html source}</span>
      {#if note}
         <span class="graphic-footer-text">NOTE: {note}</span>
      {/if}
   </div>
   <div id="footer-logo">
      <img src="./sitelogo.svg" alt="News@Northeastern" />
   </div>
</div>
