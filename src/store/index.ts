import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import type {NormalStore, PersistStore} from '~/types/store';
import {createAuthSlice} from './authStore';
import {createUserSlice} from './userStore';
import {createSystemPersistSlice} from './systemStore';
import {SERVICE_NAME} from '~/config/system';

export const usePersistStore = create<PersistStore>()(
  persist(
    (...store) => ({
      ...createAuthSlice(...store),
      ...createSystemPersistSlice(...store),
    }),
    {
      name: SERVICE_NAME,
      partialize: ({uid, accessToken, theme}) => ({uid, accessToken, theme}),
      getStorage: () => sessionStorage, // create new store if needs to use other storage (eg: localStorage)
    },
  ),
);

export const useStorage = create<NormalStore>()((...store) => ({
  ...createUserSlice(...store),
}));
