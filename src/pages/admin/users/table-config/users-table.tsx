import {ActionIcon, Image, Tooltip} from '@mantine/core';
import {
  IconCalendarEvent,
  IconSquareRoundedChevronsDownFilled,
  IconDiscountCheckFilled,
  IconPointFilled,
} from '@tabler/icons-react';
import {IconBan} from '@tabler/icons-react';
import dayjs from 'dayjs';
import {t} from 'i18next';
import type {DataTableColumn} from 'mantine-datatable';
import ZoomImage from '~/components/zoom-image';
import {RenderRole} from '~/constants';
import {confirmBanUser, confirmExtendExpiredDate, confirmPromoteUser, useStorage} from '~/store';
import type {UserManagament} from '~/types';
import {Role} from '~/types/store';
import {classNames} from '~/util';

export const usersColumnConfig: DataTableColumn<UserManagament>[] = [
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
  {
    accessor: 'expireDate',
    title: t('users.expireDate'),
    textAlign: 'center',
    render: ({role, expireDate}) =>
      role === Role.ADMIN ? (
        <div className="font-bold">
          <span className="text-gradient inline-block transition-colors dark:hidden">
            Unlimited
          </span>
        </div>
      ) : expireDate ? (
        dayjs(expireDate).format('DD/MM/YYYY')
      ) : (
        ''
      ),
  },
  {
    accessor: 'active',
    title: t('common.status'),
    textAlign: 'center',
    render: ({active, role}) => {
      const accountStatus = role === Role.ADMIN || active;

      return (
        <Tooltip label={t(accountStatus ? 'users.status.normal' : 'users.status.expired')}>
          <IconPointFilled
            className={classNames(
              'inline-block',
              accountStatus ? 'text-[--mantine-color-green-6]' : 'text-gray-300',
            )}
            size="1.8rem"
          />
        </Tooltip>
      );
    },
  },
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
          {rowData.role === Role.ADMIN && currentUser.email !== rowData.email && (
            <Tooltip label={t('users.demote')}>
              <ActionIcon
                variant="subtle"
                color="gray"
                onClick={() => (confirmPromoteUser.value = rowData)}
              >
                <IconSquareRoundedChevronsDownFilled size="1.2rem" />
              </ActionIcon>
            </Tooltip>
          )}
          {rowData.role === Role.READER && (
            <>
              <Tooltip label={t('users.promote')}>
                <ActionIcon
                  variant="subtle"
                  color="blue"
                  onClick={() => (confirmPromoteUser.value = rowData)}
                >
                  <IconDiscountCheckFilled size="1.2rem" />
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

          {currentUser.email === rowData.email || rowData.isBanned || (
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
