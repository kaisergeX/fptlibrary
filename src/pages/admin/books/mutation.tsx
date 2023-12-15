import {useForm, zodResolver} from '@mantine/form';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useTranslation} from 'react-i18next';
import {useParams, generatePath, useNavigate, useSearchParams} from 'react-router-dom';
import {Path} from '~/config/path';
import {BookStatus} from '~/constants';
import {API, QueryKey} from '~/constants/service';
import CommonHeader from '~/layout/common-header';
import {Head} from '~/layout/outlet/Head';
import type {
  Book,
  BookFormValues,
  BookRequestData,
  BreadcrumbsOptions,
  ResponseData,
} from '~/types';
import {http} from '~/util/http';
import {z} from 'zod';
import {t} from 'i18next';
import {zodCustomErrorMap, zodImage} from '~/util/validation';
import {
  ActionIcon,
  Button,
  Divider,
  Fieldset,
  Image,
  Input,
  LoadingOverlay,
  MultiSelect,
  NumberInput,
  Select,
  TextInput,
  Textarea,
} from '@mantine/core';
import {
  IconBan,
  IconCalendar,
  IconCloudUpload,
  IconCurrencyDong,
  IconPhotoCheck,
  IconX,
} from '@tabler/icons-react';
import useMasterData from '~/hook/useMasterData';
import {
  ACCEPTED_IMAGE_EXTENSIONS,
  ACCEPTED_IMAGE_MIME_TYPES,
  MAX_FILE_SIZE,
  MAX_FILE_SIZE_MB,
  MAX_GENRES,
} from '~/config/system';
import {YearPickerInput} from '@mantine/dates';
import {Dropzone} from '@mantine/dropzone';
import SelectCustom from '~/components/form/select-custom';
import {BookStatusOptions} from '~/components/book/book-status';
import StickyFooter from '~/layout/sticky-footer';
import {showNotification} from '@mantine/notifications';
import {classNames, findNotiConfig, safeAnyToNumber, strReplaceSpace} from '~/util';
import {NotiCode} from '~/types/notification';
import {useEffect} from 'react';

const validationSchema: z.ZodSchema<BookFormValues> = z.object({
  title: z.string({errorMap: zodCustomErrorMap}).trim().min(1, t('common.validation.required')),
  author: z.string({errorMap: zodCustomErrorMap}).trim().min(1, t('common.validation.required')),
  summary: z.string({errorMap: zodCustomErrorMap}).optional(),
  cover: zodImage.or(
    z.string({errorMap: zodCustomErrorMap}).trim().min(1, t('common.validation.required')),
  ),
  episode: z.number({errorMap: zodCustomErrorMap}).optional(),
  totalEpisode: z.number({errorMap: zodCustomErrorMap}).optional(),
  price: z.number({errorMap: zodCustomErrorMap}).min(1, t('common.validation.minPrice')),
  publishYear: z.date().nullish(),
  genre: z
    .array(z.string({errorMap: zodCustomErrorMap}))
    .min(1, t('common.validation.required'))
    .max(MAX_GENRES, t('common.maxOptions', {max: MAX_GENRES})),
  country: z.string({errorMap: zodCustomErrorMap}).min(1, t('common.validation.required')),
  ageTag: z.string({errorMap: zodCustomErrorMap}).min(1, t('common.validation.required')),
  status: z.nativeEnum(BookStatus, {required_error: t('common.validation.required')}),
});

