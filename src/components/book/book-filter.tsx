import {MultiSelect} from '@mantine/core';
import {useForm} from '@mantine/form';
import {IconBookmarks, IconFlag, IconUserScan} from '@tabler/icons-react';
import {useCallback, type FormEventHandler} from 'react';
import {useTranslation} from 'react-i18next';
import {createSearchParams, useSearchParams} from 'react-router-dom';
import {z} from 'zod';
import {SEARCH_PARAMS} from '~/config/path';
import {MAX_GENRES} from '~/config/system';
import {BookStatus} from '~/constants';
import useMasterData from '~/hook/useMasterData';
import type {BookFilterFormValues, RequestParams} from '~/types';
import {isValidDate} from '~/util';
import {objectJoinArrayValues} from '~/util/object';
import {zodCustomErrorMap} from '~/util/validation';

export const BOOK_FILTER_FORM_ID = 'book-filter-form';

const validationSchema: z.ZodSchema<Partial<BookFilterFormValues>> = z.object({
  publishYear: z.date().nullish(),
  genre: z.array(z.string({errorMap: zodCustomErrorMap})).optional(),
  country: z.array(z.string({errorMap: zodCustomErrorMap})).optional(),
  ageTag: z.array(z.string({errorMap: zodCustomErrorMap})).optional(),
  status: z.nativeEnum(BookStatus).optional(),
});

type BookFilterProps = {
  className?: string;
  onSubmit?: (formValues: Partial<BookFilterFormValues>) => void;
  onReset?: () => void;
};
const initialFormValues: Partial<BookFilterFormValues> = {
  genre: [],
  country: [],
  ageTag: [],
};

export default function BookFilter({className = '', onSubmit, onReset}: BookFilterProps) {
  const {t} = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const initGenreFilter = searchParams.get(SEARCH_PARAMS.GENRE);
  const initCountryFilter = searchParams.get(SEARCH_PARAMS.COUNTRY);
  const initAgeTagFilter = searchParams.get(SEARCH_PARAMS.AGE_TAG);

  const {selectCountryList, selectAgeTagList, selectGenreList} = useMasterData();
  const {
    getInputProps,
    onSubmit: onFormSubmit,
    onReset: onResetSubmit,
    setInitialValues,
  } = useForm<z.infer<typeof validationSchema>>({
    initialValues: {
      genre: initGenreFilter?.split(',') || [],
      country: initCountryFilter?.split(',') || [],
      ageTag: initAgeTagFilter?.split(',') || [],
    },
    // validate: zodResolver(validationSchema),
    // validateInputOnChange: true,
  });

  const handleBookFilter = useCallback(
    (values: Partial<BookFilterFormValues>) => {
      if (onSubmit) {
        onSubmit(values);
        return;
      }

      const newSearchParams = objectJoinArrayValues(
        {...Object.fromEntries(searchParams), ...values},
        ',',
        {
          preProcessValues: (value) => {
            if (!value || typeof value === 'object') {
              if (value instanceof Date) {
                // publishYear filter
                return isValidDate(value) ? value.getFullYear() : undefined;
              }

              return value;
            }

            return value.toString();
          },
          removeFalsyProperties: true,
        },
      ) as RequestParams<string>;

      setSearchParams(createSearchParams(newSearchParams), {replace: true});
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onSubmit, searchParams],
  );

  const handleReset: FormEventHandler<HTMLFormElement> = (formEvent) => {
    setInitialValues(initialFormValues);
    onResetSubmit(formEvent);
    setSearchParams(undefined, {replace: true});
    onReset?.();
  };

  return (
    <form
      id={BOOK_FILTER_FORM_ID}
      className={className}
      onSubmit={onFormSubmit(handleBookFilter)}
      onReset={handleReset}
    >
      <MultiSelect
        label={t('genre.def')}
        description={t('common.maxOptions', {max: MAX_GENRES})}
        data={selectGenreList}
        maxValues={MAX_GENRES}
        leftSection={<IconBookmarks size="1.2rem" />}
        searchable
        clearable
        {...getInputProps('genre')}
      />
      <MultiSelect
        label={t('ageTag.def')}
        description={t('ageTag.select')}
        data={selectAgeTagList}
        leftSection={<IconUserScan size="1.2rem" />}
        searchable
        clearable
        {...getInputProps('ageTag')}
      />
      <MultiSelect
        label={t('common.country')}
        data={selectCountryList}
        leftSection={<IconFlag size="1.2rem" />}
        searchable
        clearable
        {...getInputProps('country')}
      />
    </form>
  );
}
