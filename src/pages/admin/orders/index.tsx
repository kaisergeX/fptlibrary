import {useTranslation} from 'react-i18next';
import DataGrid from '~/components/data-grid';
import {API, QueryKey} from '~/constants/service';
import CommonHeader from '~/layout/common-header';
import type {Orders} from '~/types';
import {Head} from '~/layout/outlet/Head';
import type {DataTableColumn} from 'mantine-datatable';
import i18next from 'i18next';
import ZoomImage from '~/components/zoom-image';
import {Image} from '@mantine/core';
import {Link, generatePath} from 'react-router-dom';
import {Path} from '~/config/path';
import {BookStatusWithReturned} from '~/components/book/book-status';

const ordersColumnConfig: DataTableColumn<Orders>[] = [
  {
    accessor: 'id',
    title: 'Id',
  },
  {
    accessor: 'user.name',
    title: i18next.t('common.account'),
    render: ({user}) => (
      <div className="flex items-center gap-2">
        {!user.avatar || (
          <ZoomImage>
            <div className="flex-center">
              <Image
                className="aspect-square h-8 rounded-full object-cover object-center"
                src={user.avatar}
                fallbackSrc={`https://placehold.co/100x150?text=${user.name}`}
                alt={`Book cover - ${user.name}`}
                loading="lazy"
              />
            </div>
          </ZoomImage>
        )}
        {user.name}
      </div>
    ),
  },
  {
    accessor: 'user.email',
    title: 'Email',
  },
  {
    accessor: 'book.id',
    title: i18next.t('book.id'),
    render: ({book}) => (
      <Link to={generatePath(Path.CMS_BOOK_DETAIL, {id: book.id})}>{book.id}</Link>
    ),
  },
  {
    accessor: 'book.title',
    title: i18next.t('common.title'),
  },
  {
    accessor: 'book.author',
    title: i18next.t('book.author'),
  },
  {
    accessor: 'lastStatus',
    title: i18next.t('common.status'),
    render: ({lastStatus}) => BookStatusWithReturned[lastStatus]?.render,
  },
];

export default function OrdersManagement() {
  const {t} = useTranslation();

  return (
    <div className="flex h-full flex-col">
      <Head title={t('orders.pageTitle')} />
      <CommonHeader title={t('orders.pageTitle')} />

      <DataGrid<Orders>
        queryKey={QueryKey.ORDERS_MANAGEMENT}
        api={API.ORDERS_MANAGEMENT}
        columns={ordersColumnConfig}
      />
    </div>
  );
}
