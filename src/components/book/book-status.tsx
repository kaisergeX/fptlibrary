/* eslint-disable react-refresh/only-export-components */
import {Badge} from '@mantine/core';
import type {SelectCustomProps} from '../form/select-custom';
import {BOOK_ACTIONS, BookStatus} from '~/constants';
import {t} from 'i18next';

/**
 * `RETURNED` status now exists only for the purpose of data statistic such as on for the Orders history, dashboard overview, etc...
 *
 * This status must be hidden from any Book status select fields.
 *
 * For display the `RETURNED` status use {@link BookStatusWithReturned} instead
 */
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
      <Badge variant="light" color="grape" size="lg" radius="md">
        {t('book.status.IN_HAND')}
      </Badge>
    ),
  },
  {
    value: BookStatus.OFF.toString(),
    render: (
      <Badge variant="light" color="gray" size="lg" radius="md">
        {t('book.status.OFF')}
      </Badge>
    ),
  },
];

export const BookStatusWithReturned: SelectCustomProps['data'] = BookStatusOptions.toSpliced(3, 0, {
  value: BookStatus.RETURNED.toString(),
  render: (
    <Badge variant="light" color="dark" size="lg" radius="md">
      {t('book.status.RETURNED')}
    </Badge>
  ),
});

export const BookStatusFlow = [
  {
    currentStatus: BookStatus.BOOKED,
    newBookStatus: BookStatus.IN_HAND,
    newOrderStatus: BookStatus.IN_HAND,
    actionQR: BOOK_ACTIONS.IN_HAND,
    renderCurrentStatus: BookStatusWithReturned[BookStatus.BOOKED]?.render,
    renderNewStatus: BookStatusWithReturned[BookStatus.IN_HAND]?.render,
  },
  {
    currentStatus: BookStatus.IN_HAND,
    newBookStatus: BookStatus.AVAILABLE,
    newOrderStatus: BookStatus.RETURNED, // only Order has RETURNED status
    actionQR: BOOK_ACTIONS.RETURENED,
    renderCurrentStatus: BookStatusWithReturned[BookStatus.IN_HAND]?.render,
    renderNewStatus: BookStatusWithReturned[BookStatus.AVAILABLE]?.render,
  },
] as const;
