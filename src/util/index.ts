import type {OS} from '@mantine/hooks';
import type {NotificationData} from '@mantine/notifications';
import dayjs from 'dayjs';
import {t} from 'i18next';
import notiConfigs from '~/config/notification';
import type {PromiseAllSettledReturnType} from '~/types';
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

export function isValidDate(date: unknown) {
  return date instanceof Date && !isNaN(date.getTime());
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

export const strReplaceSpace = (
  str: string,
  {replaceStr = '\\n', everyNthSpace = 1}: {replaceStr?: string; everyNthSpace?: number} = {
    replaceStr: '\\n',
    everyNthSpace: 1,
  },
) => {
  const regex = new RegExp(`((?:\\S*\\s){${everyNthSpace}}.*?)\\s`, 'g');
  return str.replace(regex, `$1${replaceStr}`);
};

export const i18nNormalizeKey = (key: string): string => t(key as unknown as TemplateStringsArray);

export const processFileUrl = (url: string) => {
  const fileName = url.split('/').pop();
  const fileExtension = fileName?.split('.').pop();
  return {fileName, fileExtension};
};

/**
 * Add Type-guard and provides an easier way to extract responses from
 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled Promise.allSettled}
 */
export async function promiseAllSettled<ResultType, ErrorType = unknown>(
  promises: Promise<ResultType>[],
): PromiseAllSettledReturnType<ResultType, ErrorType> {
  const results = await Promise.allSettled(promises);
  const fulfilled: PromiseFulfilledResult<ResultType>['value'][] = [];
  const rejected: ErrorType[] = [];

  for (const result of results) {
    if (result.status === 'rejected') {
      rejected.push(result.reason as ErrorType);
      continue;
    }

    fulfilled.push(result.value);
  }

  return {fulfilled, rejected};
}

export function getOS(): OS {
  if (typeof window === 'undefined') {
    return 'undetermined';
  }

  const {userAgent} = window.navigator;
  const macosPlatforms = /(Macintosh)|(MacIntel)|(MacPPC)|(Mac68K)/i;
  const windowsPlatforms = /(Win32)|(Win64)|(Windows)|(WinCE)/i;
  const iosPlatforms = /(iPhone)|(iPad)|(iPod)/i;

  if (macosPlatforms.test(userAgent)) {
    return 'macos';
  }
  if (iosPlatforms.test(userAgent)) {
    return 'ios';
  }
  if (windowsPlatforms.test(userAgent)) {
    return 'windows';
  }
  if (/Android/i.test(userAgent)) {
    return 'android';
  }
  if (/Linux/i.test(userAgent)) {
    return 'linux';
  }

  return 'undetermined';
}

export function isMobile(): boolean {
  const getDeviceOS = getOS();
  return getDeviceOS === 'android' || getDeviceOS === 'ios';
}
