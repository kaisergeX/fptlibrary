export const QueryKey = {
  MASTER_DATA_COUNTRIES: 'MASTER_DATA_COUNTRIES',
  GENRES: 'GENRES',
  AGE_TAG: 'AGE_TAG',

  BOOKS: 'BOOKS',
  BOOK_DETAIL: 'BOOK_DETAIL',
  BOOK_RENT_LIST: 'BOOK_RENT_LIST',
} as const;

export const API = {
  COUNTRIES: '/country',
  GENRES: '/genre',
  AGE_TAGS: '/age-tag',

  LOGIN: '/login',
  LOGOUT: '/rest-auth/logout',

  BOOKS: '/books',
  BOOK_RENT_LIST: '/book/borrow',
  BOOK_ACTIONS: '/action/:actionType/:id',
  BOOK_MUTATION: '/books/:id?',
  BOOK_DETAIL: '/books/:id',
  BOOK_REMOVE: '/books/:id',
} as const;

export const DEFAULT_STALE_TIME = 300000; // 3m (= 3 * 60 * 1000 ms)
