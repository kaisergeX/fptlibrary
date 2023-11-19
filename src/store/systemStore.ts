import {showNotification} from '@mantine/notifications';
import {t} from 'i18next';
import type {StateCreator} from 'zustand';
import {DEFAULT_THEME_COLOR, MAX_SELECTED_BOOKS} from '~/config/system';
import {NotiCode} from '~/types/notification';
import type {PersistStore, SystemPersistState, SystemPersistStore} from '~/types/store';
import {findNotiConfig} from '~/util';

const defaultPersistState: SystemPersistState = {
  theme: DEFAULT_THEME_COLOR,
  books: [],
};

export const createSystemPersistSlice: StateCreator<
  PersistStore,
  [['zustand/persist', unknown]],
  [],
  SystemPersistStore
> = (set, get) => ({
  ...defaultPersistState,
  addBook: (bookId, showNoti = true) => {
    const currBookList = structuredClone(get().books);
    if (currBookList.length >= MAX_SELECTED_BOOKS) {
      if (showNoti) {
        showNotification(findNotiConfig(NotiCode.BOOK_EXCEEDED));
      }

      return;
    }

    if (currBookList.includes(bookId)) {
      showNotification(findNotiConfig(NotiCode.BOOK_EXISTED));
      return;
    }
    currBookList.push(bookId);
    set(() => ({books: [...new Set(currBookList)]}));

    if (showNoti) {
      showNotification({
        ...findNotiConfig(NotiCode.SUCCESS),
        message: t('common.success.action', {action: t('common.add')}),
      });
    }
  },
  removeBook: (bookId, showNoti = true) => {
    const currBookList = structuredClone(get().books);
    const removeBookIdx = currBookList.findIndex((id) => id === bookId);
    if (removeBookIdx === -1) {
      return;
    }

    currBookList.splice(removeBookIdx, 1); // .toSpliced() require Node@20 so can't use now
    set(() => ({books: currBookList}));
    if (showNoti) {
      showNotification({
        ...findNotiConfig(NotiCode.SUCCESS),
        message: t('common.success.action', {action: t('common.delete')}),
      });
    }
  },
  setBooks: (bookIds) => set(() => ({books: [...new Set(bookIds)].slice(0, MAX_SELECTED_BOOKS)})),
  setTheme: (theme) => set(() => ({theme})),
  resetPersistedSystemStore: () => set(defaultPersistState),
});
