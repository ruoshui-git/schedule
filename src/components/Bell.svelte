<script lang="typescript" context="module">
    const bell = new Audio("bell.mp3");
    const play = () => {
        bell.currentTime = 1;
        bell.play.call(bell);
    };
</script>

<script lang="typescript">
    import { DateTime, Duration } from "luxon";
    import { onDestroy } from "svelte";
    import { schedule, warningPeriod } from "../schedule";

    import { _ } from "svelte-i18n";

    $: timesToRing = $schedule.periods
        .map((pd) => {
            let times = [pd.interval.start, pd.interval.end];
            if (warningEnabled) {
                times.push(
                    pd.interval.end.minus(
                        Duration.fromObject({ minutes: minutesForWarning })
                    )
                );
            }
            return times;
        })
        .flat()
        .filter((t) => t > DateTime.now());

    let activeTimers: number[] = [];

    function resetTimers(..._args) {
        clearTimers(activeTimers);
        activeTimers = setTimers(timesToRing);
    }
    // args are just a trick to let `resetTimers` depend on `timesToRing`
    $: resetTimers(timesToRing);

    let bellEnabled = true;
    let warningEnabled = true;
    let minutesForWarning = 5;

    $: warningPeriod.set(Duration.fromObject({ minutes: minutesForWarning }));

    let volume = 50;
    $: bell.volume = volume / 100;

    //   $: console.log("active timers: ", activeTimers);

    function setTimers(times: DateTime[]): number[] {
        let timers: number[] = [];
        for (const t of times) {
            //   console.log(`Setting timer for ${t.toString()}`);
            timers.push(
                setTimeout(() => {
                    if (bellEnabled) {
                        play();
                    }
                }, t.diffNow().toMillis())
            );
        }
        return timers;
    }

    /**
     *
     * @param timers Timers given by setTimeout
     */
    function clearTimers(timers: number[]) {
        for (const timer of timers) {
            clearTimeout(timer);
        }
    }

    //   afterUpdate(() => {
    //     clearTimers(timers);
    //     timers = setTimers(timesToRing);
    //   });

    onDestroy(() => clearTimers(activeTimers));
</script>

<div class="bell">
    <label class="bell-volume"
        >{$_("volume")}: {volume}
        <input type="range" min="0" max="100" step="2" bind:value={volume} />
    </label>

    <label class="container">
        <input type="checkbox" bind:checked={bellEnabled} />
        {$_("enable-bell")}
        <span class="checkmark" />
    </label>

    <label>
        <input type="checkbox" bind:checked={warningEnabled} />{$_("ring-bell")}
        <input type="number" bind:value={minutesForWarning} max="50" min="1" />
        {$_("minutes-before-period-ends")}
    </label>

    <button class="test-bell" on:click={bell.play.bind(bell)}>
        {$_("test-bell")}
    </button>
</div>

<style>
    .bell {
        border: solid black 1px;
        display: flex;
        max-width: 30rem;
        flex-flow: column wrap;
        margin: 2rem auto;
        padding: 0.5rem;
    }

    .bell-volume {
        display: flex;
        flex-direction: column;
    }

    button.test-bell {
        margin: 10px;
    }
</style>
