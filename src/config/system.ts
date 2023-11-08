import {SupportedLanguage} from '~/types';
import {safeAnyToNumber} from '~/util';

/**
 * Get & process environment variables (.env)
 */
export const SERVICE_NAME = import.meta.env.VITE_SERVICE_NAME || 'Library';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const maxSelectableBooks = safeAnyToNumber(import.meta.env.VITE_MAX_SELECTED_BOOKS, 3);
export const MAX_SELECTED_BOOKS = maxSelectableBooks < 0 ? 0 : maxSelectableBooks;

/**
 * Language config
 */
export const defaultLanguage = SupportedLanguage.VI;

/**
 * UI config
 */
/** How many genres carousel will be shown */
export const HOME_GENRE_COUNT: number = 2;
