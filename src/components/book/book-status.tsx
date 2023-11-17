import {Badge} from '@mantine/core';
import type {SelectCustomProps} from '../form/select-custom';
import {BookStatus} from '~/constants';
import {t} from 'i18next';

export const BookStatusOptions: SelectCustomProps['data'] = [
  {
    value: BookStatus.AVAILABLE,
    render: (
      <Badge variant="light" color="blue" size="lg" radius="md">
        {t('book.status.AVAILABLE')}
      </Badge>
    ),
  },
  {
    value: BookStatus.BOOKED,
    render: (
      <Badge variant="light" color="green" size="lg" radius="md">
        {t('book.status.BOOKED')}
      </Badge>
    ),
  },
  {
    value: BookStatus.IN_HAND,
    render: (
      <Badge variant="light" color="violet" size="lg" radius="md">
        {t('book.status.IN_HAND')}
      </Badge>
    ),
  },
  {
    value: BookStatus.RETURNED,
    render: (
      <Badge variant="light" color="pink" size="lg" radius="md">
        {t('book.status.RETURNED')}
      </Badge>
    ),
  },
  {
    value: BookStatus.OFF,
    render: (
      <Badge variant="light" color="gray" size="lg" radius="md">
        {t('book.status.OFF')}
      </Badge>
    ),
  },
];