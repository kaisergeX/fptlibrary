export const QueryKey = {
  MASTER_DATA_COUNTRIES: 'MASTER_DATA_COUNTRIES',
  GENRES: 'GENRES',
  AGE_TAG: 'AGE_TAG',

  USER_INFO: 'USER_INFO',
  TOP_PAGE: 'TOP_PAGE',
  ORDER_BORROW: 'ORDER_BORROW',

  BOOKS: 'BOOKS',
  BOOK_DETAIL: 'BOOK_DETAIL',
  BOOK_IMPORT_DETAIL: 'BOOK_IMPORT_DETAIL',

  USERS: 'USERS',
} as const;

export const API = {
  COUNTRIES: '/country',
  GENRES: '/genre',
  AGE_TAGS: '/age-tag',

  LOGIN: '/login',
  USER_INFO: '/infor',
  LOGOUT: '/rest-auth/logout',

  TOP_PAGE: '/top-page',

  ORDER_BORROW: '/order/borrow',

  BOOKS: '/books',
  BOOK_ACTIONS: '/action/:actionType/:id',
  BOOK_MUTATION: '/books/:id?',
  BOOK_DETAIL: '/books/:id',
  BOOK_REMOVE: '/books/:id',
  BOOK_IMPORT: '/import-book',
  BOOK_IMPORT_DETAIL: '/import-book/:id',

  USERS: '/manage/user',
  USER_EXTEND_EXPIRED_DATE: '/manage/active-account/:id',
  USER_PROMOTE: '/manage/update-role/:id',
  USER_BAN: '/manage/ban-account/:id',
  USER_UNBAN: '/manage/unban-account/:id',
} as const;

export const DEFAULT_STALE_TIME = 300000; // 3m (= 3 * 60 * 1000 ms)
