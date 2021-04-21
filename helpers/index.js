export function toLength2(value) {
  if ((value + "").length < 2) {
    return `0${value}`;
  } else {
    return `${value}`;
  }
}

export function timeToString(now) {
  let hours, minutes, seconds;

  seconds = now / 1000;

  if (seconds >= 60) {
    minutes = ~~(seconds / 60);
    seconds -= Math.round(minutes * 60);
  }

  if (minutes >= 60) {
    hours = ~~(seconds / 60);
    minutes -= hours * 60;
  }

  return [
    hours ? toLength2(hours) : null,
    toLength2(~~minutes || 0),
    toLength2(Math.round(seconds) || 0)
  ]
    .filter(Boolean)
    .join(":");
}

export function now() {
  const date = new Date();
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    toString() {
      return `${this.year}-${toLength2(this.month)}-${toLength2(this.day)}`;
    }
  };
}
