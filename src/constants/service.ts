export const QueryKey = {
  MASTER_DATA_COUNTRIES: 'MASTER_DATA_COUNTRIES',
  GENRES: 'GENRES',
  AGE_TAG: 'AGE_TAG',

  BOOKS: 'BOOKS',
  BOOK_DETAIL: 'BOOK_DETAIL',
} as const;

export const API = {
  COUNTRIES: '/country',
  GENRES: '/genre',
  AGE_TAGS: '/age-tag',

  LOGIN: '/login',
  LOGOUT: '/rest-auth/logout',
  BOOKS: '/books',
  BOOK_DETAIL: '/books/:id',
} as const;

export const DEFAULT_STALE_TIME = 300000; // 5m (= 5 * 60 * 1000 ms)
