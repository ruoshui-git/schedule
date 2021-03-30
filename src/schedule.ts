import { DateTime, Interval } from "luxon";
import { writable } from "svelte/store";

export class Period {
  name: string;
  interval: Interval;

  constructor(name: string, start: string, end: string) {
    this.name = name;
    this.interval = Interval.fromDateTimes(makeTime(start), makeTime(end));
  }
}

export interface Break {
  before: Period;
  after: Period;
}

/**
 * A list of periods and related functionality
 */
export class Schedule {
  name: string;
  periods: Period[];

  constructor(name: string, periods: Period[]) {
    this.name = name;
    this.periods = periods;
  }

  /**
   * @param time
   * @returns `Period` containing the time, or a `Break` if `time` is in between two periods, or `null` if it is outside of the schedule
   */
  locateTime(
    time: DateTime
  ): [[number], Period] | [[number, number], Break] | [[], null] {
    //   console.log(time.toISO());
    for (const [i, period] of this.periods.entries()) {
      if (period.interval.contains(time)) {
        return [[i], period];
      }
    }

    // useful for highlights in the schedule
    let pairStart = 0;
    for (const [p0, p1] of windowPairs(this.periods)) {
      if (p0.interval.isBefore(time) && p1.interval.isAfter(time)) {
        return [
          [pairStart, pairStart + 1],
          {
            before: p0,
            after: p1,
          },
        ];
      }

      pairStart++;
    }

    return [[], null];
  }
}

/**
 * Turn a time in the schedule (always in America/New_York) into a DateTime in the current day in America/New_York
 * @param repr "dd:dd"
 * @returns a `DateTime`
 */
function makeTime(repr: string): DateTime {
  const now = DateTime.now().setZone("America/New_York");
  let dt = DateTime.fromISO(repr, {
    zone: "America/New_York",
  }).set({
    day: now.day,
    month: now.month,
    year: now.year,
  });
  return dt;
}

export const SAMPLE_SCHEDULE = new Schedule("Stuyvesant 5-period schedule", [
  new Period("Before school", "00:00", "09:10"),
  new Period("Period 1 & 6", "09:10", "10:05"),
  new Period("Period 2 & 7", "10:15", "11:10"),
  new Period("Period 3 & 8", "11:20", "12:15"),
  new Period("Period 4 & 9", "12:25", "13:20"),
  new Period("Period 5 & 10", "13:30", "14:25"),
  new Period("Teacher's office hours", "14:30", "14:50"),
  new Period("After school", "14:50", "23:59"),
]);

export const SAMPLE_SCHEDULE2 = new Schedule("秋季班课程时间表", [
  new Period("课前", "00:00", "06:00"),
  new Period("第一节", "06:00", "06:55"),
  new Period("第二节", "07:00", "07:55"),
  new Period("休息", "08:00", "18:00"),
  new Period("第三节", "18:00", "18:55"),
  new Period("第四节", "19:00", "20:55"),
  new Period("休息", "21:00", "23:59"),
]);

function* windowPairs<T>(iter: Iterable<T>): Generator<[T, T], void, unknown> {
  let i = iter[Symbol.iterator]();
  let prev = i.next();
  let curr = i.next();
  while (!(prev.done || curr.done)) {
    yield [prev.value, curr.value];
    prev = curr;
    curr = i.next();
  }
}

export const SCHEDULES = [SAMPLE_SCHEDULE, SAMPLE_SCHEDULE2];

export const schedule = writable(SAMPLE_SCHEDULE2);
