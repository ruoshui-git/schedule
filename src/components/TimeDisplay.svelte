<script lang="typescript">
  import { DateTime } from "luxon";

  export let time: DateTime;
</script>

<div>
  <p>
    <span>{time.toLocaleString(DateTime.TIME_WITH_SECONDS)}</span>
  </p>
</div>

<style>
  p {
    font-size: 2rem;
  }

  span {
    font-size: 2rem;
    font-weight: bold;
  }
</style>
