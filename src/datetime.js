const MS_PER_SEC = 1000;
const SECONDS_PER_MINUTE = 60;
const MINUTES_PER_HOUR = 60;
const HOURS_PER_DAY = 24;

export const msToHumanReadable = (ms) => {
  const humanTimeParts = [];
  const time = ms > 0 ? ms : 0;

  const seconds = Math.floor((time / MS_PER_SEC) % SECONDS_PER_MINUTE);
  const minutes = Math.floor((time / (MS_PER_SEC * SECONDS_PER_MINUTE)) % MINUTES_PER_HOUR);
  const hours = Math.floor(
    (time / (MS_PER_SEC * SECONDS_PER_MINUTE * MINUTES_PER_HOUR)) % HOURS_PER_DAY
  );
  const days = Math.floor(
    (time / (MS_PER_SEC * SECONDS_PER_MINUTE * MINUTES_PER_HOUR * HOURS_PER_DAY)) % HOURS_PER_DAY
  );

  if (days > 0) {
    humanTimeParts.push(`${days}d`);
  }

  if (hours > 0) {
    humanTimeParts.push(`${hours}h`);
  }

  if (minutes > 0) {
    humanTimeParts.push(`${minutes}m`);
  }

  if (seconds > 0) {
    humanTimeParts.push(`${seconds}s`);
  }

  if (humanTimeParts.length === 0) {
    return '0s';
  }

  return humanTimeParts.join(' ');
};
