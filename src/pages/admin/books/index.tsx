import {ActionIcon, Button, Drawer, Indicator, LoadingOverlay, Modal} from '@mantine/core';
import {IconFileSpreadsheet, IconFilter, IconPlus, IconTrash} from '@tabler/icons-react';
import {Link, generatePath, useSearchParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import DataGrid from '~/components/data-grid';
import {Path} from '~/config/path';
import {API, QueryKey} from '~/constants/service';
import CommonHeader from '~/layout/common-header';
import type {Book} from '~/types';
import {Head} from '~/layout/outlet/Head';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {http} from '~/util/http';
import {showNotification} from '@mantine/notifications';
import {NotiCode} from '~/types/notification';
import {findNotiConfig} from '~/util';
import {confirmRemoveBook} from '~/store';
import {useEffect, useMemo} from 'react';
import {useDisclosure} from '@mantine/hooks';
import BookFilter, {BOOK_FILTER_FORM_ID} from '~/components/book/book-filter';
import {countFilterType} from '~/util/filter';
import SearchInput from '~/components/form/search-input';
import {bookColumnConfig} from './book-table-config';
import ModalImport from '~/components/modals/modal-import';

export default function BookManagement() {
  const {t} = useTranslation();
  const queryClient = useQueryClient();
  const [filterOpened, {open: openFilter, close: closeFilter}] = useDisclosure(false);
  const [importModalOpened, {open: openImportModal, close: closeImportModal}] =
    useDisclosure(false);
  const [searchParams] = useSearchParams();
  const countFilter = useMemo(() => countFilterType(searchParams), [searchParams]);

  const {isPending, mutate: removeBookMutate} = useMutation({
    mutationFn: (removeBookId: Book['id']) =>
      http.delete(generatePath(API.BOOK_REMOVE, {id: removeBookId})),
    onSuccess: async () => {
      confirmRemoveBook.value = undefined;
      await queryClient.invalidateQueries({queryKey: [QueryKey.BOOKS]});
      showNotification({
        ...findNotiConfig(NotiCode.SUCCESS),
        message: t('common.success.action', {action: t('book.action.remove')}),
      });
    },
  });

  useEffect(() => {
    return () => {
      if (confirmRemoveBook.value) {
        confirmRemoveBook.value = undefined;
      }
    };
  }, []);

  return (
    <div className="flex h-full flex-col">
      <Head title={t('bookBrowsing.pageTitle')} />
      <CommonHeader title={t('bookBrowsing.pageTitle')}>
        <div className="flex items-center gap-4">
          <Button
            leftSection={<IconFileSpreadsheet />}
            variant="outline"
            color="teal"
            onClick={openImportModal}
          >
            {t('import.importData')}
          </Button>
          <Button
            component={Link}
            className="text-base"
            to={{pathname: generatePath(Path.CMS_BOOK_MUTATION), search: searchParams.toString()}}
            leftSection={<IconPlus />}
          >
            {t('book.add')}
          </Button>
        </div>
      </CommonHeader>

      <div className="flex-center-between mb-4 gap-4 pr-2">
        <SearchInput />
        <Indicator label={countFilter} size={16} disabled={countFilter === 0}>
          <Button
            className="hidden sm:block"
            variant="subtle"
            size="compact-md"
            rightSection={<IconFilter />}
            onClick={openFilter}
          >
            {t('book.filter')}
          </Button>
          <ActionIcon
            className="block sm:hidden"
            variant="subtle"
            size="compact-md"
            onClick={openFilter}
          >
            <IconFilter />
          </ActionIcon>
        </Indicator>
      </div>

      <DataGrid<Book>
        queryKey={QueryKey.BOOKS}
        isLoading={isPending}
        api={API.BOOKS}
        columns={bookColumnConfig}
      />

      <Drawer
        classNames={{
          content: 'flex flex-col gap-4 max-w-[calc(100%-1rem)]',
          body: 'flex-1 flex flex-col gap-4',
        }}
        opened={filterOpened}
        offset={8}
        radius="md"
        onClose={closeFilter}
        title={t('filter.query')}
        position="right"
        overlayProps={{backgroundOpacity: 0.5, blur: 2}}
      >
        <BookFilter className="flex-1 space-y-4" adminView />
        <div className="flex justify-end gap-4">
          <Button variant="outline" type="reset" form={BOOK_FILTER_FORM_ID} onClick={closeFilter}>
            {t('filter.reset')}
          </Button>
          <Button
            type="submit"
            form={BOOK_FILTER_FORM_ID}
            leftSection={<IconFilter />}
            onClick={closeFilter}
          >
            {t('common.confirm')}
          </Button>
        </div>
      </Drawer>

      <Modal
        opened={!!confirmRemoveBook.value}
        onClose={() => (confirmRemoveBook.value = undefined)}
        title={t('common.confirm')}
        overlayProps={{backgroundOpacity: 0.5, blur: 2}}
        withCloseButton={!isPending}
        centered
      >
        <LoadingOverlay visible={isPending} />
        <p className="mb-8">
          {t('book.confirm.remove')}: <strong>{confirmRemoveBook.value?.title}</strong>
        </p>
        <div className="flex items-center justify-end gap-4">
          <Button variant="outline" onClick={() => (confirmRemoveBook.value = undefined)}>
            {t('common.cancelAction')}
          </Button>
          <Button
            variant="filled"
            color="red"
            leftSection={<IconTrash size="1rem" />}
            onClick={() => confirmRemoveBook.value && removeBookMutate(confirmRemoveBook.value.id)}
            disabled={!confirmRemoveBook.value}
          >
            {t('book.action.remove')}
          </Button>
        </div>
      </Modal>
      <ModalImport opened={importModalOpened} onClose={closeImportModal} />
    </div>
  );
}
