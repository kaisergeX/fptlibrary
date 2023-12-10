import {ActionIcon, Image} from '@mantine/core';
import {IconEye, IconEdit, IconTrash} from '@tabler/icons-react';
import {t} from 'i18next';
import type {DataTableColumn} from 'mantine-datatable';
import {Trans} from 'react-i18next';
import {Link, generatePath} from 'react-router-dom';
import {BookStatusOptions} from '~/components/book/book-status';
import ZoomImage from '~/components/zoom-image';
import {Path} from '~/config/path';
import {BookStatus} from '~/constants';
import {confirmRemoveBook} from '~/store';
import type {Book} from '~/types';

export const bookColumnConfig: DataTableColumn<Book>[] = [
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
              variant="subtle"
              color="green"
              to={generatePath(Path.CMS_BOOK_DETAIL, {id})}
            >
              <IconEye size="1.2rem" />
            </ActionIcon>
            <ActionIcon
              component={Link}
              variant="subtle"
              color="blue"
              to={generatePath(Path.CMS_BOOK_MUTATION, {id})}
            >
              <IconEdit size="1.2rem" />
            </ActionIcon>
            <ActionIcon
              variant="subtle"
              color="red"
              onClick={() => (confirmRemoveBook.value = bookData)}
              disabled={
                bookData.status === BookStatus.IN_HAND || bookData.status === BookStatus.BOOKED
              }
            >
              <IconTrash size="1.2rem" />
            </ActionIcon>
          </div>
        )
      );
    },
  },
];
