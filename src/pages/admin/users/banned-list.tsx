import DataGrid from '~/components/data-grid';
import SearchInput from '~/components/form/search-input';
import {API, QueryKey} from '~/constants/service';
import CommonHeader from '~/layout/common-header';
import {Head} from '~/layout/outlet/Head';
import type {UserManagament} from '~/types';
import {Modal, LoadingOverlay, Button} from '@mantine/core';
import {IconUserCheck} from '@tabler/icons-react';
import {confirmUnbanUser} from '~/store';
import {showNotification} from '@mantine/notifications';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {generatePath} from 'react-router-dom';
import {NotiCode} from '~/types/notification';
import {findNotiConfig} from '~/util';
import {http} from '~/util/http';
import {useEffect} from 'react';
import {bannedUsersColumnConfig} from './table-config/banned-users-table';
import {useTranslation} from 'react-i18next';

export default function BannedUsers() {
  const {t} = useTranslation();
  const queryClient = useQueryClient();

  const {isPending: isPendingUnbanUser, mutate: unbanUserMutate} = useMutation({
    mutationFn: (userId: UserManagament['id']) =>
      http.post(generatePath(API.USER_UNBAN, {id: userId.toString()})),
    onSuccess: async () => {
      confirmUnbanUser.value = undefined;
      await queryClient.invalidateQueries({queryKey: [QueryKey.USERS]});
      await queryClient.invalidateQueries({queryKey: [QueryKey.USERS_BANNED_LIST]});
      showNotification({
        ...findNotiConfig(NotiCode.SUCCESS),
        message: t('common.success.action', {action: t('users.unban')}),
      });
    },
  });

  useEffect(() => {
    return () => {
      confirmUnbanUser.value = undefined;
    };
  }, []);

  return (
    <div className="flex h-full flex-col">
      <Head title={t('users.bannedList.pageTitle')} />
      <CommonHeader title={t('users.bannedList.pageTitle')} />

      <div className="flex-center-between mb-4 gap-4 pr-2">
        <SearchInput />
      </div>

      <DataGrid<UserManagament>
        queryKey={QueryKey.USERS_BANNED_LIST}
        isLoading={isPendingUnbanUser}
        api={API.USERS_BANNED_LIST}
        columns={bannedUsersColumnConfig}
      />

      <Modal
        opened={!!confirmUnbanUser.value}
        onClose={() => (confirmUnbanUser.value = undefined)}
        title={t('common.confirm')}
        overlayProps={{backgroundOpacity: 0.5, blur: 2}}
        withCloseButton={!isPendingUnbanUser}
        centered
      >
        <LoadingOverlay visible={isPendingUnbanUser} />
        {!confirmUnbanUser.value || (
          <>
            <p className="mb-8 text-center">
              {t('users.confirm.unban')}:
              <br />
              <strong>{confirmUnbanUser.value.email}</strong> ({confirmUnbanUser.value.name})
            </p>
            <div className="flex items-center justify-end gap-4">
              <Button variant="outline" onClick={() => (confirmUnbanUser.value = undefined)}>
                {t('common.cancelAction')}
              </Button>
              <Button
                variant="filled"
                color="teal"
                leftSection={<IconUserCheck size="1.2rem" />}
                onClick={() => confirmUnbanUser.value && unbanUserMutate(confirmUnbanUser.value.id)}
                disabled={isPendingUnbanUser}
              >
                {t('users.unban')}
              </Button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}
