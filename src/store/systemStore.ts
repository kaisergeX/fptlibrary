import type {StateCreator} from 'zustand';
import type {PersistStore, SystemPersistState, SystemPersistStore} from '~/types/store';

const defaultPersistState: SystemPersistState = {
  theme: 'teal',
};

export const createSystemPersistSlice: StateCreator<
  PersistStore,
  [['zustand/persist', unknown]],
  [],
  SystemPersistStore
> = (set) => ({
  ...defaultPersistState,
  setTheme: (theme) => set(() => ({theme})),
  resetPersistedSystemStore: () => set(defaultPersistState),
});
