import {IconExclamationMark, IconInfoCircle, IconWifiOff} from '@tabler/icons-react';
import i18next from 'i18next';
import {ErrorCode, NotiCode, type NotiConfig} from '~/types/notification';
import {MAX_SELECTED_BOOKS} from './system';

const notiGenConfigs = (t: (typeof i18next)['t']): NotiConfig[] => [
  /**
   * Error notification
   */
  {
    code: ErrorCode.ERR,
    message: t('common.error.sthWrong.action'),
    color: 'red',
    icon: <IconExclamationMark />,
  },
  {
    code: ErrorCode.ERR_NETWORK,
    title: t('common.error.network.title'),
    message: t('common.error.network.message'),
    color: 'red',
    icon: <IconWifiOff />,
  },

  /**
   * Success
   */
  {
    code: NotiCode.SUCCESS,
    message: t('common.success.title'),
    color: 'teal',
    icon: <IconExclamationMark />,
  },

  /**
   * Neutral notification
   */
  {
    code: NotiCode.BOOK_EXCEEDED,
    title: t('book.exceeded.title', {count: MAX_SELECTED_BOOKS}),
    message: t('book.exceeded.description'),
    icon: <IconInfoCircle />,
  },
  {
    code: NotiCode.BOOK_EXISTED,
    message: t('book.existed.rent'),
    icon: <IconInfoCircle />,
  },
  {
    code: NotiCode.PAGING_OUT_RANGE,
    message: t('common.info.pagingOutRange'),
  },
];

const notiConfigs: NotiConfig[] = [];

i18next.on('languageChanged init', () =>
  notiConfigs.splice(0, notiConfigs.length, ...notiGenConfigs(i18next.t)),
);

export default notiConfigs;
