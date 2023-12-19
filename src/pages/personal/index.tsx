import {
  ActionIcon,
  Avatar,
  Button,
  Divider,
  Image,
  LoadingOverlay,
  Modal,
  Tooltip,
} from '@mantine/core';
import {showNotification} from '@mantine/notifications';
import {IconArrowBackUp} from '@tabler/icons-react';
import {IconInfoCircleFilled} from '@tabler/icons-react';
import {IconDiscountCheckFilled, IconMail} from '@tabler/icons-react';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import dayjs from 'dayjs';
import {t} from 'i18next';
import type {DataTableColumn} from 'mantine-datatable';
import {useEffect, useState} from 'react';
import {Trans, useTranslation} from 'react-i18next';
import {generatePath} from 'react-router-dom';
import {BookStatusWithReturned} from '~/components/book/book-status';
import DataGrid from '~/components/data-grid';
import ModalMembership from '~/components/modals/modal-membership';
import ZoomImage from '~/components/zoom-image';
import {BOOK_ACTIONS, BookStatus} from '~/constants';
import {API, QueryKey} from '~/constants/service';
import useAuth from '~/hook/useAuth';
import {Head} from '~/layout/outlet/Head';
import {confirmCancelBooking} from '~/store';
import type {Book, Orders} from '~/types';
import {NotiCode} from '~/types/notification';
import {Role} from '~/types/store';
import {findNotiConfig} from '~/util';
import {http} from '~/util/http';

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
  {
    accessor: 'actions',
    title: t('common.actions'),
    textAlign: 'center',
    render: (data) =>
      data?.lastStatus === BookStatus.BOOKED &&
      data.book?.id && (
        <ActionIcon
          variant="subtle"
          color="red"
          onClick={() => (confirmCancelBooking.value = data.book)}
        >
          <IconArrowBackUp size="1.2rem" />
        </ActionIcon>
      ),
  },
];

export default function PersonalPage() {
  const queryClient = useQueryClient();
  const {userInfo, isLoadingUserInfo} = useAuth();
  const {t} = useTranslation();
  const [openRenewMembershipGuide, setOpenRenewMembershipGuide] = useState(false);
  const isAdmin = userInfo.role === Role.ADMIN;

  const {isPending, mutate: cancelBookingMutate} = useMutation({
    mutationFn: (cancelBookId: Book['id']) =>
      http.post(
        generatePath(API.BOOK_ACTIONS, {actionType: BOOK_ACTIONS.CANCEL, id: cancelBookId}),
      ),
    onSuccess: async () => {
      confirmCancelBooking.value = undefined;
      await queryClient.invalidateQueries({queryKey: [QueryKey.ORDER_HISTORY]});
      await queryClient.invalidateQueries({queryKey: [QueryKey.BOOKS]});
      showNotification({
        ...findNotiConfig(NotiCode.SUCCESS),
        message: t('common.success.action', {action: t('book.action.cancel')}),
      });
    },
  });

  useEffect(() => {
    return () => {
      if (confirmCancelBooking.value) {
        confirmCancelBooking.value = undefined;
      }
    };
  }, []);

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
                  {isLoadingUserInfo || userInfo.active || (
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

      <Modal
        opened={!!confirmCancelBooking.value}
        onClose={() => (confirmCancelBooking.value = undefined)}
        title={t('common.confirm')}
        overlayProps={{backgroundOpacity: 0.5, blur: 2}}
        withCloseButton={!isPending}
        centered
      >
        <LoadingOverlay visible={isPending} />
        <p className="mb-8">
          {t('book.confirm.cancel')}: <strong>{confirmCancelBooking.value?.title}</strong>
        </p>
        <div className="flex items-center justify-end gap-4">
          <Button variant="outline" onClick={() => (confirmCancelBooking.value = undefined)}>
            {t('common.cancelAction')}
          </Button>
          <Button
            variant="filled"
            color="red"
            leftSection={<IconArrowBackUp size="1rem" />}
            onClick={() =>
              confirmCancelBooking.value && cancelBookingMutate(confirmCancelBooking.value.id)
            }
            disabled={!confirmCancelBooking.value}
          >
            {t('book.action.cancel')}
          </Button>
        </div>
      </Modal>

      <ModalMembership
        title={t('users.extendExpireDate')}
        opened={openRenewMembershipGuide}
        onClose={() => setOpenRenewMembershipGuide(false)}
      />
    </div>
  );
}
