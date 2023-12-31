import {type StateCreator} from 'zustand';
import {Role, type AuthState, type AuthStore, type PersistStore} from '~/types/store';
import {googleLogout} from '@react-oauth/google';
import {queryClient} from '~/config/system';
import {QueryKey} from '~/constants/service';

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
> = (set, get) => ({
  ...defaultAuthState,
  setRole: (role) => set(() => ({role})),
  setToken: ({accessToken, refreshToken}) =>
    set(() => {
      // add logic check isAuthenticated if needed
      return {accessToken, refreshToken, isAuthenticated: !!accessToken};
    }),
  setUID: (uid) => set(() => ({uid})),
  resetAuthStore: () => {
    get().setBooks([]);
    googleLogout();
    queryClient.removeQueries({queryKey: [QueryKey.USER_INFO]});
    set(defaultAuthState);
  },
});
