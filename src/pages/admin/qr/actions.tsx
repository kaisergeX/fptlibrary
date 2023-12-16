import {useAutoAnimate} from '@formkit/auto-animate/react';
import {Button, Divider} from '@mantine/core';
import {
  IconArrowBigRight,
  IconCheck,
  IconChevronLeft,
  IconCircleCheckFilled,
  IconExternalLink,
} from '@tabler/icons-react';
import {useMutation, useSuspenseQuery} from '@tanstack/react-query';
import {useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Link, Navigate, generatePath, useNavigate, useParams} from 'react-router-dom';
import BookShowcase from '~/components/book/book-showcase';
import {BookStatusFlow, BookStatusWithReturned} from '~/components/book/book-status';
import {Path} from '~/config/path';
import type {BOOK_ACTIONS} from '~/constants';
import {API, QueryKey} from '~/constants/service';
import {Head} from '~/layout/outlet/Head';
import StickyFooter from '~/layout/sticky-footer';
import type {Book, ExtractValues, ResponseData} from '~/types';
import {http} from '~/util/http';

export default function QRActions() {
  const {bookId} = useParams();
  const {t} = useTranslation();
  const navigate = useNavigate();
  const [animateStatus] = useAutoAnimate();
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);

  const {data: bookData, refetch} = useSuspenseQuery({
    queryKey: [QueryKey.BOOK_DETAIL, bookId],
    queryFn: () => http.get<ResponseData<Book>>(generatePath(API.BOOK_DETAIL, {id: bookId!})),
    select: ({body}) => body,
    staleTime: undefined,
  });

  const {isPending, mutate: mutateBookStatus} = useMutation({
    mutationFn: (nextAction: ExtractValues<typeof BOOK_ACTIONS>) =>
      http.post(generatePath(API.BOOK_ACTIONS, {actionType: nextAction, id: bookId!})),
    onSuccess: async () => {
      setShowSuccessScreen(true);
      await refetch();
    },
  });

  const renderBookStatusFlow = useMemo(() => {
    const statusFlow = BookStatusFlow.find(({currentStatus}) => currentStatus === bookData.status);
    if (!statusFlow) {
      return {
        content: (
          <>
            <h3>{t('common.status')}</h3>
            <div className="mt-4">
              {BookStatusWithReturned[bookData.status]?.render || t('common.unknown')}
            </div>
          </>
        ),
        action: <p className="font-semibold">{t('qrActions.bookStatus.actionUnavailable')}</p>,
      };
    }

    if (showSuccessScreen) {
      return {
        content: (
          <>
            <IconCircleCheckFilled size="5rem" className="text-[--mantine-color-teal-filled]" />
            <h3 className="text-2xl">{t('common.success.title')}!</h3>
            <div className="mt-4">
              {t('qrActions.bookStatus.newStatus')}:{' '}
              {BookStatusWithReturned[bookData.status]?.render}
            </div>
          </>
        ),
        action: (
          <Button
            radius="md"
            onClick={() => navigate(-1)}
            leftSection={<IconChevronLeft size="1rem" />}
          >
            {t('common.back')}
          </Button>
        ),
      };
    }

    return {
      content: (
        <>
          <h3 className="mb-4 text-center text-xl">{t('qrActions.bookStatus.confirm')}?</h3>
          <div className="flex-center gap-2">
            {statusFlow.renderCurrentStatus}
            <IconArrowBigRight />
            {statusFlow.renderNewStatus}
          </div>
        </>
      ),
      action: (
        <div className="flex-center-between gap-4">
          <Button color="red" variant="light" radius="md" onClick={() => navigate(-1)}>
            {t('qrActions.bookStatus.cancelAction')}
          </Button>
          <Button
            leftSection={<IconCheck />}
            loading={isPending}
            radius="md"
            onClick={() => mutateBookStatus(statusFlow.actionQR)}
          >
            {t('common.confirm')}
          </Button>
        </div>
      ),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookData.status, showSuccessScreen, isPending]);

  if (!bookId) {
    return <Navigate to={Path.CMS} replace />;
  }

  return (
    <>
      <Head title={t('qrActions.pageTitle')} />

      <h2>{t('qrActions.pageTitle')}</h2>

      <h3 className="mt-4">
        {t('book.id')}:{' '}
        <Link
          className="inline-flex items-center gap-1 text-lg font-bold"
          to={generatePath(Path.CMS_BOOK_DETAIL, {id: bookData.id})}
          target="_blank"
        >
          {bookData.id} <IconExternalLink size="1rem" />
        </Link>
      </h3>

      <div ref={animateStatus} className="flex-center min-h-[50vh] flex-col">
        {renderBookStatusFlow.content}
      </div>

      <Divider mb="xl" variant="dashed" />
      <BookShowcase className="pb-4 max-sm:flex-col-reverse" bookData={bookData} adminView />
      <StickyFooter alwayShadow>{renderBookStatusFlow.action}</StickyFooter>
    </>
  );
}
