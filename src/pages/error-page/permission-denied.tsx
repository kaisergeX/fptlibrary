import {Divider} from '@mantine/core';
import {IconArrowLeft} from '@tabler/icons-react';
import {useTranslation} from 'react-i18next';
import {Link, useNavigate} from 'react-router-dom';
import {Path} from '~/config/path';
import {Head} from '~/layout/outlet/Head';

const PermissionDenied = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <Head title={t('auth.denied.title')} />

      <main className="flex-center h-full flex-col p-4">
        <div className="mb-8 items-center gap-4 sm-only:text-center sm:flex">
          <h1>403</h1>
          <Divider orientation="vertical" />
          <div className="py-4">
            <h2>{t('auth.denied.title')}</h2>
            <p className="mt-4 whitespace-pre-wrap text-sm">{t('auth.denied.description')}</p>
          </div>
        </div>

        <div className="flex gap-4">
          <button type="button" className="button" onClick={() => navigate(-1)}>
            <IconArrowLeft size="1.2rem" /> {t('common.back')}
          </button>
          <Link to={Path.HOMEPAGE} className="button-secondary" replace>
            🏡 {t('home.pageTitle')}
          </Link>
        </div>
      </main>
    </>
  );
};

export default PermissionDenied;
