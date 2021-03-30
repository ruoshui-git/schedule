<script lang="typescript">
    import { SCHEDULES, schedule } from "../schedule";
    import { _ } from "svelte-i18n";
</script>

<label for="schedule-chooser">{$_("choose-a-schedule")}: </label>
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

<style>
    label {
        display: inline;
    }
</style>
