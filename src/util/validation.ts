import {t} from 'i18next';
import {z} from 'zod';
import {ACCEPTED_IMAGE_MIME_TYPES, MAX_FILE_SIZE} from '~/config/system';

export const zodImage = z
  .custom<File>((v) => v instanceof File, {
    message: t('common.validation.required'),
  })
  .refine((file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file.type), {
    message: t('common.validation.imageFileType', {
      mimeTypes: ACCEPTED_IMAGE_MIME_TYPES.join(', '),
    }),
  })
  .refine((file) => file.size >= MAX_FILE_SIZE, {
    message: t('common.validation.maxFileSize', {
      size: `${MAX_FILE_SIZE}MB`,
    }),
  });
