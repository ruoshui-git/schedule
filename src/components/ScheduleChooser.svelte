<script lang="typescript">
  import { SCHEDULES, schedule } from "../schedule";
</script>

<label for="schedule-chooser">Choose a Schedule:</label>
<!-- svelte-ignore a11y-no-onchange -->
<select
  name="schedule-chooser"
  id="schedule-chooser"
  on:change={(e) => {
    schedule.set(SCHEDULES[e.currentTarget.selectedIndex]);
  }}
  value={$schedule}
>
  {#each SCHEDULES as s}
    <option value={s}>{s.name}</option>
  {/each}
</select>
