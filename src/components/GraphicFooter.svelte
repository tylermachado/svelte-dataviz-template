<script>

   export let source;
   export let note;

</script>

<style>
   #graphic-footer {
      display: grid;
      grid-template-columns: 3fr 2fr
   }

   #footer-meta span {
      display:block;
      color: #666;
      font-size:0.75rem;
   }

   #footer-meta .nav__logo-mod .logo__news {
      fill: #000;
   }


</style>

<div id="graphic-footer">
   <div id="footer-meta">
      <span class="graphic-footer-text">SOURCE: {source}</span>
      <span class="graphic-footer-text">NOTE: {note}</span>
   </div>
   <div id="footer-logo">
      <img src="./sitelogo.svg" alt="News@Northeastern" />
   </div>
</div>
