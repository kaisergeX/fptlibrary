import {ActionIcon, Button, Image, Modal} from '@mantine/core';
import {IconEdit, IconEye, IconPlus, IconTrash} from '@tabler/icons-react';
import {t} from 'i18next';
import type {DataTableColumn} from 'mantine-datatable';
import {Trans} from 'react-i18next';
import {Link, generatePath} from 'react-router-dom';
import DataGrid from '~/components/data-grid';
import {Path} from '~/config/path';
import {API, QueryKey} from '~/constants/service';
import CommonHeader from '~/layout/common-header';
import type {Book} from '~/types';
import ZoomImage from '~/components/zoom-image';
import {Head} from '~/layout/outlet/Head';
import {BookStatusOptions} from '~/components/book/book-status';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {http} from '~/util/http';
import {showNotification} from '@mantine/notifications';
import {NotiCode} from '~/types/notification';
import {findNotiConfig} from '~/util';
import {confirmRemoveBook} from '~/store/userStore';
import {useEffect} from 'react';

const columnConfig: DataTableColumn<Book>[] = [
  {
    accessor: 'cover',
    title: t('book.cover'),
    render: ({title, cover, author, summary}) => (
      <ZoomImage author={author} summary={summary}>
        <div className="flex-center">
          <Image
            className="aspect-[1/1.5] h-14 object-cover object-center"
            src={cover}
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
  {accessor: 'publishYear', title: t('book.publishYear'), textAlign: 'center'},
  {
    accessor: 'genre',
    title: t('genre.def'),
    render: ({genre}) =>
      genre.map(({genreName, id}, index) => (
        <span key={id}>
          <Trans t={t}>genre.{genreName}</Trans>
          {index === genre.length - 1 || ', '}
        </span>
      )),
  },
  {
    accessor: 'ageTag.ageTagName',
    title: t('common.title'),
    render: ({ageTag}) => !ageTag || <Trans t={t}>ageTag.{ageTag.ageTagName}</Trans>,
  },
  {accessor: 'country.name', title: t('common.country')},
  {
    accessor: 'status',
    title: t('common.status'),
    render: ({status}) => BookStatusOptions[status].render,
  },
  {
    accessor: 'actions',
    title: t('common.actions'),
    textAlign: 'right',
    render: (bookData) => {
      const id = bookData.id;
      return (
        id && (
          <div className="flex items-center justify-end gap-1">
            <ActionIcon
              component={Link}
              variant="light"
              color="green"
              to={generatePath(Path.CMS_BOOK_DETAIL, {id})}
            >
              <IconEye size="1.2rem" />
            </ActionIcon>
            <ActionIcon
              component={Link}
              color="blue"
              variant="light"
              to={generatePath(Path.CMS_BOOK_MUTATION, {id})}
            >
              <IconEdit size="1.2rem" />
            </ActionIcon>
            <ActionIcon
              color="red"
              variant="light"
              onClick={() => (confirmRemoveBook.value = bookData)}
            >
              <IconTrash size="1.2rem" />
            </ActionIcon>
          </div>
        )
      );
    },
  },
];

export default function BookManagement() {
  const queryClient = useQueryClient();
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
    <div className="flex h-full flex-col gap-4">
      <Head title={t('bookBrowsing.pageTitle')} />
      <CommonHeader title={t('bookBrowsing.pageTitle')}>
        <Button
          component={Link}
          className="text-base"
          to={generatePath(Path.CMS_BOOK_MUTATION)}
          leftSection={<IconPlus />}
        >
          {t('book.add')}
        </Button>
      </CommonHeader>

      <DataGrid<Book>
        queryKey={QueryKey.BOOKS}
        isLoading={isPending}
        api={API.BOOKS}
        columns={columnConfig}
      />

      <Modal
        opened={!!confirmRemoveBook.value}
        onClose={() => (confirmRemoveBook.value = undefined)}
        title={t('common.confirm')}
        centered
      >
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
            onClick={() => confirmRemoveBook.value && removeBookMutate(confirmRemoveBook.value.id)}
          >
            {t('book.action.remove')}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
