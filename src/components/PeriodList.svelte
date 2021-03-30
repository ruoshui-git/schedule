<script lang="typescript">
    import { DateTime } from "luxon";
    import type { Period } from "../schedule";
    export let periods: Period[];
    export let highlights: number[] = [];
    import { _ } from "svelte-i18n";

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
        <th>{$_("period")}</th>
        <th>{$_("time")}</th>
    </tr>
    {#each periods as pd, i}
        <tr class:highlight={highlights.includes(i)}>
            <td>{pd.name}</td>
            <td>
                <!-- pd.interval.start
          .setZone(zone)
          .setLocale("en")
          // @ts-ignore
          .toLocaleString(timeFmtOptions) +
          " - " +
          pd.interval.end
            .setZone(zone)
            .setLocale("en")
            // @ts-ignore
            .toLocaleString(timeFmtOptions) -->
                {pd.interval.start.setZone(zone).toFormat("t") +
                    " - " +
                    pd.interval.end.setZone(zone).toFormat("t")}</td
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
