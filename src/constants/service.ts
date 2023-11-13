export const QueryKey = {
  MASTER_DATA_COUNTRIES: 'MASTER_DATA_COUNTRIES',
  BOOKS: 'BOOKS',
  BOOK_DETAIL: 'BOOK_DETAIL',
  GENRES: 'GENRES',
} as const;

export const API = {
  LOGIN: '/login',
  LOGOUT: '/rest-auth/logout',
  BOOKS: '/books?genre={genre}',
  BOOK_DETAIL: '/books/{id}',
  GENRES: '/genre',
} as const;

export const DEFAULT_STALE_TIME = 300000; // 5m (= 5 * 60 * 1000 ms)
