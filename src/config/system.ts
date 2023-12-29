import type {DefaultMantineColor} from '@mantine/core';
import {QueryClient} from '@tanstack/react-query';
import {SupportedLanguage} from '~/constants';
import {DEFAULT_STALE_TIME} from '~/constants/service';
import {safeAnyToNumber} from '~/util';

/**
 * Get & process environment variables (.env)
 */
export const SERVICE_NAME = import.meta.env.VITE_SERVICE_NAME || 'Cudek';
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

const maxSelectableBooks = safeAnyToNumber(import.meta.env.VITE_MAX_SELECTED_BOOKS, 3);
export const MAX_SELECTED_BOOKS = maxSelectableBooks < 0 ? 0 : maxSelectableBooks;

/**
 * Language config
 */
export const defaultLanguage = SupportedLanguage.VI;

/**
 * Common components config
 */
export const PAGESIZE_OPTIONS = [10, 20, 50];
export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGESIZE = PAGESIZE_OPTIONS[0];
export const MAX_GENRES = 5;

/**
 * UI config
 */
export const DEFAULT_THEME_COLOR: DefaultMantineColor = 'dark';
/** How many genres carousel will be shown */
export const HOME_GENRE_COUNT: number = 3;

/**
 * Validation config
 */
export const ACCEPTED_IMAGE_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];
export const ACCEPTED_IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.avif'];
export const ACCEPTED_IMPORT_MIME_TYPES = [
  'application/vnd.ms-excel.sheet.macroEnabled.12',
  'application/vnd.ms-excel.sheet.macroenabled.12',
];
export const ACCEPTED_IMPORT_FILE_EXTENSIONS = ['.xlsm'];

export const MAX_FILE_SIZE_MB = 5; // 5MB
export const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024; // 5.242.880 Bytes

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {retry: false, staleTime: DEFAULT_STALE_TIME},
    mutations: {retry: false},
  },
});
