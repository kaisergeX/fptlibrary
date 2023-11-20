import {signal} from '@preact/signals-react';
import {type StateCreator} from 'zustand';
import type {Book, UserInfo} from '~/types';
import type {UserStore, UserStoreState} from '~/types/store';

const defaultUserInfo: UserInfo = {
  email: '',
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

export const confirmReturnBook = signal<Book | undefined>(undefined);
export const confirmRemoveBook = signal<Book | undefined>(undefined);
