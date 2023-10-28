import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

export function sleep(millis = 0) {
  return new Promise((resolve) => setTimeout(resolve, millis));
}

export function timeAgo(timestamp: Date | string | null, timeOnly?: boolean): string {
  if (!timestamp) {
    return 'never';
  }

  return dayjs(timestamp).fromNow(timeOnly);
}

export function isEqualNonNestedObj(
  obj1: Record<string, unknown>,
  obj2: Record<string, unknown>,
): boolean {
  const obj1Keys = Object.keys(obj1);
  if (!obj1Keys.every((key: string) => Object.keys(obj2).includes(key))) {
    return false;
  }

  for (const key of obj1Keys) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
}
