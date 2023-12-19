import {useSuspenseQuery} from '@tanstack/react-query';
import {API, QueryKey} from '~/constants/service';
import type {TopPageResData} from '~/types/statistic';
import {http} from '~/util/http';
import {Chart} from 'react-google-charts';
import {useTranslation} from 'react-i18next';
import {ActionIcon, Divider, parseThemeColor, useMantineTheme} from '@mantine/core';
import {BookStatusThemeColors} from '~/components/book/book-status';
import {IconCube, IconChartPie, IconDiscountCheckFilled} from '@tabler/icons-react';
import dayjs from 'dayjs';
import {useLocalStorage} from '@mantine/hooks';
import DataGridStatic from '~/components/table/data-grid-static';
import type {Book} from '~/types';
import {bookColumnConfig} from '../books/book-table-config';
import ScrollTopButton from '~/components/scroll-top-button';
import type {DataTableColumn} from 'mantine-datatable';
import CommonHeader from '~/layout/common-header';

const mostPopularBooksColumn = (data: Book[]): DataTableColumn<Book>[] => {
  const columnConfig = bookColumnConfig.toSpliced(-1);
  columnConfig.unshift({
    accessor: 'id',
    title: '#',
    render: (record) => data.indexOf(record) + 1,
  });
  return columnConfig;
};

export default function DashboardStatistic() {
  const {t} = useTranslation();
  const theme = useMantineTheme();
  const [toggle3DChart, setToggle3DChart] = useLocalStorage({
    key: 'statistic-3d-chart',
    defaultValue: true,
  });

  const {
    data: {
      overviewLastestDate,
      bookStatistic,
      userStatistic,
      adminCount,
      userCount,
      bookCreated,
      borrowCount,
      mostPopularBooks,
    },
  } = useSuspenseQuery({
    queryKey: [QueryKey.TOP_PAGE],
    queryFn: () => http.get<TopPageResData>(API.TOP_PAGE),
    select: ({body}) => {
      const overviewStatisticData = body.current;
      const mostPopularBooks = body.mostPopular;

      const bookStatistic = [
        [t('book.status.title'), t('common.quantity')],
        [t('book.status.AVAILABLE'), overviewStatisticData.availableBook],
        [t('book.status.BOOKED'), overviewStatisticData.bookedBook],
        [t('book.status.IN_HAND'), overviewStatisticData.inHandBook],
        [t('book.status.OFF'), overviewStatisticData.offBook],
      ];
      const userStatistic = [
        [t('dashboard.memberStatistic'), t('common.quantity')],
        [t('dashboard.userActive'), overviewStatisticData.userActive],
        [t('users.status.expired'), overviewStatisticData.userExpired],
        [t('dashboard.userBanned'), overviewStatisticData.userBanned],
      ];

      return {
        overviewLastestDate: overviewStatisticData.reportDate,
        bookStatistic,
        userStatistic,
        bookCreated: overviewStatisticData.bookCreated,
        borrowCount: overviewStatisticData.borrowCount,
        adminCount: overviewStatisticData.adminCount,
        userCount: overviewStatisticData.userCount,
        mostPopularBooks,
      };
    },
  });

  return (
    <>
      <CommonHeader title={t('dashboard.pageTitle')}>
        <div className="text-right">
          {t('common.lastUpdatedAt')}:{' '}
          <strong>00:05 - {dayjs(overviewLastestDate).format('DD/MM/YYYY')}</strong>
        </div>
      </CommonHeader>

      <div className="glass mb-4 mt-2 grid grid-cols-2 gap-2 pb-8 sm:grid-cols-4 [&>div]:rounded-xl [&>div]:bg-[--mantine-color-body] [&>div]:p-4">
        <div>
          <div className="text-5xl font-bold">{bookCreated || '-'}</div>
          <h3>{t('dashboard.bookCreated')}</h3>
        </div>
        <div>
          <div className="text-5xl font-bold">{borrowCount || '-'}</div>
          <h3>{t('dashboard.borrowCount')}</h3>
        </div>
        <div>
          <div className="text-5xl font-bold">{adminCount || '-'}</div>
          <div className="flex items-center gap-1">
            <h3>{t('role.admin')}</h3>
            <IconDiscountCheckFilled
              className="inline text-[--mantine-color-blue-filled]"
              size="1.2rem"
            />
          </div>
        </div>
        <div>
          <div className="text-5xl font-bold">{userCount || '-'}</div>
          <h3>{t('dashboard.totalAccount')}</h3>
        </div>
      </div>
      <div className="relative justify-around gap-4 overflow-x-clip sm:flex">
        <ActionIcon
          className="absolute right-0 top-0 z-[1] dark:text-inherit"
          variant="subtle"
          size="lg"
          radius="xl"
          aria-label="Toggle 3D chart"
          onClick={() => setToggle3DChart(!toggle3DChart)}
        >
          {toggle3DChart ? <IconChartPie size="1.5rem" /> : <IconCube size="1.5rem" />}
        </ActionIcon>

        <div className="basis-1/2">
          <Chart
            chartType="PieChart"
            data={bookStatistic}
            options={{
              title: t('book.status.title'),
              titleTextStyle: {fontName: 'Nunito', fontSize: 18},
              backgroundColor: 'transparent',
              colors: BookStatusThemeColors.map((color) => parseThemeColor({color, theme}).value),
              is3D: toggle3DChart,
              sliceVisibilityThreshold: 0,
            }}
            width="100%"
            height="40vh"
          />
        </div>

        <div className="basis-1/2">
          <Chart
            chartType="PieChart"
            data={userStatistic}
            options={{
              title: t('dashboard.memberStatistic'),
              titleTextStyle: {fontName: 'Nunito', fontSize: 18},
              colors: [
                parseThemeColor({color: 'teal', theme}).value,
                '#d1d5db',
                parseThemeColor({color: 'red', theme}).value,
              ],
              backgroundColor: 'transparent',
              is3D: toggle3DChart,
              sliceVisibilityThreshold: 0,
            }}
            width="100%"
            height="40vh"
          />
        </div>
      </div>
      <Divider variant="dashed" my="md" />
      <h3 className="mb-4 text-2xl font-bold">Top 100 {t('dashboard.popularBooks')}</h3>
      <DataGridStatic<Book>
        data={mostPopularBooks}
        columns={mostPopularBooksColumn(mostPopularBooks)}
      />

      <ScrollTopButton />
    </>
  );
}
