import {ActionIcon, MultiSelect, Select} from '@mantine/core';
import {useForm, zodResolver} from '@mantine/form';
import {useLocalStorage} from '@mantine/hooks';
import {IconLayoutColumns, IconLayoutRows} from '@tabler/icons-react';
import {useQuery} from '@tanstack/react-query';
import {useTranslation} from 'react-i18next';
import {generatePath, useNavigate} from 'react-router-dom';
import {z} from 'zod';
import BookCard from '~/components/book/card';
import i18n from '~/config/i18n';
import {Path} from '~/config/path';
import {MAX_GENRES} from '~/config/system';
import {BookStatus} from '~/constants';
import {API, QueryKey} from '~/constants/service';
import useMasterData from '~/hook/useMasterData';
import {Head} from '~/layout/outlet/Head';
import type {Book, BookFilterFormValues, BookFormValues, ResponseData} from '~/types';
import {classNames} from '~/util';
import {http} from '~/util/http';
import {zodCustomErrorMap} from '~/util/validation';

const validationSchema: z.ZodSchema<Partial<BookFilterFormValues>> = z.object({
  title: z.string({errorMap: zodCustomErrorMap}).trim().optional(),
  publishYear: z.date().nullish(),
  genre: z.array(z.string({errorMap: zodCustomErrorMap})).optional(),
  country: z.array(z.string({errorMap: zodCustomErrorMap})).optional(),
  ageTag: z.array(z.string({errorMap: zodCustomErrorMap})).optional(),
  status: z.nativeEnum(BookStatus).optional(),
});

export default function BookBrowsing() {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const {selectCountryList, selectAgeTagList, selectGenreList} = useMasterData();

  const [horizontalItem, setHorizontalItem] = useLocalStorage({
    key: 'book-browsing-layout',
    defaultValue: false,
  });

  const {data: renderBooks} = useQuery({
    queryKey: [QueryKey.BOOKS],
    queryFn: () => http.get<ResponseData<Book[]>>('/dump/books.json', {baseURL: '/'}),
    // queryFn: () => http.get<ResponseData<Book[]>>(API.BOOKS),
    select: ({body: bookData}) =>
      bookData.map((data) => (
        <BookCard
          key={data.id}
          className="cursor-pointer xl:max-w-xl"
          data={data}
          onClick={() => navigate(generatePath(Path.BOOK_DETAIL, {id: data.id}))}
          hozizontal={horizontalItem}
        />
      )),
  });

  const {
    values: formValues,
    getInputProps,
    setFieldValue,
    setInitialValues,
    onSubmit,
    isDirty,
    reset,
  } = useForm<z.infer<typeof validationSchema>>({
    initialValues: {
      title: '',
      genre: [],
      country: [],
      ageTag: [],
    },
    validate: zodResolver(validationSchema),
    validateInputOnChange: true,
  });

  return (
    <>
      <Head title={t('bookBrowsing.pageTitle')} />
      <div className="container mx-auto p-4">
        <div className="flex-center-between mb-8 gap-4">
          <h2 className="font-bold sm:text-xl xl:text-3xl">{t('bookBrowsing.pageTitle')}</h2>
          <ActionIcon
            variant="subtle"
            size="lg"
            radius="xl"
            aria-label="Toggle layout"
            className="dark:text-inherit"
            onClick={() => setHorizontalItem(!horizontalItem)}
          >
            {horizontalItem ? (
              <IconLayoutRows size="1.5rem" />
            ) : (
              <IconLayoutColumns size="1.5rem" />
            )}
          </ActionIcon>
        </div>

        <div className="flex items-center gap-4">
          <Select
            label={t('common.country')}
            data={selectCountryList}
            searchable
            allowDeselect={false}
            checkIconPosition="right"
            {...getInputProps('country')}
          />
          <MultiSelect
            label={t('ageTag.def')}
            description={t('ageTag.select')}
            data={selectAgeTagList}
            checkIconPosition="right"
            hidePickedOptions
            {...getInputProps('ageTag')}
          />
          <MultiSelect
            label={t('genre.def')}
            description={t('common.maxOptions', {max: MAX_GENRES})}
            data={selectGenreList}
            searchable
            checkIconPosition="right"
            maxValues={MAX_GENRES}
            clearable
            hidePickedOptions
            {...getInputProps('genre')}
          />
        </div>

        <div
          className={classNames(
            'grid grid-cols-1 justify-items-center gap-4',
            horizontalItem
              ? 'sm:grid-cols-2 xl:grid-cols-3'
              : 'sm:grid-cols-3 xl:grid-cols-[repeat(auto-fill,minmax(18rem,_1fr))]',
          )}
        >
          {renderBooks}
        </div>
      </div>
    </>
  );
}
