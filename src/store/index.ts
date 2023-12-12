import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import type {NormalStore, PersistStore} from '~/types/store';
import {createAuthSlice} from './authStore';
import {createSystemPersistSlice} from './systemStore';
import {createUserSlice} from './userStore';
import {signal} from '@preact/signals-react';
import type {Book, UserManagament} from '~/types';
import {SERVICE_NAME} from '~/config/system';

export const confirmRemoveBook = signal<Book | undefined>(undefined);
export const confirmBanUser = signal<UserManagament | undefined>(undefined);
export const confirmUnbanUser = signal<UserManagament | undefined>(undefined);
export const confirmPromoteUser = signal<UserManagament | undefined>(undefined);
export const confirmExtendExpiredDate = signal<UserManagament | undefined>(undefined);

export const usePersistStore = create<PersistStore>()(
  persist(
    (...store) => ({
      ...createAuthSlice(...store),
      ...createSystemPersistSlice(...store),
    }),
    {
      name: SERVICE_NAME,
      // partialize: ({uid, accessToken, refreshToken, theme, isAuthenticated}) => ({
      //   uid,
      //   isAuthenticated,
      //   accessToken,
      //   refreshToken,
      //   theme,
      // }),
      // storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export const useStorage = create<NormalStore>()((...store) => ({
  ...createUserSlice(...store),
}));
