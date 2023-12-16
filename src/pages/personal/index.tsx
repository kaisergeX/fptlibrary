import {ActionIcon, Avatar, Divider, Image, Tooltip} from '@mantine/core';
import {IconInfoCircleFilled} from '@tabler/icons-react';
import {IconDiscountCheckFilled, IconMail} from '@tabler/icons-react';
import dayjs from 'dayjs';
import {t} from 'i18next';
import type {DataTableColumn} from 'mantine-datatable';
import {useState} from 'react';
import {Trans, useTranslation} from 'react-i18next';
import {BookStatusWithReturned} from '~/components/book/book-status';
import DataGrid from '~/components/data-grid';
import ModalMembership from '~/components/modals/modal-membership';
import ZoomImage from '~/components/zoom-image';
import {API, QueryKey} from '~/constants/service';
import useAuth from '~/hook/useAuth';
import {Head} from '~/layout/outlet/Head';
import type {Orders} from '~/types';
import {Role} from '~/types/store';

const columnConfig: DataTableColumn<Orders>[] = [
  {
    accessor: 'book.cover',
    title: t('book.cover'),
    render: ({book}) => {
      const {title, cover, author, summary} = book;
      return (
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
      );
    },
    textAlign: 'center',
  },
  {accessor: 'book.title', title: t('common.title')},
  {accessor: 'book.author', title: t('book.author')},
  {accessor: 'book.publishYear', title: t('book.publishYear'), textAlign: 'center'},
  {
    accessor: 'book.genre',
    title: t('genre.def'),
    render: ({book}) =>
      book.genre?.map(({genreName, id}, index) => (
        <span key={id}>
          <Trans t={t}>genre.{genreName}</Trans>
          {index === book.genre.length - 1 || ', '}
        </span>
      )),
  },
  {
    accessor: 'book.ageTag.ageTagName',
    title: t('ageTag.def'),
    render: ({book}) => !book.ageTag || <Trans t={t}>ageTag.{book.ageTag.ageTagName}</Trans>,
  },
  {accessor: 'book.country.name', title: t('common.country')},
  {
    accessor: 'lastStatus',
    title: t('common.status'),
    render: ({lastStatus}) => BookStatusWithReturned[lastStatus]?.render,
  },
];

export default function PersonalPage() {
  const {userInfo, isLoadingUserInfo} = useAuth();
  const {t} = useTranslation();
  const [openRenewMembershipGuide, setOpenRenewMembershipGuide] = useState(false);
  const isAdmin = userInfo.role === Role.ADMIN;

  return (
    <div className="flex h-full flex-col gap-4 p-4">
      <Head title={t('account.bookRent')} />
      <div className="text-center">
        <div className="flex gap-4">
          <ZoomImage>
            <div className="flex-center">
              <Avatar src={userInfo.avatar} size="xl" radius="md" />
            </div>
          </ZoomImage>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-3xl font-bold">{userInfo.name}</h3>
              {isAdmin && (
                <Tooltip label={t('role.admin')}>
                  <div>
                    <IconDiscountCheckFilled className="text-[--mantine-color-blue-filled]" />
                  </div>
                </Tooltip>
              )}
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-400">
              <IconMail size="1rem" /> {userInfo.email}
            </div>
            <div className="mt-2 flex items-center gap-2">
              <h4>{t('users.expireDate')}:</h4>
              {isAdmin ? (
                <div className="font-bold">
                  <span className="text-gradient inline-block transition-colors dark:hidden">
                    Unlimited
                  </span>
                </div>
              ) : (
                <>
                  {userInfo.expireDate ? dayjs(userInfo.expireDate).format('DD/MM/YYYY') : ''}{' '}
                  {isLoadingUserInfo || dayjs(userInfo.expireDate).isAfter(dayjs()) || (
                    <div className="flex items-center">
                      <span className="font-bold text-rose-500">{t('users.status.expired')}</span>

                      <Tooltip
                        label={t('users.extendExpireDate')}
                        opened={!openRenewMembershipGuide}
                        withArrow
                        position="bottom"
                      >
                        <ActionIcon
                          variant="subtle"
                          color="red"
                          onClick={() => setOpenRenewMembershipGuide(true)}
                        >
                          <IconInfoCircleFilled size="1.2rem" />
                        </ActionIcon>
                      </Tooltip>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <Divider variant="dashed" />

      <h2 className="font-semibold">{t('account.bookRent')}</h2>
      <DataGrid<Orders>
        queryKey={QueryKey.ORDER_HISTORY}
        api={API.ORDER_HISTORY}
        columns={columnConfig}
      />

      <ModalMembership
        title={t('users.extendExpireDate')}
        opened={openRenewMembershipGuide}
        onClose={() => setOpenRenewMembershipGuide(false)}
      />
    </div>
  );
}
