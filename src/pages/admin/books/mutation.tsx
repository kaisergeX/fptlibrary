import {useQuery} from '@tanstack/react-query';
import {useTranslation} from 'react-i18next';
import {useParams, generatePath} from 'react-router-dom';
import {Path} from '~/config/path';
import {API, QueryKey} from '~/constants/service';
import CommonHeader from '~/layout/common-header';
import {Head} from '~/layout/outlet/Head';
import type {Book, BreadcrumbsOptions, ResponseData} from '~/types';
import {http} from '~/util/http';

export default function BookMutationPage() {
  const {t} = useTranslation();
  const {id: bookId} = useParams();

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

  return (
    <div className="flex h-full flex-col gap-4 p-4">
      <Head title={pageTitle} />
      <CommonHeader title={pageTitle} breadcrumbData={breadcrumbData} />
    </div>
  );
}
