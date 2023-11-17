import {useForm, zodResolver} from '@mantine/form';
import {useQuery} from '@tanstack/react-query';
import {useTranslation} from 'react-i18next';
import {useParams, generatePath} from 'react-router-dom';
import {Path} from '~/config/path';
import {BookStatus} from '~/constants';
import {API, QueryKey} from '~/constants/service';
import CommonHeader from '~/layout/common-header';
import {Head} from '~/layout/outlet/Head';
import type {Book, BookFormValues, BreadcrumbsOptions, ResponseData} from '~/types';
import {http} from '~/util/http';
import {z} from 'zod';
import {t} from 'i18next';
import {zodImage} from '~/util/validation';
import {
  Fieldset,
  FileInput,
  MultiSelect,
  NumberInput,
  Select,
  TextInput,
  Textarea,
} from '@mantine/core';
import {IconCurrencyDong, IconPhoto} from '@tabler/icons-react';
import useMasterData from '~/hook/useMasterData';
import {MAX_GENRES} from '~/config/system';
import {YearPickerInput} from '@mantine/dates';
import {IconCalendar} from '@tabler/icons-react';
import SelectCustom from '~/components/form/select-custom';
import {BookStatusOptions} from '~/components/book/book-status';

const validationSchema: z.ZodSchema<BookFormValues> = z.object({
  title: z.string().min(1, t('common.validation.required')),
  author: z.string().min(1, t('common.validation.required')),
  summary: z.string().optional(),
  cover: zodImage,
  episode: z.number().optional(),
  totalEpisode: z.number().optional(),
  price: z.number().optional(),
  publishYear: z.date().nullish(),
  genre: z.array(z.string()).min(1, t('common.validation.required')),
  country: z.string().min(1, t('common.validation.required')),
  ageTag: z.number({required_error: t('common.validation.required')}),
  status: z.nativeEnum(BookStatus, {required_error: t('common.validation.required')}),
});

export default function BookMutationPage() {
  const {t} = useTranslation();
  const {id: bookId} = useParams();
  const {selectCountryList, selectAgeTagList, selectGenreList} = useMasterData();

  const {data: bookData} = useQuery({
    queryKey: [QueryKey.BOOK_DETAIL, bookId],
    queryFn: () => http.get<ResponseData<Book>>(generatePath(API.BOOK_DETAIL, {id: bookId!})),
    select: ({body}) => body,
    enabled: !!bookId,
  });

  const pageTitle = bookData?.title ? `${t('book.update')}: ${bookData.title}` : t('book.add');

  const breadcrumbData: BreadcrumbsOptions['data'] = [
    {title: t('bookBrowsing.pageTitle'), url: Path.CMS_BOOK},
    {title: pageTitle},
  ];

  const {
    // values: formValues,
    getInputProps,
    onSubmit,
  } = useForm<z.infer<typeof validationSchema>>({
    initialValues: {
      title: '',
      summary: '',
      author: '',
      cover: null,

      genre: [],
      country: '',
      ageTag: null,
      status: BookStatus.AVAILABLE,
    },
    validate: zodResolver(validationSchema),
    validateInputOnChange: true,
  });

  const handleCreateDevice = (values: BookFormValues) => {
    console.log(values);
  };

  return (
    <div>
      <Head title={pageTitle} />
      <CommonHeader className="bg-default" title={pageTitle} breadcrumbData={breadcrumbData} />

      <form
        className="gap-4 py-4 max-sm:space-y-4 sm:grid sm:grid-cols-2"
        onSubmit={onSubmit(handleCreateDevice)}
      >
        <TextInput
          label={t('common.title')}
          maxLength={255}
          withAsterisk
          {...getInputProps('title')}
        />
        <TextInput
          label={t('book.author')}
          maxLength={255}
          withAsterisk
          {...getInputProps('author')}
        />
        <Textarea
          className="col-span-2"
          label={t('common.description')}
          autosize
          minRows={2}
          maxLength={512}
          {...getInputProps('summary')}
        />

        <FileInput
          leftSection={<IconPhoto />}
          label={t('book.cover')}
          placeholder={t('book.uploadCover')}
          leftSectionPointerEvents="none"
          withAsterisk
        />

        <Select
          label={t('common.country')}
          data={selectCountryList}
          withAsterisk
          {...getInputProps('country')}
        />
        <Select
          label={t('ageTag.def')}
          description={t('ageTag.select')}
          data={selectAgeTagList}
          withAsterisk
          {...getInputProps('ageTag')}
        />

        <MultiSelect
          label={t('genre.def')}
          description={t('common.maxOptions', {max: MAX_GENRES})}
          data={selectGenreList}
          checkIconPosition="right"
          maxValues={5}
          clearable
          withAsterisk
          {...getInputProps('genre')}
        />

        <Fieldset
          legend={t('common.otherInfo')}
          className="col-span-full flex-wrap justify-stretch gap-4 max-sm:space-y-4 sm:flex"
        >
          <NumberInput
            className="!mt-0 basis-1/5"
            label={t('book.episode')}
            {...getInputProps('episode')}
          />
          <NumberInput
            className="basis-1/5"
            label={t('book.totalEpisode')}
            {...getInputProps('totalEpisode')}
          />
          <NumberInput
            className="basis-1/5"
            label={t('book.price')}
            leftSection={<IconCurrencyDong />}
            {...getInputProps('price')}
          />

          <YearPickerInput
            className="basis-1/4"
            label={t('book.publishYear')}
            leftSection={<IconCalendar />}
            maxDate={new Date()}
            clearable
            {...getInputProps('publishYear')}
          />
        </Fieldset>

        <SelectCustom
          className="w-48"
          classNames={{option: 'py-2'}}
          label={t('common.status')}
          {...getInputProps('status')}
          data={BookStatusOptions}
        />
      </form>
    </div>
  );
}
