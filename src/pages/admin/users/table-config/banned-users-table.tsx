import {ActionIcon, Image, Tooltip} from '@mantine/core';
import {IconUserCheck} from '@tabler/icons-react';
import {t} from 'i18next';
import type {DataTableColumn} from 'mantine-datatable';
import ZoomImage from '~/components/zoom-image';
import {RenderRole} from '~/constants';
import {confirmUnbanUser} from '~/store';
import type {UserManagament} from '~/types';

export const bannedUsersColumnConfig: DataTableColumn<UserManagament>[] = [
  {accessor: 'id', title: 'Id', textAlign: 'center'},
  {
    accessor: 'avatar',
    title: t('common.account'),
    render: ({name, avatar}) => (
      <div className="flex items-center gap-2">
        {avatar ? (
          <ZoomImage>
            <div className="flex-center">
              <Image
                className="aspect-square h-8 rounded-full object-cover object-center"
                src={avatar}
                fallbackSrc={`https://placehold.co/100x150?text=${name}`}
                alt={`Book cover - ${name}`}
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
          </ZoomImage>
        ) : (
          <></>
        )}
        {name}
      </div>
    ),
  },
  {accessor: 'email', title: 'Email'},
  {
    accessor: 'role',
    title: t('role.title'),
    textAlign: 'center',
    render: ({role}) => t(RenderRole[role].label),
  },
  {accessor: 'expireDate', title: t('users.expireDate'), textAlign: 'center'},
  {
    accessor: 'actions',
    title: t('common.actions'),
    textAlign: 'center',
    render: (rowData) => (
      <Tooltip label={t('users.unban')}>
        <ActionIcon
          variant="subtle"
          color="teal"
          onClick={() => (confirmUnbanUser.value = rowData)}
        >
          <IconUserCheck size="1.2rem" />
        </ActionIcon>
      </Tooltip>
    ),
  },
];
