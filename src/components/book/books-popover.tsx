import {Indicator, ActionIcon, Tooltip, Popover} from '@mantine/core';
import {useQuery} from '@tanstack/react-query';
import {IconBooks, IconLogin2} from '@tabler/icons-react';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import {Path, SEARCH_PARAMS} from '~/config/path';
import {usePersistStore} from '~/store';
import BookRentItem from './book-rent-item';
import NoData from '../no-data';
import {API, QueryKey} from '~/constants/service';
import {http} from '~/util/http';
import type {BooksResData} from '~/types';
import {useAutoAnimate} from '@formkit/auto-animate/react';

const BooksPopover = () => {
  const {books: selectedBookIds, isAuthenticated} = usePersistStore();
  const navigate = useNavigate();
  const {t} = useTranslation();
  const [animateDropdown] = useAutoAnimate();

  const {data: bookList = []} = useQuery({
    queryKey: [QueryKey.BOOKS],
    queryFn: () => http.get<BooksResData>(API.BOOKS),
    select: ({data}) => data,
  });

  const renderSelectedBooks = bookList
    .filter(({id}) => selectedBookIds.includes(id))
    .map((bookData) => <BookRentItem key={bookData.id} {...bookData} />);

  const handleRent = () => {};

  return (
    <Popover width="100%" position="bottom" shadow="md" radius="lg" trapFocus>
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
        className="max-h-[70vh] max-w-sm overflow-y-auto p-0 md:max-w-md 2xl:max-h-[unset] 2xl:max-w-lg"
      >
        {renderSelectedBooks.length ? (
          <>
            <div className="flex flex-col gap-4 p-4" ref={animateDropdown}>
              {renderSelectedBooks}
            </div>

            <div className="shadow-t-theme flex-center-between sticky inset-x-0 bottom-0 gap-2 bg-inherit p-4">
              {isAuthenticated ? (
                <button className="button ml-auto" onClick={handleRent} disabled>
                  {t('common.rent')}
                </button>
              ) : (
                <>
                  <span className="flex items-center sm-only:hidden">{t('book.memberOnly')}</span>
                  <button
                    className="button-secondary ml-auto"
                    onClick={() =>
                      navigate({
                        pathname: Path.LOGIN,
                        search: `${SEARCH_PARAMS.REDIRECT_URL}=${location.pathname}`,
                      })
                    }
                  >
                    <IconLogin2 size="1.2rem" /> {t('auth.login')}
                  </button>
                </>
              )}
            </div>
          </>
        ) : (
          <NoData
            className="py-4 opacity-80"
            image={<IconBooks className="mb-4 inline-block" strokeWidth="1.25" size="4rem" />}
          >
            {t('book.noData.emptyList')}
          </NoData>
        )}
      </Popover.Dropdown>
    </Popover>
  );
};

export default BooksPopover;
