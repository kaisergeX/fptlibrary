import type {NotificationData} from '@mantine/notifications';

export enum ErrorCode {
  ERR = 'ERR',
  ERR_UNAUTHORIZED = 'ERR_UNAUTHORIZED',
  ERR_BADREQUEST = 'ERR_BADREQUEST',
  ERR_BAD_REQUEST = 'ERR_BAD_REQUEST',
  ERR_NETWORK = 'ERR_NETWORK',
  QR_INVALID = 'QR_INVALID',

  // Server errors
  NOT_FOUND = 'not_found',
  NO_DATA = 'no_data',
  LIMIT_BORROW = 'limit_borrow',
  BANNED = 'banned',
  TOKEN_NOT_VALID = 'token_not_valid',
}

export enum NotiCode {
  SUCCESS = 'SUCCESS',
  GREETING = 'GREETING',
  BOOK_BOOKED = 'BOOK_BOOKED',
  BOOK_RETURNED = 'BOOK_RETURNED',

  BOOK_IMPORT_PROCESSING = 'BOOK_IMPORT_PROCESSING',
  BOOK_IMPORT_SUCCESSFULLY = 'BOOK_IMPORT_SUCCESSFULLY',
  BOOK_EXCEEDED = 'BOOK_EXCEEDED',
  BOOK_EXISTED = 'BOOK_EXISTED',
  PAGING_OUT_RANGE = 'PAGING_OUT_RANGE',
}

export type NotiConfig = NotificationData & {
  code: ErrorCode | NotiCode;
};
