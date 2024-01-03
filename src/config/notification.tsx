import {
  IconBan,
  IconBooks,
  IconCheck,
  IconConfetti,
  IconDatabaseExclamation,
  IconExclamationMark,
  IconInfoCircle,
  IconKeyOff,
  IconQuestionMark,
  IconSearch,
  IconUserX,
  IconWifiOff,
} from '@tabler/icons-react';
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
    icon: <IconQuestionMark />,
  },
  {
    id: ErrorCode.ERR_UNAUTHORIZED,
    code: ErrorCode.ERR_UNAUTHORIZED,
    title: t('common.error.unauthorized.title'),
    message: t('common.error.unauthorized.message'),
    color: 'red',
    icon: <IconUserX />,
  },
  {
    id: ErrorCode.ERR_BADREQUEST,
    code: ErrorCode.ERR_BADREQUEST,
    title: t('common.error.sthWrong.normal'),
    message: t('common.error.sthWrong.action'),
    color: 'red',
    icon: <IconExclamationMark />,
  },
  {
    id: ErrorCode.ERR_BAD_REQUEST,
    code: ErrorCode.ERR_BAD_REQUEST,
    title: t('common.error.sthWrong.normal'),
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
  {
    id: ErrorCode.QR_INVALID,
    code: ErrorCode.QR_INVALID,
    title: t('common.error.invalidQR.title'),
    message: t('common.error.invalidQR.message'),
    color: 'red',
    icon: <IconBan />,
    autoClose: false,
  },

  /**
   * Server Errors
   */
  {
    id: ErrorCode.NOT_FOUND,
    code: ErrorCode.NOT_FOUND,
    message: t('common.serverError.not_found'),
    color: 'red',
    icon: <IconSearch />,
  },
  {
    id: ErrorCode.NO_DATA,
    code: ErrorCode.NO_DATA,
    message: t('common.serverError.no_data'),
    color: 'red',
    icon: <IconDatabaseExclamation />,
  },
  {
    id: ErrorCode.LIMIT_BORROW,
    code: ErrorCode.LIMIT_BORROW,
    message: t('common.serverError.limit_borrow', {count: MAX_SELECTED_BOOKS}),
    color: 'red',
    icon: <IconBooks />,
  },
  {
    id: ErrorCode.BOOK_ALREADY_BORROWED,
    code: ErrorCode.BOOK_ALREADY_BORROWED,
    message: t('common.serverError.been_pre_ordered', {name: ''}),
    color: 'red',
    icon: <IconBooks />,
    autoClose: 8000,
  },
  {
    id: ErrorCode.BANNED,
    code: ErrorCode.BANNED,
    title: t('common.error.banned.title'),
    message: t('common.error.banned.message'),
    color: 'red',
    icon: <IconBan />,
    autoClose: false,
  },
  {
    id: ErrorCode.TOKEN_NOT_VALID,
    code: ErrorCode.TOKEN_NOT_VALID,
    message: t('common.serverError.token_not_valid'),
    color: 'red',
    icon: <IconKeyOff />,
  },

  /**
   * Success
   */
  {
    code: NotiCode.SUCCESS,
    message: t('common.success.title'),
    color: 'teal',
    icon: <IconCheck />,
  },
  {
    code: NotiCode.BOOK_BOOKED,
    message: t('common.success.action', {action: t('book.action.booked')}),
    color: 'teal',
  },
  {
    code: NotiCode.BOOK_RETURNED,
    message: t('common.success.action', {action: t('book.action.returned')}),
    color: 'teal',
  },
  {
    id: NotiCode.BOOK_IMPORT_SUCCESSFULLY,
    code: NotiCode.BOOK_IMPORT_SUCCESSFULLY,
    message: t('common.success.action', {action: t('import.importData')}),
    color: 'teal',
  },

  /**
   * Neutral notification
   */
  {
    id: NotiCode.GREETING,
    code: NotiCode.GREETING,
    message: t('common.greeting'),
    color: 'green',
    icon: <IconConfetti />,
  },
  {
    id: NotiCode.BOOK_IMPORT_PROCESSING,
    code: NotiCode.BOOK_IMPORT_PROCESSING,
    message: t('common.processing'),
    loading: true,
  },
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
    id: NotiCode.PAGING_OUT_RANGE,
    code: NotiCode.PAGING_OUT_RANGE,
    message: t('common.info.pagingOutRange'),
  },
];

const notiConfigs: NotiConfig[] = [];

i18next.on('languageChanged init', () =>
  notiConfigs.splice(0, notiConfigs.length, ...notiGenConfigs(i18next.t)),
);

export default notiConfigs;
