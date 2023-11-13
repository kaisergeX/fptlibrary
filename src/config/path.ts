export enum Path {
  HOMEPAGE = '/',
  AUTH = '/auth',
  LOGIN = '/auth/login',
  SIGNUP = '/auth/signup',
  RENT = '/rent',

  LIBRARY = '/library',
  BOOK_BROWSING = '/library/books',
  BOOK_DETAIL = '/library/book/:id',

  CMS = '/cms',
  CMS_DASHBOARD = '/cms/dashboard',

  HIDDEN_FEATURES = '/not-easter-egg',
  PERMISSION_DENIED = '/permission-denied',
  UNDEFINED = '*',
}

export const SEARCH_PARAMS = {
  REDIRECT_URL: 'redirectUrl',
} as const;
