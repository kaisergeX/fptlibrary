import {t} from 'i18next';
import {z, ZodIssueCode, type ZodErrorMap} from 'zod';
import {
  ACCEPTED_IMAGE_EXTENSIONS,
  ACCEPTED_IMAGE_MIME_TYPES,
  MAX_FILE_SIZE,
  MAX_FILE_SIZE_MB,
} from '~/config/system';

export const zodImage = z
  .custom<File>((v) => v instanceof File, {
    message: t('common.validation.required'),
  })
  .refine((file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file.type), {
    message: t('common.validation.imageFileType', {
      mimeTypes: ACCEPTED_IMAGE_EXTENSIONS.join(', '),
    }),
  })
  .refine((file) => file.size < MAX_FILE_SIZE, {
    message: t('common.validation.maxFileSize', {
      size: `${MAX_FILE_SIZE_MB}MB`,
    }),
  });

export const zodCustomErrorMap: ZodErrorMap = (issue, ctx) => {
  if (issue.code === ZodIssueCode.invalid_type) {
    if (issue.expected === 'string') {
      return {message: t('common.validation.required')};
    }

    return {message: t('common.validation.invalidInput')};
  }

  return {message: ctx.defaultError};
};
