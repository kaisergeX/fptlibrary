import {type StateCreator} from 'zustand';
import {Role, type AuthState, type AuthStore, type PersistStore} from '~/types/store';

export const defaultAuthState: AuthState = {
  isAuthenticated: false,
  uid: undefined,
  accessToken: undefined,
  refreshToken: undefined,
  role: Role.READER,
};

export const createAuthSlice: StateCreator<
  PersistStore,
  [['zustand/persist', unknown]],
  [],
  AuthStore
> = (set) => ({
  ...defaultAuthState,
  setRole: (role) => set(() => ({role})),
  setToken: ({accessToken, refreshToken}) =>
    set(() => {
      // @todo add logic check isAuthenticated if needed
      return {accessToken, refreshToken, isAuthenticated: !!accessToken};
    }),
  setUID: (uid) => set(() => ({uid})),
  resetAuthStore: () => set(defaultAuthState),
});
