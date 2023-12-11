import {Image} from '@mantine/core';
import {t} from 'i18next';
import type {DataTableColumn} from 'mantine-datatable';
import {BookStatusOptions} from '~/components/book/book-status';
import DataGrid from '~/components/data-grid';
import ZoomImage from '~/components/zoom-image';
import {API, QueryKey} from '~/constants/service';
import {Head} from '~/layout/outlet/Head';
import type {Book} from '~/types';

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
];

export default function PersonalPage() {
  return (
    <div className="flex h-full flex-col gap-4">
      <Head title={t('account.bookRent')} />
      <div className="container mx-auto pt-4">
        <h2 className="font-bold">{t('account.bookRent')}</h2>
      </div>
      <DataGrid<Book>
        queryKey={QueryKey.ORDER_BORROW}
        api={API.ORDER_BORROW}
        columns={columnConfig}
      />
    </div>
  );
}
