export enum Path {
  HOMEPAGE = '/',
  AUTH = '/auth',
  LOGIN = '/auth/login',
  SIGNUP = '/auth/signup',

  PERSONAL = '/personal',

  LIBRARY = '/library',
  BOOK_BROWSING = '/library/books',
  BOOK_DETAIL = '/library/book/:id',

  CMS = '/portal',
  CMS_DASHBOARD = '/portal/dashboard',
  CMS_BOOK = '/portal/book',
  CMS_BOOK_MUTATION = '/portal/book/:id?/modify',
  CMS_BOOK_DETAIL = '/portal/book/:id',

  HIDDEN_FEATURES = '/not-easter-egg',
  PERMISSION_DENIED = '/permission-denied',
  UNDEFINED = '*',
}

export enum FullPath {}

export const SEARCH_PARAMS = {
  REDIRECT_URL: 'redirectUrl',
  GENRE: 'genre',
} as const;
