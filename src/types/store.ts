import type {MantineThemeColors} from '@mantine/core';
import type {UserData} from '.';

/**
 * ===================================
 * Persisted storage
 * ===================================
 */
export type AuthState = {
  uid?: string;
  accessToken?: string;
  refreshToken?: string;
};

export type AuthStore = AuthState & {
  setUID: (uid: string) => void;
  setToken: (token: {accessToken: string; refreshToken: string}) => void;
  resetAuthStore: () => void;
};

export type SystemPersistState = {
  theme: keyof MantineThemeColors;
};

export type SystemPersistStore = SystemPersistState & {
  setTheme: (theme: keyof MantineThemeColors) => void;
  resetPersistedSystemStore: () => void;
};

export type PersistStore = AuthStore & SystemPersistStore;

/**
 * ===================================
 * Normal storage
 * ===================================
 */
export type UserStore = {
  userData: UserData;
  setUserData: (userData: UserData) => void;
  resetUserStore: () => void;
};

export type NormalStore = UserStore;
