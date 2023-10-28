import {createTheme} from '@mantine/core';
import {SupportedLanguage} from '~/types';

/**
 * Get & process environment variables (.env)
 */
export const SERVICE_NAME = import.meta.env.VITE_SERVICE_NAME || 'Library';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

/**
 * Language config
 */
export const defaultLanguage = SupportedLanguage.EN;

export const mantineThemeOverride = createTheme({});
