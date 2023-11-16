import {Button} from '@mantine/core';
import {IconEdit} from '@tabler/icons-react';
import {useSuspenseQuery} from '@tanstack/react-query';
import {useTranslation} from 'react-i18next';
import {useParams, generatePath, Link} from 'react-router-dom';
import BookShowcase from '~/components/book/book-showcase';
import {Path} from '~/config/path';
import {API, QueryKey} from '~/constants/service';
import CommonHeader from '~/layout/common-header';
import {Head} from '~/layout/outlet/Head';
import type {Book, BreadcrumbsOptions, ResponseData} from '~/types';
import {http} from '~/util/http';

export default function BookDetailPage() {
  const {t} = useTranslation();
  const {id: bookId} = useParams();

  const {data: bookData} = useSuspenseQuery({
    queryKey: [QueryKey.BOOK_DETAIL, bookId],
    queryFn: () => http.get<ResponseData<Book>>(generatePath(API.BOOK_DETAIL, {id: bookId!})),
    select: ({body}) => body,
  });

  const pageTitle = bookData.title || t('book.detail');

  const breadcrumbData: BreadcrumbsOptions['data'] = [
    {title: t('bookBrowsing.pageTitle'), url: Path.CMS_BOOK},
    {title: pageTitle},
  ];

  return (
    <div className="space-y-4">
      <Head title={pageTitle} />
      <CommonHeader breadcrumbData={breadcrumbData}>
        <Button
          component={Link}
          className="text-base"
          to={generatePath(Path.CMS_BOOK_MUTATION, {id: bookData.id})}
          leftSection={<IconEdit />}
        >
          {t('book.update')}
        </Button>
      </CommonHeader>
      <BookShowcase bookData={bookData} adminView />
    </div>
  );
}
