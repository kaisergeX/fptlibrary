import {ActionIcon} from '@mantine/core';
import {IconLayoutColumns, IconLayoutRows} from '@tabler/icons-react';
import {useQuery} from '@tanstack/react-query';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {generatePath, useNavigate} from 'react-router-dom';
import BookCard from '~/components/book/card';
import {Path} from '~/config/path';
import {API, QueryKey} from '~/constants/service';
import {Head} from '~/layout/outlet/Head';
import type {Book, ResponseData} from '~/types';
import {classNames} from '~/util';
import {http} from '~/util/http';

export default function BookBrowsing() {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const [horizontalItem, setHorizontalItem] = useState(false);
  const {data: renderBooks} = useQuery({
    queryKey: [QueryKey.BOOKS],
    queryFn: () => http.get<ResponseData<Book[]>>(API.BOOKS),
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
              <IconLayoutColumns size="1.5rem" />
            ) : (
              <IconLayoutRows size="1.5rem" />
            )}
          </ActionIcon>
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
