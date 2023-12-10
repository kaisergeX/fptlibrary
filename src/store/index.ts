import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import type {PersistStore} from '~/types/store';
import {createAuthSlice} from './authStore';
import {createSystemPersistSlice} from './systemStore';
import {signal} from '@preact/signals-react';
import type {Book} from '~/types';
import {SERVICE_NAME} from '~/config/system';

export const confirmReturnBook = signal<Book | undefined>(undefined);
export const confirmRemoveBook = signal<Book | undefined>(undefined);

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

// export const useStorage = create<NormalStore>()((...store) => ({
//   ...createUserSlice(...store),
// }));
