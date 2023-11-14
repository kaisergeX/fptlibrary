import type {NotificationData} from '@mantine/notifications';

export enum ErrorCode {
  ERR = 'ERR',
  ERR_UNAUTHORIZED = 'ERR_UNAUTHORIZED',
  ERR_NETWORK = 'ERR_NETWORK',
}

export enum NotiCode {
  SUCCESS = 'SUCCESS',
  BOOK_EXCEEDED = 'BOOK_EXCEEDED',
  BOOK_EXISTED = 'BOOK_EXISTED',
  PAGING_OUT_RANGE = 'PAGING_OUT_RANGE',
}

export type NotiConfig = NotificationData & {
  code: ErrorCode | NotiCode;
};
