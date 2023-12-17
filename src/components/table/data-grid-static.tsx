import {DataTable, type DataTableColumn} from 'mantine-datatable';
import {useTranslation} from 'react-i18next';
import {classNames} from '~/util';

type DataGridStaticProps<T> = {
  className?: string;
  isLoading?: boolean;
  data?: T[];
  columns: DataTableColumn<T>[];
};

export default function DataGridStatic<T>({
  className = '',
  data,
  isLoading = false,
  columns,
}: DataGridStaticProps<T>) {
  const {t} = useTranslation();

  return (
    <DataTable<T>
      className={classNames('rounded-md', className)}
      classNames={{table: 'text-base'}}
      fetching={isLoading}
      columns={columns}
      records={data}
      verticalSpacing="sm"
      verticalAlign="center"
      noRecordsText={t('common.noData')}
      highlightOnHover
    />
  );
}
