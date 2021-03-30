<script lang="typescript">
  import type { Duration } from "luxon";
  export let into: Duration | null;
  export let remaining: Duration;
  export let altStyle: boolean;
  import { _ } from "svelte-i18n";
</script>

<div class="container">
  {#if into}
    <div class="into">
      <span id={altStyle ? "altStyle" : ""}
        >{Math.floor(into.as("minutes"))}</span
      >{$_("minutes-into")}
    </div>
  {/if}

  <div class="remaining">
    <span id={altStyle ? "altStyle" : ""}
      >{Math.ceil(remaining.as("minutes"))}</span
    >{$_("minutes-remaining")}
  </div>
</div>

<style>
  div.container {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    max-width: 30rem;
    margin: 0 auto;
  }

  span {
    font-size: 5rem;
    display: block;
  }

  #altStyle {
    color: rgb(17, 115, 150);
  }

  .into > span {
    color: rgb(0, 128, 0);
  }
  .remaining > span {
    color: rgb(225, 63, 27);
  }

  .into,
  .remaining {
    margin: 0 1rem;
  }
</style>
