<script lang="typescript">
    import type { DateTime, Duration } from "luxon";
    import { _ } from "svelte-i18n";

    import { time } from "../currentTime";
    import { Period, schedule, Schedule } from "../schedule";
    import Bell from "./Bell.svelte";
    import PeriodList from "./PeriodList.svelte";
    import ScheduleChooser from "./ScheduleChooser.svelte";
    import TimeDiff from "./TimeDiff.svelte";
    import TimeDisplay from "./TimeDisplay.svelte";

    let pdName: string;
    let into: Duration | null;
    let remaining: Duration;

    let altStyle: boolean = false;
    let highlights: [number, number] | [number] | [];

    function buildLayout(time: DateTime, schedule: Schedule) {
        const [i, res] = schedule.locateTime(time);
        highlights = i;

        if (res === null) {
            // time is before schedule
            const pd0 = schedule.periods[0];
            pdName = $_("before-todays-schedule");
            into = null;
            remaining = pd0.interval.start.diff(time);
            altStyle = false;
        } else {
            if (res instanceof Period) {
                // in a period
                pdName = res.name;
                [into, remaining] = res.interval
                    .splitAt(time)
                    .map((ivl) => ivl.toDuration());
                altStyle = false;
            } else {
                // passing
                pdName = $_("before-period", {
                    values: {
                        period: res.after.name,
                    },
                });
                into = time.diff(res.before.interval.end);
                remaining = res.after.interval.start.diff(time);
                altStyle = true;
            }
        }
    }

    $: buildLayout($time, $schedule);
</script>

<h2 class="title">{$schedule.name}</h2>

<div class="outer">
    <div>
        <h3 class="pd-name">{pdName}</h3>
        <TimeDiff {into} {remaining} {altStyle} />
        <TimeDisplay time={$time} />
    </div>
    <div>
        <PeriodList periods={$schedule.periods} {highlights} />
    </div>
</div>

<Bell />
<ScheduleChooser />

<style>
    .pd-name {
        color: rgb(0, 0, 255);
        margin: auto;
    }
    .outer {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }
</style>
