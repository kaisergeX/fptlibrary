import {type StateCreator} from 'zustand';
import type {AuthState, AuthStore, PersistStore} from '~/types/store';

export const defaultAuthState: AuthState = {
  isAuthenticated: false,
  uid: undefined,
  accessToken: undefined,
  refreshToken: undefined,
};

export const createAuthSlice: StateCreator<
  PersistStore,
  [['zustand/persist', unknown]],
  [],
  AuthStore
> = (set) => ({
  ...defaultAuthState,
  setToken: ({accessToken, refreshToken}) =>
    set(() => {
      // @todo add logic check isAuthenticated if needed
      return {accessToken, refreshToken, isAuthenticated: !!accessToken};
    }),
  setUID: (uid) => set(() => ({uid})),
  resetAuthStore: () => set(defaultAuthState),
});
