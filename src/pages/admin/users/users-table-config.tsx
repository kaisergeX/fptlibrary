import {ActionIcon, Image, Tooltip} from '@mantine/core';
import {IconUserCheck} from '@tabler/icons-react';
import {IconBan} from '@tabler/icons-react';
import {t} from 'i18next';
import type {DataTableColumn} from 'mantine-datatable';
import ZoomImage from '~/components/zoom-image';
import {confirmBanUser, confirmPromoteUser, useStorage} from '~/store';
import type {UserManagament} from '~/types';

export const usersColumnConfig: DataTableColumn<UserManagament>[] = [
  {
    accessor: 'avatar',
    title: t('common.avatar'),
    render: ({name, avatar}) =>
      avatar ? (
        <ZoomImage>
          <div className="flex-center">
            <Image
              className="aspect-square h-8 rounded-full object-cover object-center"
              src={avatar}
              fallbackSrc={`https://placehold.co/100x150?text=${name}`}
              alt={`Book cover - ${name}`}
              loading="lazy"
            />
          </div>
        </ZoomImage>
      ) : (
        <></>
      ),
    textAlign: 'center',
  },
  {accessor: 'name', title: t('common.name')},
  {accessor: 'email', title: 'Email'},
  {accessor: 'role', title: t('common.role')},
  {accessor: 'active', title: t('common.status')},
  {
    accessor: 'actions',
    title: t('common.actions'),
    textAlign: 'center',
    render: (rowData) => {
      const currentUser = useStorage.getState().userInfo;
      if (!currentUser) {
        return <></>;
      }

      return (
        <div className="flex-center gap-2">
          <Tooltip label={t('users.promote')}>
            <ActionIcon
              variant="subtle"
              color="teal"
              onClick={() => (confirmPromoteUser.value = rowData)}
            >
              <IconUserCheck size="1.2rem" />
            </ActionIcon>
          </Tooltip>
          {currentUser.email === rowData.email || (
            <Tooltip label={t('users.ban')}>
              <ActionIcon
                variant="subtle"
                color="red"
                onClick={() => (confirmBanUser.value = rowData)}
              >
                <IconBan size="1.2rem" />
              </ActionIcon>
            </Tooltip>
          )}
        </div>
      );
    },
  },
];
