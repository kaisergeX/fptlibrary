import {useTranslation} from 'react-i18next';
import DataGrid from '~/components/data-grid';
import SearchInput from '~/components/form/search-input';
import {API, QueryKey} from '~/constants/service';
import CommonHeader from '~/layout/common-header';
import {Head} from '~/layout/outlet/Head';
import type {ExtendExpiredDate, UserManagament} from '~/types';
import {usersColumnConfig} from './table-config/users-table';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {http} from '~/util/http';
import {generatePath} from 'react-router-dom';
import {confirmBanUser, confirmExtendExpiredDate, confirmPromoteUser} from '~/store';
import {showNotification} from '@mantine/notifications';
import {NotiCode} from '~/types/notification';
import {findNotiConfig} from '~/util';
import {Button, LoadingOverlay, Modal} from '@mantine/core';
import {
  IconBan,
  IconCalendarEvent,
  IconDiscountCheck,
  IconSquareRoundedChevronsDownFilled,
} from '@tabler/icons-react';
import {useEffect, useMemo, useState} from 'react';
import {DatePicker} from '@mantine/dates';
import dayjs from 'dayjs';
import {useComputed} from '@preact/signals-react';
import {Role} from '~/types/store';

export default function UserManagement() {
  const {t} = useTranslation();
  const queryClient = useQueryClient();

  const [extendDate, setExtendDate] = useState<Date | null>(null);

  const minExtendDate = useComputed(() => {
    const userExpireDate = confirmExtendExpiredDate.value?.expireDate;
    const expiredToday = dayjs().add(1, 'day').toDate();
    if (!userExpireDate) {
      return expiredToday;
    }

    return dayjs().isBefore(dayjs(userExpireDate))
      ? dayjs(userExpireDate).add(1, 'day').toDate()
      : expiredToday;
  });

  const {isPending: isPendingBanUser, mutate: banUserMutate} = useMutation({
    mutationFn: (userId: UserManagament['id']) =>
      http.post(generatePath(API.USER_BAN, {id: userId.toString()})),
    onSuccess: async () => {
      confirmBanUser.value = undefined;
      await queryClient.invalidateQueries({queryKey: [QueryKey.USERS]});
      showNotification({
        ...findNotiConfig(NotiCode.SUCCESS),
        message: t('common.success.action', {action: t('users.ban')}),
      });
      await queryClient.invalidateQueries({queryKey: [QueryKey.USERS_BANNED_LIST]});
    },
  });

  const {isPending: isPendingPromoteUser, mutate: promoteUserMutate} = useMutation({
    mutationFn: ({id: userId, role}: UserManagament) =>
      http.post(
        generatePath(role === Role.ADMIN ? API.USER_DEMOTE : API.USER_PROMOTE, {
          id: userId.toString(),
        }),
      ),
    onSuccess: async (_, {role}) => {
      confirmPromoteUser.value = undefined;
      await queryClient.invalidateQueries({queryKey: [QueryKey.USERS]});
      showNotification({
        ...findNotiConfig(NotiCode.SUCCESS),
        message: t('common.success.action', {
          action: t(role === Role.ADMIN ? 'users.demote' : 'users.promote'),
        }),
      });
    },
  });

  const {isPending: isPendingExtendExpiredDate, mutate: extendExpiredDateMutate} = useMutation({
    mutationFn: ({
      userId,
      expireDate,
    }: {
      userId: UserManagament['id'];
      expireDate: ExtendExpiredDate['expireDate'];
    }) =>
      http.post<unknown, ExtendExpiredDate>(
        generatePath(API.USER_EXTEND_EXPIRED_DATE, {id: userId.toString()}),
        {expireDate},
      ),
    onSuccess: async () => {
      confirmExtendExpiredDate.value = undefined;
      await queryClient.invalidateQueries({queryKey: [QueryKey.USERS]});
      showNotification({
        ...findNotiConfig(NotiCode.SUCCESS),
        message: t('common.success.action', {action: t('users.extendExpireDate')}),
      });
    },
  });

  const isTableLoading = isPendingBanUser || isPendingPromoteUser || isPendingExtendExpiredDate;

  const renderExtendDate = useMemo(() => {
    if (!extendDate) {
      return (
        <>
          {t('users.extendExpireDateTo')}: {t('book.notSelected')}
        </>
      );
    }

    const countDays = dayjs(extendDate).diff(dayjs().startOf('day'), 'day');
    const extendDateFormatted = dayjs(extendDate).format('DD/MM/YYYY');

    if (countDays < 0) {
      return (
        <>
          {t('users.newExpireDate')}:{' '}
          <strong>
            {extendDateFormatted} ({t('users.status.expired')})
          </strong>
        </>
      );
    }

    return (
      <>
        {t('users.extendExpireDateTo')}:{' '}
        <strong>
          {extendDateFormatted} ({t('common.countDay', {day: countDays})})
        </strong>
      </>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [extendDate]);

  useEffect(() => {
    return () => {
      confirmBanUser.value = undefined;
      confirmPromoteUser.value = undefined;
      confirmExtendExpiredDate.value = undefined;
    };
  }, []);

  return (
    <div className="flex h-full flex-col">
      <Head title={t('users.pageTitle')} />
      <CommonHeader title={t('users.pageTitle')} />

      <div className="flex-center-between mb-4 gap-4 pr-2">
        <SearchInput />
      </div>

      <DataGrid<UserManagament>
        queryKey={QueryKey.USERS}
        isLoading={isTableLoading}
        api={API.USERS}
        columns={usersColumnConfig}
      />

      <Modal
        opened={!!confirmExtendExpiredDate.value}
        onClose={() => {
          confirmExtendExpiredDate.value = undefined;
          setExtendDate(null);
        }}
        title={t('common.confirm')}
        overlayProps={{backgroundOpacity: 0.5, blur: 2}}
        withCloseButton={!isPendingExtendExpiredDate}
        centered
      >
        <LoadingOverlay visible={isPendingExtendExpiredDate} />
        {!confirmExtendExpiredDate.value || (
          <>
            <p className="text-center">
              {t('users.confirm.extendExpireDate')}
              <br />
              <strong>{confirmExtendExpiredDate.value.email}</strong> (
              {confirmExtendExpiredDate.value.name})
            </p>

            <div className="flex min-h-[25vh] justify-center py-4">
              <DatePicker
                value={extendDate}
                onChange={setExtendDate}
                defaultDate={minExtendDate.value}
                // minDate={minExtendDate.value} // clients requested to not disable any dates
              />
            </div>

            <p className="mb-8 text-center">
              {confirmExtendExpiredDate.value.expireDate && (
                <>
                  {t('users.expireDate')}:{' '}
                  {dayjs(confirmExtendExpiredDate.value.expireDate).format('DD/MM/YYYY')}
                  <br /> - <br />
                </>
              )}

              {renderExtendDate}
            </p>

            <div className="flex items-center justify-end gap-4">
              <Button
                variant="outline"
                onClick={() => {
                  confirmExtendExpiredDate.value = undefined;
                  setExtendDate(null);
                }}
              >
                {t('common.cancelAction')}
              </Button>
              <Button
                variant="filled"
                color="violet"
                leftSection={<IconCalendarEvent size="1.2rem" />}
                onClick={() => {
                  if (confirmExtendExpiredDate.value && extendDate) {
                    extendExpiredDateMutate({
                      userId: confirmExtendExpiredDate.value.id,
                      expireDate: dayjs(extendDate).format('YYYY-MM-DD'),
                    });
                  }
                }}
                disabled={!extendDate || isPendingExtendExpiredDate}
              >
                {t('users.extendExpireDate')}
              </Button>
            </div>
          </>
        )}
      </Modal>

      <Modal
        opened={!!confirmPromoteUser.value}
        onClose={() => (confirmPromoteUser.value = undefined)}
        title={t('common.confirm')}
        overlayProps={{backgroundOpacity: 0.5, blur: 2}}
        withCloseButton={!isPendingPromoteUser}
        centered
      >
        <LoadingOverlay visible={isPendingPromoteUser} />
        {!confirmPromoteUser.value || (
          <>
            <p className="mb-8 text-center">
              {t(
                confirmPromoteUser.value.role === Role.ADMIN
                  ? 'users.confirm.demote'
                  : 'users.confirm.promote',
              )}
              :
              <br />
              <strong>{confirmPromoteUser.value.email}</strong> ({confirmPromoteUser.value.name})
            </p>
            <div className="flex items-center justify-end gap-4">
              <Button variant="outline" onClick={() => (confirmPromoteUser.value = undefined)}>
                {t('common.cancelAction')}
              </Button>

              {confirmPromoteUser.value.role === Role.ADMIN ? (
                <Button
                  variant="filled"
                  color="gray"
                  leftSection={<IconSquareRoundedChevronsDownFilled size="1.2rem" />}
                  onClick={() =>
                    confirmPromoteUser.value && promoteUserMutate(confirmPromoteUser.value)
                  }
                  disabled={isPendingPromoteUser}
                >
                  {t('users.demote')}
                </Button>
              ) : (
                <Button
                  variant="filled"
                  color="blue"
                  leftSection={<IconDiscountCheck size="1.2rem" />}
                  onClick={() =>
                    confirmPromoteUser.value && promoteUserMutate(confirmPromoteUser.value)
                  }
                  disabled={isPendingPromoteUser}
                >
                  {t('users.promote')}
                </Button>
              )}
            </div>
          </>
        )}
      </Modal>

      <Modal
        opened={!!confirmBanUser.value}
        onClose={() => (confirmBanUser.value = undefined)}
        title={t('common.confirm')}
        overlayProps={{backgroundOpacity: 0.5, blur: 2}}
        withCloseButton={!isPendingBanUser}
        centered
      >
        <LoadingOverlay visible={isPendingBanUser} />
        {!confirmBanUser.value || (
          <>
            <p className="mb-8 text-center">
              {t('users.confirm.ban')}:
              <br />
              <strong>{confirmBanUser.value.email}</strong> ({confirmBanUser.value.name})
            </p>
            <div className="flex items-center justify-end gap-4">
              <Button variant="outline" onClick={() => (confirmBanUser.value = undefined)}>
                {t('common.cancelAction')}
              </Button>
              <Button
                variant="filled"
                color="red"
                leftSection={<IconBan size="1.2rem" />}
                onClick={() => confirmBanUser.value && banUserMutate(confirmBanUser.value.id)}
                disabled={isPendingBanUser}
              >
                {t('users.ban')}
              </Button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}
