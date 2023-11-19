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

export const BOOK_ACTIONS = {
  BOOKED: 'booked',
  IN_HAND: 'in_hand',
  RETURENED: 'returned',
  OFF: 'off',
  AVAILABLE: 'available',
} as const;
