import {Button, Image, Modal} from '@mantine/core';
import {showNotification} from '@mantine/notifications';
import {IconArrowBackUp} from '@tabler/icons-react';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {t} from 'i18next';
import type {DataTableColumn} from 'mantine-datatable';
import {useEffect} from 'react';
import {generatePath} from 'react-router-dom';
import {BookStatusOptions} from '~/components/book/book-status';
import DataGrid from '~/components/data-grid';
import ZoomImage from '~/components/zoom-image';
import {BOOK_ACTIONS, BookStatus} from '~/constants';
import {API, QueryKey} from '~/constants/service';
import {Head} from '~/layout/outlet/Head';
import {confirmReturnBook} from '~/store/userStore';
import type {Book} from '~/types';
import {NotiCode} from '~/types/notification';
import {findNotiConfig} from '~/util';
import {http} from '~/util/http';

const columnConfig: DataTableColumn<Book>[] = [
  {
    accessor: 'cover',
    title: t('book.cover'),
    render: ({title, cover, author, summary}) => (
      <ZoomImage author={author} summary={summary}>
        <div className="flex-center">
          <Image
            className="aspect-[1/1.5] h-14 object-cover object-center"
            src={`https://closens.com/${cover}`}
            fallbackSrc={`https://placehold.co/100x150?text=${title}`}
            alt={`Book cover - ${title}`}
            loading="lazy"
          />
        </div>
      </ZoomImage>
    ),
    textAlign: 'center',
  },
  {accessor: 'title', title: t('common.title')},
  {accessor: 'author', title: t('book.author')},
  {
    accessor: 'status',
    title: t('common.status'),
    render: ({status}) => BookStatusOptions[status].render,
  },
  {
    accessor: 'actions',
    title: t('common.actions'),
    textAlign: 'right',
    render: (bookData) =>
      bookData.id &&
      bookData.status === BookStatus.IN_HAND && (
        <Button
          leftSection={<IconArrowBackUp size="1rem" />}
          variant="outline"
          onClick={() => (confirmReturnBook.value = bookData)}
        >
          {t('book.action.returned')}
        </Button>
      ),
  },
];

export default function PersonalPage() {
  const queryClient = useQueryClient();
  const {isPending, mutate: returnBookMutate} = useMutation({
    mutationFn: (returnBookId: Book['id']) =>
      http.post(
        generatePath(API.BOOK_ACTIONS, {id: returnBookId, actionType: BOOK_ACTIONS.RETURENED}),
      ),
    onSuccess: async (_, returnBookId) => {
      confirmReturnBook.value = undefined;
      await queryClient.invalidateQueries({queryKey: [QueryKey.BOOKS]});
      await queryClient.invalidateQueries({queryKey: [QueryKey.BOOK_DETAIL, returnBookId]});
      await queryClient.invalidateQueries({queryKey: [QueryKey.BOOK_RENT_LIST]});
      showNotification({
        ...findNotiConfig(NotiCode.SUCCESS),
        message: t('common.success.action', {action: t('book.action.returned')}),
      });
    },
  });

  useEffect(() => {
    return () => {
      if (confirmReturnBook.value) {
        confirmReturnBook.value = undefined;
      }
    };
  }, []);

  return (
    <div className="flex h-full flex-col gap-4">
      <Head title={t('account.bookRent')} />
      <div className="container mx-auto pt-4">
        <h2 className="font-bold">{t('account.bookRent')}</h2>
      </div>
      <DataGrid<Book>
        queryKey={QueryKey.BOOK_RENT_LIST}
        isLoading={isPending}
        api={API.BOOK_RENT_LIST}
        columns={columnConfig}
      />

      <Modal
        opened={!!confirmReturnBook.value}
        onClose={() => (confirmReturnBook.value = undefined)}
        title={t('common.confirm')}
        centered
      >
        <p className="mb-8">
          {t('book.confirm.return')}: <strong>{confirmReturnBook.value?.title}</strong>
        </p>
        <div className="flex items-center justify-end gap-4">
          <Button variant="outline" onClick={() => (confirmReturnBook.value = undefined)}>
            {t('common.cancelAction')}
          </Button>
          <Button
            variant="filled"
            onClick={() => confirmReturnBook.value && returnBookMutate(confirmReturnBook.value.id)}
          >
            {t('book.action.remove')}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
