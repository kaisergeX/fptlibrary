import {ActionIcon, Image, Tooltip} from '@mantine/core';
import {IconCalendarEvent, IconDiscountCheckFilled} from '@tabler/icons-react';
import {IconUserCheck} from '@tabler/icons-react';
import {IconBan} from '@tabler/icons-react';
import {t} from 'i18next';
import type {DataTableColumn} from 'mantine-datatable';
import ZoomImage from '~/components/zoom-image';
import {
  confirmBanUnbanUser,
  confirmExtendExpiredDate,
  confirmPromoteUser,
  useStorage,
} from '~/store';
import type {UserManagament} from '~/types';
import {Role} from '~/types/store';

export const RenderRole = [
  {
    value: Role.ADMIN.toString(),
    label: t('role.admin'),
  },
  {
    value: Role.READER.toString(),
    label: t('role.reader'),
  },
];

export const usersColumnConfig: DataTableColumn<UserManagament>[] = [
  {accessor: 'id', title: 'Id', textAlign: 'center'},
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
  {
    accessor: 'role',
    title: t('role.title'),
    render: ({role}) => RenderRole[role].label,
  },
  {accessor: 'active', title: t('common.status')},
  {accessor: 'expireDate', title: t('users.expireDate')},
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
        <div className="flex-center gap-1">
          {rowData.role === Role.READER && (
            <>
              <Tooltip label={t('users.promote')}>
                <ActionIcon
                  variant="subtle"
                  color="blue"
                  onClick={() => (confirmPromoteUser.value = rowData)}
                >
                  <IconDiscountCheckFilled className="text-[--ai-color]" size="1.2rem" />
                </ActionIcon>
              </Tooltip>

              {rowData.isBanned || (
                <Tooltip label={t('users.extendExpireDate')}>
                  <ActionIcon
                    variant="subtle"
                    color="violet"
                    onClick={() => (confirmExtendExpiredDate.value = rowData)}
                  >
                    <IconCalendarEvent size="1.2rem" />
                  </ActionIcon>
                </Tooltip>
              )}
            </>
          )}

          {currentUser.email === rowData.email ||
            (rowData.isBanned ? (
              <Tooltip label={t('users.unban')}>
                <ActionIcon
                  variant="subtle"
                  color="teal"
                  onClick={() => (confirmBanUnbanUser.value = rowData)}
                >
                  <IconUserCheck size="1.2rem" />
                </ActionIcon>
              </Tooltip>
            ) : (
              <Tooltip label={t('users.ban')}>
                <ActionIcon
                  variant="subtle"
                  color="red"
                  onClick={() => (confirmBanUnbanUser.value = rowData)}
                >
                  <IconBan size="1.2rem" />
                </ActionIcon>
              </Tooltip>
            ))}
        </div>
      );
    },
  },
];
