export enum SupportedLanguage {
  EN = 'en',
  VI = 'vi',
}

export enum BookStatus {
  AVAILABLE,
  BOOKED,
  IN_HAND,

  /**
   * RETURNED status now exists only for the purpose of related data statistic such as on for the Orders history, dashboard overview, etc...
   *
   * This status must be hidden and can NOT be selected on the Book create/update screens, etc...
   */
  RETURNED,
  OFF,
}

export enum ImportStatus {
  IMPORT_STATUS_RECEIVED,
  IMPORT_STATUS_INPROGRESS,
  IMPORT_STATUS_DONE,
  IMPORT_STATUS_ERROR,
}

export const BOOK_ACTIONS = {
  AVAILABLE: 'available',
  BOOKED: 'booked',
  IN_HAND: 'in_hand',
  // RETURENED: 'returned', // deprecated action
  OFF: 'off',
} as const;

export const DOCUMENTS_URL = {
  BOOKS_IMPORT_TEMPLATE: 'https://cudek.vn/media/common_media/file/import/Template.xlsx',
};
