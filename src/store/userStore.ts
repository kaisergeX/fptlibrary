import {type StateCreator} from 'zustand';
import type {UserData} from '~/types';
import type {UserStore} from '~/types/store';

export const defaultUserData: UserData = {
  email: '',
};

export const createUserSlice: StateCreator<UserStore> = (set) => ({
  userData: defaultUserData,
  setUserData: (userData) => set(() => ({userData})),
  resetUserStore: () => set(() => ({userData: defaultUserData})),
});
