import dayjs from 'dayjs';
import RelativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(RelativeTime);

export function relativeFromDate(d, suffix = false) {
  let date = dayjs(d + ' UTC');

  return date.fromNow(suffix);
}