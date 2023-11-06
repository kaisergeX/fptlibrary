import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';
import {Path} from '~/config/path';
import {SERVICE_NAME} from '~/config/system';

const AppLogo = ({className = ''}: {className?: string}) => {
  const {t} = useTranslation();

  return (
    <h1 className={className}>
      <Link
        to={Path.HOMEPAGE}
        className="link-unstyled font-handwriting font-normal transition-all hover:drop-shadow-md"
      >
        {t('common.appName') || SERVICE_NAME}
      </Link>
    </h1>
  );
};

export default AppLogo;
