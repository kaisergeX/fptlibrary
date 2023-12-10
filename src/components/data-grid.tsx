import {useCallback, useMemo} from 'react';
import {keepPreviousData, useQuery} from '@tanstack/react-query';
import {DataTable, type DataTableColumn} from 'mantine-datatable';
import {showNotification} from '@mantine/notifications';
import {useSearchParams} from 'react-router-dom';

import {DEFAULT_PAGE, DEFAULT_PAGESIZE, PAGESIZE_OPTIONS} from '~/config/system';
import {useTranslation} from 'react-i18next';
import {classNames, findNotiConfig, genericMemo, safeAnyToNumber} from '~/util';
import type {API, QueryKey} from '~/constants/service';
import {NotiCode} from '~/types/notification';
import type {DataGridFilter, ExtractValues, ListResponseData} from '~/types';
import {http} from '~/util/http';
import {SEARCH_PARAMS} from '~/config/path';

type DataGridProps<T> = {
  className?: string;
  isLoading?: boolean;
  columns: DataTableColumn<T>[];
  queryKey: ExtractValues<typeof QueryKey>;
  api: ExtractValues<typeof API>;
};

function DataGridComponent<T>({
  className = '',
  isLoading = false,
  columns,
  api,
  queryKey,
}: DataGridProps<T>) {
  const {t} = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParams = useMemo<DataGridFilter>(() => {
    const getParamsObject = Object.fromEntries(searchParams);

    return {
      ...getParamsObject,
      page: safeAnyToNumber(getParamsObject[SEARCH_PARAMS.PAGE], DEFAULT_PAGE),
      pageSize: safeAnyToNumber(getParamsObject[SEARCH_PARAMS.PAGE_SIZE], DEFAULT_PAGESIZE),
    };
  }, [searchParams]);

  const {data: listData, isFetching} = useQuery({
    queryKey: [queryKey, queryParams],
    queryFn: () => http.get<ListResponseData<T>>(api, {params: queryParams}),
    select: (data) => {
      const isPagingOutRange = queryParams[SEARCH_PARAMS.PAGE] > data.numPages;
      if (isPagingOutRange) {
        showNotification(findNotiConfig(NotiCode.PAGING_OUT_RANGE));
        updateSearchParams({page: DEFAULT_PAGE.toString()});
      }

      return data;
    },
    placeholderData: keepPreviousData,
  });

  const updateSearchParams = useCallback(
    (param: Partial<{[k in keyof DataGridFilter]: string}>) => {
      setSearchParams({...Object.fromEntries(searchParams), ...param}, {replace: true});
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchParams],
  );

  return (
    <DataTable<T>
      className={classNames('rounded-md', className)}
      classNames={{pagination: 'p-0 pt-4', table: 'text-base'}}
      fetching={isLoading || isFetching}
      columns={columns}
      records={listData?.body}
      totalRecords={listData?.count || listData?.body.length || 0}
      page={queryParams[SEARCH_PARAMS.PAGE]}
      recordsPerPage={queryParams[SEARCH_PARAMS.PAGE_SIZE]}
      recordsPerPageOptions={PAGESIZE_OPTIONS}
      onPageChange={(p) => updateSearchParams({page: p.toString()})}
      recordsPerPageLabel={t('common.pagination.recordsPerPage')}
      onRecordsPerPageChange={(s) =>
        updateSearchParams({page: DEFAULT_PAGE.toString(), pageSize: s.toString()})
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
}

const DataGrid = genericMemo(DataGridComponent);
export default DataGrid;
