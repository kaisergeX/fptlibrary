import {type StateCreator} from 'zustand';
import type {UserInfo} from '~/types';
import {Role, type UserStore, type UserStoreState} from '~/types/store';

export const defaultUserInfo: UserInfo = {
  email: '',
  role: Role.READER,
};

const defaultUserState: UserStoreState = {
  userInfo: defaultUserInfo,
};

export const createUserSlice: StateCreator<UserStore> = (set) => ({
  ...defaultUserState,
  setUserInfo: (userInfo) => set(() => ({userInfo})),
  resetUserInfo: () => set(() => ({userInfo: defaultUserInfo})),
  resetUserStore: () => set(() => defaultUserState),
});
