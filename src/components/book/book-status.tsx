import {Badge} from '@mantine/core';
import type {SelectCustomProps} from '../form/select-custom';
import {BookStatus} from '~/constants';
import {t} from 'i18next';

export const BookStatusOptions: SelectCustomProps['data'] = [
  {
    value: BookStatus.AVAILABLE.toString(),
    render: (
      <Badge variant="light" color="blue" size="lg" radius="md">
        {t('book.status.AVAILABLE')}
      </Badge>
    ),
  },
  {
    value: BookStatus.BOOKED.toString(),
    render: (
      <Badge variant="light" color="green" size="lg" radius="md">
        {t('book.status.BOOKED')}
      </Badge>
    ),
  },
  {
    value: BookStatus.IN_HAND.toString(),
    render: (
      <Badge variant="light" color="violet" size="lg" radius="md">
        {t('book.status.IN_HAND')}
      </Badge>
    ),
  },

  /**
   * RETURNED status now exists only for the purpose of related data statistic such as on for the Orders history, dashboard overview, etc...
   *
   * This status must be hidden from any Book status select field.
   */
  // {
  //   value: BookStatus.RETURNED.toString(),
  //   render: (
  //     <Badge variant="light" color="pink" size="lg" radius="md">
  //       {t('book.status.RETURNED')}
  //     </Badge>
  //   ),
  // },
  {
    value: BookStatus.OFF.toString(),
    render: (
      <Badge variant="light" color="gray" size="lg" radius="md">
        {t('book.status.OFF')}
      </Badge>
    ),
  },
];
