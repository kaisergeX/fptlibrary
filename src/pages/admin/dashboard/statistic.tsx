import {useSuspenseQuery} from '@tanstack/react-query';
import {API, QueryKey} from '~/constants/service';
import type {TopPageResData} from '~/types/statistic';
import {http} from '~/util/http';

export default function DashboardStatistic() {
  // const {t} = useTranslation();
  useSuspenseQuery({
    queryKey: [QueryKey.TOP_PAGE],
    queryFn: () => http.get<TopPageResData>(API.TOP_PAGE),
    select: ({body}) => {
      const overviewStatisticData = body.current;

      // const bookStatistic = [
      //   {
      //     name: t('book.status.AVAILABLE'),
      //     value: overviewStatisticData.availableBook,
      //     color: '#0ea5e9',
      //   },
      //   {
      //     name: t('book.status.BOOKED'),
      //     value: overviewStatisticData.bookedBook,
      //     color: '#4ade80',
      //   },
      //   {
      //     name: t('book.status.IN_HAND'),
      //     value: overviewStatisticData.inHandBook,
      //     color: '#8b5cf6',
      //   },
      //   {
      //     name: t('book.status.OFF'),
      //     value: overviewStatisticData.offBook,
      //     color: '#94a3b8',
      //   },
      // ];

      return {
        overviewLastestDate: overviewStatisticData.reportDate,
        bookStatusChart: undefined,
      };
    },
  });

  return <></>;
}
