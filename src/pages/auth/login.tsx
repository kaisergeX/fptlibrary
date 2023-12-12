import {useTranslation} from 'react-i18next';
import {Head} from '~/layout/outlet/Head';
import {GoogleLogin} from '@react-oauth/google';
import AppLogo from '~/components/app-logo';
import {showNotification} from '@mantine/notifications';
import {findNotiConfig} from '~/util';
import {ErrorCode} from '~/types/notification';
import useAuth from '~/hook/useAuth';

const LoginPage = () => {
  const {t} = useTranslation();
  const {loginMutate} = useAuth();

  return (
    <>
      <Head title={t('auth.login')} />

      <main className="bg-theme flex-center h-full">
        <div className="flex flex-col items-center gap-8 p-4 sm:w-full sm:max-w-lg">
          <AppLogo className="h-24" />

          <GoogleLogin
            onSuccess={({credential}) => {
              if (!credential) {
                showNotification(findNotiConfig(ErrorCode.ERR_UNAUTHORIZED));
                return;
              }

              loginMutate({credential});
            }}
            onError={() => showNotification(findNotiConfig(ErrorCode.ERR_UNAUTHORIZED))}
            shape="circle"
          />
        </div>
      </main>
    </>
  );
};

export default LoginPage;
