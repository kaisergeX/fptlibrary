export enum Path {
  HOMEPAGE = '/',
  AUTH = '/auth',
  LOGIN = '/auth/login',

  PERSONAL = '/personal',

  LIBRARY = '/library',
  BOOK_BROWSING = '/library/books',
  BOOK_DETAIL = '/library/book/:id',

  CMS = '/portal',
  CMS_DASHBOARD = '/portal/dashboard',
  CMS_QR = '/portal/qr-action',
  CMS_QR_ACTIONS = '/portal/qr-action/:bookId?',
  CMS_BOOK = '/portal/book',
  CMS_BOOK_MUTATION = '/portal/book/:id?/modify',
  CMS_BOOK_DETAIL = '/portal/book/:id',
  CMS_USERS = '/portal/users',
  CMS_USERS_BANNED = '/portal/users/banned',
  CMS_ORDERS = '/portal/orders',

  SETTING = '/setting',
  HIDDEN_FEATURES = '/not-easter-egg',
  PERMISSION_DENIED = '/permission-denied',
  UNDEFINED = '*',
}

export enum FullPath {}

export const SEARCH_PARAMS = {
  REDIRECT_URL: 'redirectUrl',
  SEARCH: 'search',
  GENRE: 'genre',
  COUNTRY: 'country',
  AGE_TAG: 'ageTag',
  STATUS: 'status',
  PAGE: 'page',
  PAGE_SIZE: 'pageSize',
} as const;
