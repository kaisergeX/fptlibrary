export const QueryKey = {
  MASTER_DATA_COUNTRIES: 'MASTER_DATA_COUNTRIES',
  GENRES: 'GENRES',
  AGE_TAG: 'AGE_TAG',

  USER_INFO: 'USER_INFO',
  ORDER_BORROW: 'ORDER_BORROW',

  BOOKS: 'BOOKS',
  BOOK_DETAIL: 'BOOK_DETAIL',
  BOOK_IMPORT_DETAIL: 'BOOK_IMPORT_DETAIL',
} as const;

export const API = {
  COUNTRIES: '/country',
  GENRES: '/genre',
  AGE_TAGS: '/age-tag',

  LOGIN: '/login',
  USER_INFO: '/infor',
  LOGOUT: '/rest-auth/logout',

  ORDER_BORROW: '/order/borrow',

  BOOKS: '/books',
  BOOK_ACTIONS: '/action/:actionType/:id',
  BOOK_MUTATION: '/books/:id?',
  BOOK_DETAIL: '/books/:id',
  BOOK_REMOVE: '/books/:id',
  BOOK_IMPORT: '/import-book',
  BOOK_IMPORT_DETAIL: '/import-book/:id',
} as const;

export const DEFAULT_STALE_TIME = 300000; // 3m (= 3 * 60 * 1000 ms)
