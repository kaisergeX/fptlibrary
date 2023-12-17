import {LoadingOverlay} from '@mantine/core';
import {useTranslation} from 'react-i18next';
import {Head} from '~/layout/outlet/Head';
import DashboardStatistic from './statistic';
import {Suspense} from 'react';

const CMSDashboard = () => {
  const {t} = useTranslation();

  return (
    <>
      <Head title={t('dashboard.pageTitle')} />
      <Suspense fallback={<LoadingOverlay />}>
        <DashboardStatistic />
      </Suspense>
    </>
  );
};

export default CMSDashboard;
