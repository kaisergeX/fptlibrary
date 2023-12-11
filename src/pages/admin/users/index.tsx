import {useTranslation} from 'react-i18next';
import DataGrid from '~/components/data-grid';
import SearchInput from '~/components/form/search-input';
import {API, QueryKey} from '~/constants/service';
import CommonHeader from '~/layout/common-header';
import {Head} from '~/layout/outlet/Head';
import type {UserManagament} from '~/types';
import {usersColumnConfig} from './users-table-config';

export default function UserManagement() {
  const {t} = useTranslation();

  // const {isPending, mutate: removeBookMutate} = useMutation({
  //   mutationFn: (userId: UserManagament['id']) =>
  //     http.delete(generatePath(API.BOOK_REMOVE, {id: removeBookId})),
  //   onSuccess: async () => {
  //     confirmRemoveBook.value = undefined;
  //     await queryClient.invalidateQueries({queryKey: [QueryKey.BOOKS]});
  //     showNotification({
  //       ...findNotiConfig(NotiCode.SUCCESS),
  //       message: t('common.success.action', {action: t('book.action.remove')}),
  //     });
  //   },
  // });

  // useEffect(() => {
  //   return () => {
  //     if (confirmRemoveBook.value) {
  //       confirmRemoveBook.value = undefined;
  //     }
  //   };
  // }, []);

  return (
    <div className="flex h-full flex-col">
      <Head title={t('users.pageTitle')} />
      <CommonHeader title={t('users.pageTitle')} />

      <div className="flex-center-between mb-4 gap-4 pr-2">
        <SearchInput />
      </div>

      <DataGrid<UserManagament>
        queryKey={QueryKey.USERS}
        // isLoading={isPending}
        api={API.USERS}
        columns={usersColumnConfig}
      />
    </div>
  );
}
