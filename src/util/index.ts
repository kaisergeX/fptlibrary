import type {NotificationData} from '@mantine/notifications';
import dayjs from 'dayjs';
import notiConfigs from '~/config/notification';
import type {ErrorCode, NotiCode} from '~/types/notification';

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

export const safeAnyToNumber = <T = unknown>(
  inputVal: Exclude<T, (...args: never) => unknown>,
  fallbackNum = 0,
) => {
  if (inputVal === null || typeof inputVal === 'symbol') {
    return fallbackNum;
  }

  const result = Number(inputVal);
  return isNaN(result) ? fallbackNum : result;
};

export const findNotiConfig = (target: ErrorCode | NotiCode): NotificationData =>
  notiConfigs.find(({code}) => code === target) || notiConfigs[0];

/**
 * {@link https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm Durstenfeld shuffle}
 */
export const arrShuffle = <T extends unknown[] = unknown[]>(arr: T, mutateSrc = false): T => {
  const sourceArr = mutateSrc ? arr : structuredClone(arr);

  for (let i = sourceArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // can replace Math.floor with bitwise or (eg: 11.6 | 0 => 11)
    [sourceArr[i], sourceArr[j]] = [sourceArr[j], sourceArr[i]];
  }

  return sourceArr;
};

export const arrSamples = <T extends unknown[] = unknown[]>(arr: T, size = 1): T => {
  if (!Array.isArray(arr)) {
    return [] as unknown as T;
  }

  return arrShuffle(arr).slice(0, size) as T;
};
