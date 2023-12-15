import {Button, Divider, Image, Table} from '@mantine/core';
import {IconEdit} from '@tabler/icons-react';
import {useSuspenseQuery} from '@tanstack/react-query';
import dayjs from 'dayjs';
import {useTranslation} from 'react-i18next';
import {useParams, generatePath, Link} from 'react-router-dom';
import BookShowcase from '~/components/book/book-showcase';
import {BookStatusOptions} from '~/components/book/book-status';
import {Path} from '~/config/path';
import {API, QueryKey} from '~/constants/service';
import CommonHeader from '~/layout/common-header';
import {Head} from '~/layout/outlet/Head';
import type {Book, BreadcrumbsOptions, ResponseData} from '~/types';
import {http} from '~/util/http';
import {useDisclosure} from '@mantine/hooks';
import ModalPrint from '~/components/modals/modal-print';
import {safeAnyToNumber} from '~/util';

export default function BookDetailPage() {
  const {t} = useTranslation();
  const {id: bookId} = useParams();
  const [qrCodeModalOpened, {open: openQRModal, close: closeQRModal}] = useDisclosure(false);

  const {data: bookData} = useSuspenseQuery({
    queryKey: [QueryKey.BOOK_DETAIL, bookId],
    queryFn: () => http.get<ResponseData<Book>>(generatePath(API.BOOK_DETAIL, {id: bookId!})),
    select: ({body}) => body,
    staleTime: undefined,
  });

  const pageTitle = bookData.title || t('book.detail');

  const breadcrumbData: BreadcrumbsOptions['data'] = [
    {title: t('bookBrowsing.pageTitle'), url: Path.CMS_BOOK},
    {title: pageTitle},
  ];

  return (
    <>
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

      <div className="py-4">
        <BookShowcase bookData={bookData} adminView />

        <Divider className="my-8" variant="dashed" />
        <h3 className="mb-4">{t('common.otherInfo')}</h3>
        {!bookData || (
          <Table.ScrollContainer minWidth={320}>
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th className="text-center">{t('book.qrCode')}</Table.Th>
                  <Table.Th>{t('common.countryCode')}</Table.Th>
                  <Table.Th>{t('common.country')}</Table.Th>
                  <Table.Th>{t('book.price')} (&#8363;)</Table.Th>
                  <Table.Th>{t('book.publishYear')}</Table.Th>
                  <Table.Th>{t('common.status')}</Table.Th>
                  <Table.Th>{t('common.createdAt')}</Table.Th>
                  <Table.Th>{t('common.lastUpdatedAt')}</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                <Table.Tr>
                  <Table.Td align="center">
                    <div
                      className="flex-center w-14 cursor-pointer"
                      role="button"
                      onClick={openQRModal}
                    >
                      <Image
                        className="aspect-square w-full object-cover object-center"
                        src={bookData.qrCode}
                        fallbackSrc={`https://placehold.co/200x200?text=${bookData.title}`}
                        alt={`Book QR code - ${bookData.title}`}
                        loading="lazy"
                      />
                    </div>
                  </Table.Td>
                  <Table.Td>{bookData.country.id}</Table.Td>
                  <Table.Td>{bookData.country.name}</Table.Td>
                  <Table.Td>{safeAnyToNumber(bookData.price).toLocaleString()}</Table.Td>
                  <Table.Td>{bookData.publishYear}</Table.Td>
                  <Table.Td>{BookStatusOptions[bookData.status].render}</Table.Td>
                  <Table.Td>{dayjs(bookData.createAt).format('DD/MM/YYYY HH:mm')}</Table.Td>
                  <Table.Td>{dayjs(bookData.updateAt).format('DD/MM/YYYY HH:mm')}</Table.Td>
                </Table.Tr>
              </Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        )}
      </div>

      <ModalPrint
        className="flex flex-col items-center"
        title={t('book.qrCode')}
        documentTitle={`${bookData.title}_${bookData.author || t('book.authorUnknown')}`}
        opened={qrCodeModalOpened}
        onClose={closeQRModal}
      >
        <Image
          className="aspect-square w-full object-cover object-center"
          src={bookData.qrCode}
          fallbackSrc={`https://placehold.co/400x400?text=${bookData.title}`}
          alt={`Book QR code - ${bookData.title}`}
          loading="lazy"
        />
        <div className="text-center">
          <h2 className="text-4xl font-bold">{bookData.id}</h2>
          <h2 className="font-bold">{bookData.title}</h2>
          <p>
            {t('book.author')}: <strong>{bookData.author || t('book.authorUnknown')}</strong>
          </p>
        </div>
      </ModalPrint>
    </>
  );
}
