import {Indicator, ActionIcon, Tooltip, Popover, Button} from '@mantine/core';
import {useMutation, useQueries, useQueryClient} from '@tanstack/react-query';
import {IconBooks, IconLogin2} from '@tabler/icons-react';
import {useTranslation} from 'react-i18next';
import {generatePath, useNavigate} from 'react-router-dom';
import {Path, SEARCH_PARAMS} from '~/config/path';
import {usePersistStore} from '~/store';
import BookRentItem from './book-rent-item';
import NoData from '../no-data';
import {API, QueryKey} from '~/constants/service';
import {http} from '~/util/http';
import {useAutoAnimate} from '@formkit/auto-animate/react';
import type {Book, ResponseData} from '~/types';
import CommonLoading from '../common-loading';
import type {AxiosError} from 'axios';
import {findNotiConfig, promiseAllSettled} from '~/util';
import {BOOK_ACTIONS, BookStatus} from '~/constants';
import {showNotification} from '@mantine/notifications';
import {NotiCode} from '~/types/notification';

const BooksPopover = () => {
  const {books: selectedBookIds, isAuthenticated, removeBook, setBooks} = usePersistStore();
  const navigate = useNavigate();
  const {t} = useTranslation();
  const [animateDropdown] = useAutoAnimate();
  const queryClient = useQueryClient();

  const {data: renderSelectedBooks, isLoading} = useQueries({
    queries: selectedBookIds.map((bookId) => ({
      queryKey: [QueryKey.BOOK_DETAIL, bookId],
      queryFn: () => http.get<ResponseData<Book>>(generatePath(API.BOOK_DETAIL, {id: bookId})),
      select: ({body: bookData}: ResponseData<Book>) => bookData,
      enabled: !!selectedBookIds.length,
    })),
    combine: (result) => ({
      data: result.flatMap(({data, error}, index) => {
        if (error) {
          const errorResponse = (error as AxiosError).response;
          if (errorResponse?.status === 400) {
            removeBook(selectedBookIds[index], false);
          }
        }

        if (!data) {
          return [];
        }

        if (data.status !== BookStatus.AVAILABLE) {
          // somebody already rented this book
          removeBook(selectedBookIds[index], false);
          return [];
        }

        return <BookRentItem key={data.id} {...data} />;
      }),
      isLoading: result.some(({isLoading}) => isLoading),
    }),
  });

  const {isPending, mutate: bookingMutate} = useMutation({
    mutationFn: (bookIds: Book['id'][]) =>
      promiseAllSettled(
        bookIds.map((bookId) =>
          http.post(generatePath(API.BOOK_ACTIONS, {actionType: BOOK_ACTIONS.BOOKED, id: bookId})),
        ),
      ),
    onSuccess: async ({fulfilled}) => {
      if (!fulfilled.length) {
        return;
      }

      showNotification(findNotiConfig(NotiCode.BOOK_BOOKED));
      setBooks([]);
      await queryClient.invalidateQueries({queryKey: [QueryKey.ORDER_HISTORY]});
      await queryClient.invalidateQueries({queryKey: [QueryKey.BOOKS]});
    },
  });

  const handleRent = () => {
    bookingMutate(selectedBookIds);
  };

  const renderPopoverDropdown = () => {
    if (isLoading) {
      return <CommonLoading className="h-40" />;
    }

    if (!renderSelectedBooks.length) {
      return (
        <NoData
          className="py-4 opacity-80"
          image={<IconBooks className="mb-4 inline-block" strokeWidth="1.25" size="4rem" />}
        >
          {t('book.noData.emptyList')}
        </NoData>
      );
    }

    return (
      <>
        <div className="flex flex-col gap-4 p-4" ref={animateDropdown}>
          {renderSelectedBooks}
        </div>

        <div className="shadow-t-theme flex-center-between sticky inset-x-0 bottom-0 gap-2 bg-inherit p-4">
          {isAuthenticated ? (
            <Button className="ml-auto" onClick={handleRent} disabled={isPending}>
              {t('common.rent')}
            </Button>
          ) : (
            <>
              <span className="flex items-center sm-only:hidden">{t('book.memberOnly')}</span>
              <Button
                className="ml-auto"
                onClick={() =>
                  navigate({
                    pathname: Path.LOGIN,
                    search: `${SEARCH_PARAMS.REDIRECT_URL}=${location.pathname}`,
                  })
                }
              >
                <IconLogin2 size="1.2rem" /> {t('auth.login')}
              </Button>
            </>
          )}
        </div>
      </>
    );
  };

  return (
    <Popover width="100%" position="bottom" offset={-1} shadow="md" radius="lg" trapFocus>
      <Popover.Target>
        <Tooltip label={t('book.addedList')} withArrow>
          <Indicator
            label={selectedBookIds.length}
            color="green"
            size={16}
            disabled={!selectedBookIds.length}
          >
            <ActionIcon
              variant="subtle"
              size="lg"
              radius="xl"
              aria-label="Rent books"
              className="dark:text-inherit"
            >
              <IconBooks />
            </ActionIcon>
          </Indicator>
        </Tooltip>
      </Popover.Target>
      <Popover.Dropdown
        ref={animateDropdown}
        className="max-h-[70vh] max-w-sm overflow-y-auto overflow-x-hidden p-0 md:max-w-md 2xl:max-h-[unset] 2xl:max-w-lg"
      >
        {renderPopoverDropdown()}
      </Popover.Dropdown>
    </Popover>
  );
};

export default BooksPopover;
