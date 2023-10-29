import {type StateCreator} from 'zustand';
import type {AuthState, AuthStore, PersistStore} from '~/types/store';

export const defaultAuthState: AuthState = {
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
  setToken: ({accessToken, refreshToken}) => set(() => ({accessToken, refreshToken})),
  setUID: (uid) => set(() => ({uid})),
  resetAuthStore: () => set(defaultAuthState),
});
