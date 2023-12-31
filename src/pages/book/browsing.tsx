import {useAutoAnimate} from '@formkit/auto-animate/react';
import {
  ActionIcon,
  Autocomplete,
  Button,
  Code,
  Drawer,
  Indicator,
  LoadingOverlay,
} from '@mantine/core';
import {
  useDebouncedState,
  useDisclosure,
  useHotkeys,
  useLocalStorage,
  useOs,
  useWindowScroll,
} from '@mantine/hooks';
import {
  IconCloudSearch,
  IconFilter,
  IconLayoutColumns,
  IconLayoutRows,
  IconSearch,
} from '@tabler/icons-react';
import {useQuery} from '@tanstack/react-query';
import {useEffect, useMemo, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {generatePath, useNavigate, useSearchParams} from 'react-router-dom';
import AppLogo from '~/components/app-logo';
import BookCard from '~/components/book/card';
import {Path, SEARCH_PARAMS} from '~/config/path';
import {API, QueryKey} from '~/constants/service';
import {Head} from '~/layout/outlet/Head';
import type {Book, ResponseData} from '~/types';
import {classNames, isMobile} from '~/util';
import {http} from '~/util/http';
import BookFilter, {BOOK_FILTER_FORM_ID} from '~/components/book/book-filter';
import NoData from '~/components/no-data';
import BooksPopover from '~/components/book/books-popover';

export default function BookBrowsing() {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const deviceOS = useOs();
  const [searchParams, setSearchParams] = useSearchParams();
  const [{y: windowScrollY}] = useWindowScroll();
  const [animateBookList] = useAutoAnimate();
  const [filterOpened, {open: openFilter, close: closeFilter}] = useDisclosure(false);
  const [hotkeyHintShowed, {open: showHotKeyHint, close: hideHotkeyHint}] = useDisclosure(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchKeyword, setSearchKeyword] = useDebouncedState(
    searchParams.get(SEARCH_PARAMS.SEARCH) || '',
    300,
  );

  const {countFilterType = 0, queryParams} = useMemo(() => {
    let countFilterType = searchParams.size;
    if (searchParams.get(SEARCH_PARAMS.SEARCH)) {
      countFilterType--;
    }

    return {
      countFilterType: countFilterType,
      queryParams: {...Object.fromEntries(searchParams), [SEARCH_PARAMS.PAGE_SIZE]: 100},
    };
  }, [searchParams]);

  const [horizontalItem, setHorizontalItem] = useLocalStorage({
    key: 'book-browsing-layout',
    defaultValue: false,
  });

  const {data: bookData, isLoading} = useQuery({
    queryKey: [QueryKey.BOOKS, queryParams],
    queryFn: () => http.get<ResponseData<Book[]>>(API.BOOKS, {params: queryParams}),
    select: ({body}) => body,
  });

  const renderBooks = useMemo(
    () =>
      bookData?.map((data) => (
        <BookCard
          key={data.id}
          className="cursor-pointer xl:max-w-xl"
          data={data}
          onClick={() => navigate(generatePath(Path.BOOK_DETAIL, {id: data.id}))}
          horizontal={horizontalItem}
        />
      )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [bookData, horizontalItem],
  );

  useHotkeys([['mod+K', () => searchInputRef.current?.focus()]]);

  useEffect(() => {
    setSearchParams(
      (prevSearchParams) => {
        if (!searchKeyword) {
          prevSearchParams.delete(SEARCH_PARAMS.SEARCH);
          return prevSearchParams;
        }

        return {
          ...Object.fromEntries(prevSearchParams),
          [SEARCH_PARAMS.SEARCH]: searchKeyword,
        };
      },
      {replace: true},
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKeyword]);

  useEffect(() => {
    if (!isLoading) {
      window.scrollTo(0, 0);
    }
  }, [bookData, isLoading]);

  return (
    <>
      <Head title={t('bookBrowsing.pageTitle')} />
      <div className="container mx-auto p-4">
        <div
          className={classNames(
            'bg-default flex-center-between sticky top-0 z-10 -ml-4 mb-8 gap-2 p-4 transition-[margin] sm:gap-4',
            windowScrollY > 60
              ? 'shadow-[0_8px_5px_-5px] shadow-slate-100 dark:shadow-none max-xl:-mr-4 2xl:-mr-4'
              : '-mr-4',
          )}
        >
          <div className="flex gap-2 max-sm:flex-1 max-sm:flex-col sm:items-center sm:gap-4">
            <div className="flex items-center transition-[height]">
              <AppLogo
                className={classNames(
                  'mb-2 transition-all duration-300 xl:hidden',
                  windowScrollY < window.innerHeight * 0.2
                    ? 'h-0 w-0 opacity-0'
                    : 'mr-2 h-8 w-fit opacity-100',
                )}
              />
              <h2 className="flex-1 font-bold sm:text-xl xl:text-3xl">
                {t('bookBrowsing.pageTitle')}
              </h2>
            </div>
            <Autocomplete
              ref={searchInputRef}
              classNames={{wrapper: 'transition-[width]'}}
              defaultValue={searchKeyword}
              onChange={(value) => setSearchKeyword(value)}
              type="search"
              placeholder={t('common.search')}
              leftSection={<IconSearch size="1rem" />}
              rightSectionProps={{className: 'mr-1 w-fit'}}
              rightSection={
                isMobile() || !hotkeyHintShowed || searchKeyword ? undefined : (
                  <Code>{deviceOS === 'macos' ? '⌘ K' : 'Ctrl + K'}</Code>
                )
              }
              rightSectionPointerEvents="none"
              onFocus={hideHotkeyHint}
              onBlur={showHotKeyHint}
              autoFocus
            />
          </div>

          <div className="flex items-center gap-2 max-sm:flex-col">
            <div
              className={classNames(
                'transition-all duration-300 xl:hidden',
                windowScrollY < window.innerHeight * 0.2
                  ? 'pointer-events-none opacity-0'
                  : 'opacity-100',
              )}
            >
              <BooksPopover />
            </div>

            <Indicator label={countFilterType} size={16} disabled={countFilterType === 0}>
              <Button
                className="hidden sm:block"
                variant="subtle"
                size="compact-md"
                rightSection={<IconFilter />}
                onClick={openFilter}
              >
                {t('book.filter')}
              </Button>
              <ActionIcon
                className="block sm:hidden"
                variant="subtle"
                size="compact-md"
                onClick={openFilter}
              >
                <IconFilter />
              </ActionIcon>
            </Indicator>
            <ActionIcon
              variant="subtle"
              size="lg"
              radius="xl"
              aria-label="Toggle layout"
              className="dark:text-inherit max-sm:hidden"
              onClick={() => setHorizontalItem(!horizontalItem)}
            >
              {horizontalItem ? (
                <IconLayoutRows size="1.5rem" />
              ) : (
                <IconLayoutColumns size="1.5rem" />
              )}
            </ActionIcon>
          </div>
        </div>

        <div className="min-h-[60vh]">
          <LoadingOverlay visible={isLoading} zIndex={9} overlayProps={{blur: 2}} />

          <div
            ref={animateBookList}
            className={classNames(
              'grid grid-cols-1 justify-items-center gap-4',
              horizontalItem
                ? 'sm:grid-cols-2 xl:grid-cols-3'
                : 'sm:grid-cols-3 xl:grid-cols-[repeat(auto-fill,minmax(18rem,_1fr))]',
            )}
          >
            {!renderBooks?.length || renderBooks}
          </div>

          {renderBooks?.length ? (
            <h3 key="book-browsing-guide" className="flex-center gap-1 sm:my-4">
              {t('bookBrowsing.guide')}{' '}
              {isMobile() ? (
                <ActionIcon
                  variant="subtle"
                  radius="xl"
                  onClick={() => searchInputRef.current?.focus()}
                >
                  <IconSearch size="1rem" />
                </ActionIcon>
              ) : (
                <Code>{deviceOS === 'macos' ? '⌘ K' : 'Ctrl + K'}</Code>
              )}
            </h3>
          ) : (
            isLoading || (
              <NoData
                className="py-20 opacity-80"
                image={<IconCloudSearch strokeWidth="1.5" size="4rem" />}
              >
                {t('filter.noResult')}
              </NoData>
            )
          )}
        </div>
      </div>

      <Drawer
        classNames={{
          content: 'flex flex-col gap-4 max-w-[calc(100%-1rem)]',
          body: 'flex-1 flex flex-col gap-4',
        }}
        opened={filterOpened}
        offset={8}
        radius="md"
        onClose={closeFilter}
        title={t('filter.query')}
        position="right"
        overlayProps={{backgroundOpacity: 0.5, blur: 2}}
      >
        <BookFilter className="flex-1 space-y-4" />
        <div className="flex justify-end gap-4">
          <Button variant="outline" type="reset" form={BOOK_FILTER_FORM_ID} onClick={closeFilter}>
            {t('filter.reset')}
          </Button>
          <Button
            type="submit"
            form={BOOK_FILTER_FORM_ID}
            leftSection={<IconFilter />}
            onClick={closeFilter}
          >
            {t('common.confirm')}
          </Button>
        </div>
      </Drawer>
    </>
  );
}
