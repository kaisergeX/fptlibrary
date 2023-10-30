import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import type {NormalStore, PersistStore} from '~/types/store';
import {createAuthSlice} from './authStore';
import {createUserSlice} from './userStore';
import {createSystemPersistSlice} from './systemStore';

export const usePersistStore = create<PersistStore>()(
  persist(
    (...store) => ({
      ...createAuthSlice(...store),
      ...createSystemPersistSlice(...store),
    }),
    {
      name: 'F3 Library',
      partialize: ({uid, accessToken, theme}) => ({uid, accessToken, theme}),
      // storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export const useStorage = create<NormalStore>()((...store) => ({
  ...createUserSlice(...store),
}));
