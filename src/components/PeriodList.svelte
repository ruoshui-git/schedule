<script lang="typescript">
  import { DateTime, Interval } from "luxon";
  import type { Period } from "../schedule";
  export let periods: Period[];
  export let highlights: number[] = [];

  const timeFmtOptions = {
    hour: "numeric",
    minute: "numeric",
    // second: "numeric",
    hour12: true,
  };
  const zone = DateTime.local().zone;
</script>

<table>
  <tr>
    <th>Period</th>
    <th>Time</th>
  </tr>
  {#each periods as pd, i}
    <tr class:highlight={highlights.includes(i)}>
      <td>{pd.name}</td>
      <td>
        {pd.interval.start
          .setZone(zone)
          .setLocale("en")
          // @ts-ignore
          .toLocaleString(timeFmtOptions) +
          " - " +
          pd.interval.end
            .setZone(zone)
            .setLocale("en")
            // @ts-ignore
            .toLocaleString(timeFmtOptions)}</td
      >
    </tr>
  {/each}
</table>

<style>
  .highlight {
    color: red;
    font-weight: bold;
  }
  table,
  td,
  th {
    border: 1px solid rgb(221, 221, 221);
  }

  td {
    padding: 2px 30px;
  }
</style>
