import {Role} from '~/types/store';

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
  RECEIVED,
  INPROGRESS,
  DONE,
  ERROR,
}

export const BOOK_ACTIONS = {
  AVAILABLE: 'available',
  BOOKED: 'booked',
  IN_HAND: 'in_hand',
  // RETURENED: 'returned', // deprecated action
  OFF: 'off',
} as const;

export const DOCUMENTS_URL = {
  BOOKS_IMPORT_TEMPLATE: 'https://cudek.vn/media/common_media/file/import/Template.xlsm',
} as const;

/**
 * Labels need to be a valid key path of the `i18n` translation object.
 *
 * ref: `src/config/locales/vi.json`
 */
export const RenderRole = [
  {value: Role.ADMIN.toString(), label: 'role.admin'},
  {value: Role.READER.toString(), label: 'role.reader'},
] as const;
