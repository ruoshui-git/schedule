<script lang="ts">
  import LangChooser from "./components/LangChooser.svelte";
  import SimpleSchedule from "./components/SimpleSchedule.svelte";
</script>

<main>
  <SimpleSchedule />
  <LangChooser />
</main>

<style>
  main {
    text-align: center;
    /* padding: 1em; */
    /* max-width: 240px; */
    margin: 0 auto;
  }

  /* h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  } */

  /* @media (min-width: 640px) {
    main {
      max-width: none;
    }
  } */
</style>