export default function BookMutationPage() {
  const {t} = useTranslation();
  const {id: bookId} = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const {selectCountryList, selectAgeTagList, selectGenreList} = useMasterData();

  const {data: bookData, isLoading: isBookDataLoading} = useQuery({
    queryKey: [QueryKey.BOOK_DETAIL, bookId],
    queryFn: () => http.get<ResponseData<Book>>(generatePath(API.BOOK_DETAIL, {id: bookId!})),
    select: ({body: data}) => {
      if (!data) {
        navigate(Path.CMS_BOOK, {replace: true});
        return;
      }

      return data;
    },

    staleTime: 0,
    enabled: !!bookId,
  });

  const pageTitle = bookData?.title ? `${t('book.update')}: ${bookData.title}` : t('book.add');
  const breadcrumbData: BreadcrumbsOptions['data'] = [
    {title: t('bookBrowsing.pageTitle'), url: Path.CMS_BOOK},
    {title: pageTitle},
  ];

  const {isPending, mutate} = useMutation({
    mutationFn: (payload: BookRequestData) =>
      bookId
        ? http.put(generatePath(API.BOOK_MUTATION, {id: bookId}), payload, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
        : http.post(generatePath(API.BOOK_MUTATION), payload, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }),
    onSuccess: async () => {
      showNotification(findNotiConfig(NotiCode.SUCCESS));
      if (bookId) {
        await queryClient.invalidateQueries({queryKey: [QueryKey.BOOK_DETAIL, bookId]});
      }
      await queryClient.invalidateQueries({queryKey: [QueryKey.BOOKS]});
      navigate({pathname: Path.CMS_BOOK, search: searchParams.toString()});
    },
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
      summary: '',
      author: '',
      cover: '',
      price: NaN,

      genre: [],
      country: '',
      ageTag: '',
      status: BookStatus.AVAILABLE,
    },
    validate: zodResolver(validationSchema),
    validateInputOnChange: true,
  });

  const handleBookMutation = (values: BookFormValues) => {
    const {cover, ...rest} = values;
    const title = rest.title.trim();
    const author = rest.author.trim();

    if (!(cover instanceof File)) {
      if (bookId) {
        // update book: if cover is string, it means cover is not changed -> opt out from mutation data.
        mutate({
          ...rest,
          title,
          author,
          genre: values.genre.join(','),
          publishYear: values.publishYear?.getFullYear(),
        });
      }

      // create book: do nothing here cuz cover must be a File object
      return;
    }

    mutate({
      ...values,
      title,
      author,
      cover,
      genre: values.genre.join(','),
      publishYear: values.publishYear?.getFullYear(),
    });
  };

  const renderCoverPreview = () => {
    if (!formValues.cover) {
      return <></>;
    }

    return (
      <div className="absolute inset-0 z-0 p-2 transition-opacity sm:p-4 lg:group-hover:opacity-10 lg:group-data-[accept=true]:opacity-10 lg:group-data-[reject=true]:opacity-10">
        <Image
          className="h-full object-cover object-center"
          src={
            formValues.cover instanceof File
              ? URL.createObjectURL(formValues.cover)
              : formValues.cover
          }
          fallbackSrc={`https://placehold.co/300x450?text=${strReplaceSpace(
            t('common.error.previewImage'),
            {everyNthSpace: 2},
          )}`}
        />
      </div>
    );
  };

  useEffect(() => {
    if (!bookData) {
      return;
    }

    setInitialValues({
      ...bookData,
      price: safeAnyToNumber(bookData.price) || NaN,
      genre: bookData.genre.map(({id: genreId}) => genreId.toString()),
      country: bookData.country.id,
      ageTag: bookData.ageTag.id.toString(),
      publishYear: bookData?.publishYear ? new Date(bookData.publishYear) : null,
    });
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookData]);

  return (
    <div>
      <Head title={pageTitle} />
      <CommonHeader className="bg-default" title={pageTitle} breadcrumbData={breadcrumbData} />

      <p className="text-sm">
        (<span className="text-red-500">*</span>): {t('common.validation.required')}
      </p>
      <form
        id="book-mutation-form"
        className="relative grid grid-cols-2 gap-4 py-4 xl:grid-cols-3"
        onSubmit={onSubmit(handleBookMutation)}
      >
        <LoadingOverlay
          visible={isBookDataLoading}
          zIndex={1000}
          overlayProps={{radius: 'sm', blur: 2}}
        />
        <div className="space-y-4 max-sm:col-span-2 xl:col-span-2">
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
          <div className="flex items-center gap-4">
            <Select
              className="basis-2/3"
              label={t('common.country')}
              data={selectCountryList}
              searchable
              withAsterisk
              allowDeselect={false}
              checkIconPosition="right"
              {...getInputProps('country')}
            />
            <TextInput
              className="basis-1/3"
              label={t('common.countryCode')}
              value={formValues.country}
              disabled
            />
          </div>
          <Select
            label={t('ageTag.def')}
            description={t('ageTag.select')}
            data={selectAgeTagList}
            withAsterisk
            allowDeselect={false}
            checkIconPosition="right"
            {...getInputProps('ageTag')}
          />
          <MultiSelect
            label={t('genre.def')}
            description={t('common.maxOptions', {max: MAX_GENRES})}
            data={selectGenreList}
            checkIconPosition="right"
            maxValues={MAX_GENRES}
            clearable
            withAsterisk
            {...getInputProps('genre')}
          />

          <Textarea
            label={t('common.description')}
            autosize
            minRows={3}
            maxLength={1024}
            {...getInputProps('summary')}
          />

          <SelectCustom
            className="w-44"
            classNames={{option: 'py-2'}}
            label={t('common.status')}
            withAsterisk
            {...getInputProps('status')}
            value={formValues.status.toString()}
            onChange={(val) => setFieldValue('status', safeAnyToNumber(val, BookStatus.AVAILABLE))}
            data={BookStatusOptions}
          />
        </div>

        <div className="relative max-sm:col-span-1 max-sm:col-start-2">
          <Input.Label required>{t('book.cover')}</Input.Label>
          {!formValues.cover || (
            <ActionIcon
              className="absolute -right-3 top-3 z-10"
              radius="xl"
              onClick={(e) => {
                e.stopPropagation();
                setFieldValue('cover', '');
              }}
            >
              <IconX />
            </ActionIcon>
          )}
          <Dropzone
            className={classNames(
              'group flex-center relative aspect-[1/1.5] text-center',
              getInputProps('cover').error ? 'border-red-600' : '',
            )}
            classNames={{inner: 'flex-center flex-col gap-2'}}
            onDrop={(files) => setFieldValue('cover', files[0])}
            onReject={(fileRejections) => setFieldValue('cover', fileRejections[0].file)}
            maxSize={MAX_FILE_SIZE}
            accept={ACCEPTED_IMAGE_MIME_TYPES}
            loading={isPending}
          >
            <Dropzone.Accept>
              <IconPhotoCheck className="text-green-600" size="3rem" />
            </Dropzone.Accept>

            <Dropzone.Idle>
              <IconCloudUpload className="text-slate-500" size="3rem" />
            </Dropzone.Idle>

            <Dropzone.Reject>
              <IconBan className="text-red-600" size="3rem" />
            </Dropzone.Reject>

            {renderCoverPreview()}

            <h3>{t('common.dragImage')}</h3>
            <p className="text-xs text-slate-500 sm:text-sm">
              {t('common.validation.imageFileType', {
                mimeTypes: ACCEPTED_IMAGE_EXTENSIONS.join(', '),
              })}
              <br />
              {t('common.validation.maxFileSize', {
                size: `${MAX_FILE_SIZE_MB}MB`,
              })}
            </p>
          </Dropzone>
          <Input.Error className="mt-2">{getInputProps('cover').error}</Input.Error>
        </div>

        <Fieldset
          className="mx-0 flex-wrap justify-stretch gap-4 max-sm:row-start-2 max-sm:space-y-4 sm:col-span-full sm:flex"
          classNames={{
            legend: 'max-sm:hidden',
            root: 'max-sm:border-none max-sm:p-0 max-sm:bg-inherit',
          }}
          legend={t('common.otherInfo')}
        >
          <NumberInput
            className="!mt-0 basis-1/5"
            label={t('book.episode')}
            min={0}
            {...getInputProps('episode')}
          />
          <NumberInput
            className="basis-1/5"
            label={t('book.totalEpisode')}
            min={1}
            {...getInputProps('totalEpisode')}
          />
          <NumberInput
            className="basis-1/5"
            label={t('book.price')}
            leftSection={<IconCurrencyDong />}
            min={0}
            step={1000}
            allowDecimal={false}
            thousandSeparator=","
            withAsterisk
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
      </form>
      <Divider my="md" variant="dashed" />

      <StickyFooter className="z-10">
        <Button type="submit" form="book-mutation-form" loading={isPending} disabled={!isDirty()}>
          {bookId ? t('common.update') : t('common.create')}
        </Button>
      </StickyFooter>
    </div>
  );
}
