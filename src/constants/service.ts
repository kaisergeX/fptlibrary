export const QueryKey = {
  MASTER_DATA_COUNTRIES: 'MASTER_DATA_COUNTRIES',
  BOOKS: 'BOOKS',
  GENRES: 'GENRES',
} as const;

export const API = {
  LOGIN: '/login',
  LOGOUT: '/rest-auth/logout',
  BOOKS: '/books?genre={genre}',
  BOOK_DETAIL: '/books/{id}',
  GENRES: '/genre',
} as const;
