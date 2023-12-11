import {useTranslation} from 'react-i18next';
import DataGrid from '~/components/data-grid';
import SearchInput from '~/components/form/search-input';
import {API, QueryKey} from '~/constants/service';
import CommonHeader from '~/layout/common-header';
import {Head} from '~/layout/outlet/Head';
import type {ExtendExpiredDate, UserManagament} from '~/types';
import {usersColumnConfig} from './users-table-config';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {http} from '~/util/http';
import {generatePath} from 'react-router-dom';
import {confirmBanUnbanUser, confirmExtendExpiredDate, confirmPromoteUser} from '~/store';
import {showNotification} from '@mantine/notifications';
import {NotiCode} from '~/types/notification';
import {findNotiConfig} from '~/util';
import {Button, LoadingOverlay, Modal} from '@mantine/core';
import {IconBan, IconCalendarEvent, IconDiscountCheck} from '@tabler/icons-react';
import {useEffect, useState} from 'react';
import {DatePicker} from '@mantine/dates';
import dayjs from 'dayjs';
import {useComputed} from '@preact/signals-react';

export default function UserManagement() {
  const {t} = useTranslation();
  const queryClient = useQueryClient();

  const [extendDate, setExtendDate] = useState<Date | null>(null);

  const processedExpireDate = useComputed(() => {
    const userExpireDate = confirmExtendExpiredDate.value?.expireDate;
    const expiredToday = dayjs().add(1, 'day').toDate();
    if (!userExpireDate) {
      return {minExtendDate: expiredToday};
    }

    return {
      currentExpiredDate: dayjs(userExpireDate).toDate(),
      minExtendDate: dayjs().isBefore(dayjs(userExpireDate))
        ? dayjs(userExpireDate).add(1, 'day').toDate()
        : expiredToday,
    };
  });

  const {isPending: isPendingBanUnbanUser, mutate: banUnbanUserMutate} = useMutation({
    mutationFn: ({userId, isBanned}: {userId: UserManagament['id']; isBanned: boolean}) =>
      http.post(generatePath(isBanned ? API.USER_UNBAN : API.USER_BAN, {id: userId.toString()})),
    onSuccess: async (_, {isBanned}) => {
      confirmBanUnbanUser.value = undefined;
      await queryClient.invalidateQueries({queryKey: [QueryKey.USERS]});
      showNotification({
        ...findNotiConfig(NotiCode.SUCCESS),
        message: t('common.success.action', {action: t(isBanned ? 'users.unban' : 'users.ban')}),
      });
    },
  });

  const {isPending: isPendingPromoteUser, mutate: promoteUserMutate} = useMutation({
    mutationFn: (userId: UserManagament['id']) =>
      http.post(generatePath(API.USER_PROMOTE, {id: userId.toString()})),
    onSuccess: async () => {
      confirmBanUnbanUser.value = undefined;
      await queryClient.invalidateQueries({queryKey: [QueryKey.USERS]});
      showNotification({
        ...findNotiConfig(NotiCode.SUCCESS),
        message: t('common.success.action', {action: t('users.promote')}),
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

  const isTableLoading =
    isPendingBanUnbanUser || isPendingPromoteUser || isPendingExtendExpiredDate;

  useEffect(() => {
    return () => {
      confirmBanUnbanUser.value = undefined;
      confirmPromoteUser.value = undefined;
      // confirmExtendExpiredDate.value = undefined;
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
        onClose={() => (confirmExtendExpiredDate.value = undefined)}
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
                defaultDate={processedExpireDate.value.currentExpiredDate}
                minDate={processedExpireDate.value.minExtendDate}
              />
            </div>

            <p className="mb-8 text-center">
              {confirmExtendExpiredDate.value.expireDate && (
                <>
                  {t('users.expireDate')}:{' '}
                  {dayjs(confirmExtendExpiredDate.value.expireDate).format('DD/MM/YYYY')}
                  <br />
                </>
              )}
              {t('users.newExpireDate')}:{' '}
              {extendDate ? (
                <strong>
                  {dayjs(extendDate).format('DD/MM/YYYY')} -{' '}
                  {t('common.countDay', {
                    day: dayjs(extendDate).diff(dayjs(), 'day') + 1,
                  })}
                </strong>
              ) : (
                t('book.notSelected')
              )}
            </p>

            <div className="flex items-center justify-end gap-4">
              <Button
                variant="outline"
                onClick={() => (confirmExtendExpiredDate.value = undefined)}
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
            <p className="mb-8">
              {t('users.confirm.promote')}:
              <br />
              <strong>{confirmPromoteUser.value.email}</strong> ({confirmPromoteUser.value.name})
            </p>
            <div className="flex items-center justify-end gap-4">
              <Button variant="outline" onClick={() => (confirmPromoteUser.value = undefined)}>
                {t('common.cancelAction')}
              </Button>
              <Button
                variant="filled"
                color="blue"
                leftSection={<IconDiscountCheck size="1.2rem" />}
                onClick={() =>
                  confirmPromoteUser.value && promoteUserMutate(confirmPromoteUser.value.id)
                }
                disabled={isPendingPromoteUser}
              >
                {t('users.promote')}
              </Button>
            </div>
          </>
        )}
      </Modal>

      <Modal
        opened={!!confirmBanUnbanUser.value}
        onClose={() => (confirmBanUnbanUser.value = undefined)}
        title={t('common.confirm')}
        overlayProps={{backgroundOpacity: 0.5, blur: 2}}
        withCloseButton={!isPendingBanUnbanUser}
        centered
      >
        <LoadingOverlay visible={isPendingBanUnbanUser} />
        {!confirmBanUnbanUser.value || (
          <>
            <p className="mb-8">
              {t(confirmBanUnbanUser.value.isBanned ? 'users.confirm.unban' : 'users.confirm.ban')}:
              <br />
              <strong>{confirmBanUnbanUser.value.email}</strong> ({confirmBanUnbanUser.value.name})
            </p>
            <div className="flex items-center justify-end gap-4">
              <Button variant="outline" onClick={() => (confirmBanUnbanUser.value = undefined)}>
                {t('common.cancelAction')}
              </Button>
              <Button
                variant="filled"
                color="red"
                leftSection={<IconBan size="1.2rem" />}
                onClick={() =>
                  confirmBanUnbanUser.value &&
                  banUnbanUserMutate({
                    userId: confirmBanUnbanUser.value.id,
                    isBanned: confirmBanUnbanUser.value.isBanned,
                  })
                }
                disabled={isPendingBanUnbanUser}
              >
                {t(confirmBanUnbanUser.value.isBanned ? 'users.unban' : 'users.ban')}
              </Button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}