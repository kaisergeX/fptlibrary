export enum SupportedLanguage {
  EN = 'en',
  VI = 'vi',
}

export enum BookStatus {
  AVAILABLE,
  BOOKED,
  IN_HAND,
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
  BOOKED: 'booked',
  IN_HAND: 'in_hand',
  RETURENED: 'returned',
  OFF: 'off',
  AVAILABLE: 'available',
} as const;

export const DOCUMENTS_URL = {
  BOOKS_IMPORT_TEMPLATE: 'https://cudek.vn/media/common_media/file/import/Template.xlsx',
};
