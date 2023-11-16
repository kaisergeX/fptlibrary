import {useMemo} from 'react';
import {keepPreviousData, useQuery} from '@tanstack/react-query';
import {DataTable, type DataTableColumn} from 'mantine-datatable';
import {showNotification} from '@mantine/notifications';
import {useSearchParams} from 'react-router-dom';

import {DEFAULT_PAGE, DEFAULT_PAGESIZE, PAGESIZE_OPTIONS} from '~/config/system';
import {useTranslation} from 'react-i18next';
import {classNames, findNotiConfig, safeAnyToNumber} from '~/util';
import type {API, QueryKey} from '~/constants/service';
import {NotiCode} from '~/types/notification';
import type {DataGridFilter, ExtractValues, ListResponseData} from '~/types';
import {http} from '~/util/http';

type DataGridProps<T> = {
  className?: string;
  columns: DataTableColumn<T>[];
  queryKey: ExtractValues<typeof QueryKey>;
  api: ExtractValues<typeof API>;
};

const DataGrid = <T,>({className = '', columns, api, queryKey}: DataGridProps<T>) => {
  const {t} = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParams = useMemo<DataGridFilter>(() => {
    const getParamsObject = Object.fromEntries(searchParams);

    return {
      ...getParamsObject,
      numPages: safeAnyToNumber(getParamsObject.numPages, DEFAULT_PAGE) - 1,
      pageSize: safeAnyToNumber(getParamsObject.pageSize, DEFAULT_PAGESIZE),
    };
  }, [searchParams]);

  const {data: listData, isFetching} = useQuery({
    queryKey: [queryKey, ...Object.values(queryParams)],
    queryFn: () => http.get<ListResponseData<T>>(api, {params: queryParams}),
    select: (data) => {
      const isPagingOutRange = queryParams.numPages * queryParams.pageSize + 1 > data.count;
      if (isPagingOutRange) {
        showNotification(findNotiConfig(NotiCode.PAGING_OUT_RANGE));
        updateSearchParams({numPages: DEFAULT_PAGE.toString()});
      }

      return data;
    },
    placeholderData: keepPreviousData,
  });

  const updateSearchParams = (param: Partial<{[k in keyof DataGridFilter]: string}>) => {
    setSearchParams({...Object.fromEntries(searchParams), ...param}, {replace: true});
  };

  return (
    <DataTable<T>
      className={classNames('rounded-md', className)}
      classNames={{pagination: 'p-0 pt-4', table: 'text-base'}}
      fetching={isFetching}
      columns={columns}
      records={listData?.body}
      totalRecords={listData?.count}
      page={queryParams.numPages + 1}
      onPageChange={(p) => updateSearchParams({numPages: p.toString()})}
      recordsPerPage={queryParams.pageSize}
      recordsPerPageOptions={PAGESIZE_OPTIONS}
      recordsPerPageLabel={t('common.pagination.recordsPerPage')}
      onRecordsPerPageChange={(s) =>
        updateSearchParams({numPages: DEFAULT_PAGE.toString(), pageSize: s.toString()})
      }
      paginationSize="md"
      paginationText={({from, to, totalRecords}) =>
        `${t('common.pagination.info', {from, to, totalRecords})}`
      }
      verticalSpacing="sm"
      verticalAlign="center"
      noRecordsText={t('common.noData')}
      highlightOnHover
    />
  );
};

export default DataGrid;
