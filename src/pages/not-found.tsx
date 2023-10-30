import {Button} from '@mantine/core';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import {Path} from '~/config/path';
import {Head} from '~/layout/outlet/Head';
import Animated404 from '~/assets/icon/404-animated.svg';
import {IconHome} from '@tabler/icons-react';

const NotFoundPage = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <Head title="404" />
      <div className="grid h-[100dvh] grid-cols-2 place-items-center gap-4 pl-4">
        <div>
          <h1>{t('common.notFound.title')}</h1>
          <p className="my-4 whitespace-pre-line">{t('common.notFound.description')}</p>

          <Button
            variant="outline"
            onClick={() => navigate(Path.HOMEPAGE)}
            leftSection={<IconHome size={20} />}
          >
            {t('home.pageTitle')}
          </Button>
        </div>
        <div className="flex h-full w-full flex-col justify-center overflow-hidden bg-[#262a37]">
          <object className="ml-auto max-h-full" type="image/svg+xml" data={Animated404}>
            404-svg-animation
          </object>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
