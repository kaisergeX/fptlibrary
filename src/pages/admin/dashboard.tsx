import {Progress, RingProgress} from '@mantine/core';
import {useTranslation} from 'react-i18next';
import {Head} from '~/layout/outlet/Head';

const CMSDashboard = () => {
  const {t} = useTranslation();

  return (
    <div className="p-4">
      <Head title={t('dashboard.pageTitle')} />
      <h2>Admin Dashboard</h2>
      <h3 className="py-4">Dữ liệu tổng quan</h3>
      <RingProgress
        size={200}
        thickness={20}
        roundCaps
        sections={[
          {value: 40, color: 'cyan'},
          {value: 15, color: 'orange'},
          {value: 15, color: 'grape'},
        ]}
      />

      <h3 className="py-4">Thống kê theo thể loại</h3>
      <Progress.Root size="1.2rem">
        <Progress.Section value={35} color="cyan">
          <Progress.Label>{t('genre.cookBooks')} - 35%</Progress.Label>
        </Progress.Section>
        <Progress.Section value={28} color="pink">
          <Progress.Label>{t('genre.fantasy')} - 28%</Progress.Label>
        </Progress.Section>
        <Progress.Section value={15} color="orange">
          <Progress.Label>{t('genre.mystery')} - 15%</Progress.Label>
        </Progress.Section>
      </Progress.Root>
    </div>
  );
};

export default CMSDashboard;
