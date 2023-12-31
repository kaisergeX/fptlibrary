import type {MantineThemeColors} from '@mantine/core';
import type {UserInfo} from '.';

export enum Role {
  ADMIN,
  READER,
}

/**
 * ===================================
 * Persisted storage
 * ===================================
 */
export type AuthState = {
  isAuthenticated: boolean;
  uid?: string;
  accessToken?: string;
  refreshToken?: string;
  role: Role;
};

export type AuthStore = AuthState & {
  setUID: (uid: string) => void;
  setToken: (token: {accessToken: string; refreshToken?: string}) => void;
  setRole: (role: Role) => void;
  resetAuthStore: () => void;
};

export type SystemPersistState = {
  theme: keyof MantineThemeColors;
  books: string[];
};

export type SystemPersistStore = SystemPersistState & {
  addBook: (bookId: string, showNoti?: boolean) => void;
  removeBook: (bookId: string, showNoti?: boolean) => void;
  setBooks: (bookIds: string[]) => void;
  setTheme: (theme: keyof MantineThemeColors) => void;
  resetPersistedSystemStore: () => void;
};

export type PersistStore = AuthStore & SystemPersistStore;

/**
 * ===================================
 * Normal storage
 * ===================================
 */
export type UserStoreState = {
  userInfo: UserInfo;
};

export type UserStore = UserStoreState & {
  setUserInfo: (userInfo: UserInfo) => void;
  resetUserInfo: () => void;
  resetUserStore: () => void;
};

export type NormalStore = UserStore;
