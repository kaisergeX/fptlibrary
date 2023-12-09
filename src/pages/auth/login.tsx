import {useTranslation} from 'react-i18next';
import {Head} from '~/layout/outlet/Head';
import {usePersistStore, useStorage} from '~/store';
import type {ResponseData} from '~/types';
import {GoogleLogin} from '@react-oauth/google';
import AppLogo from '~/components/app-logo';
import {useMutation} from '@tanstack/react-query';
import {API} from '~/constants/service';
import {http} from '~/util/http';
import {showNotification} from '@mantine/notifications';
import {findNotiConfig} from '~/util';
import {ErrorCode} from '~/types/notification';

type LoginPayload = {
  credential: string;
};

type LoginResData = ResponseData<{
  refresh: string;
  access: string;
  user: {
    id: number;
    email: string;
    name: string;
    avatar: string;
  };
}>;

const LoginPage = () => {
  const {t} = useTranslation();
  const {setToken} = usePersistStore();
  const {setUserInfo} = useStorage();

  const {mutate: loginMutate} = useMutation({
    mutationFn: (payload: LoginPayload) => http.post<LoginResData>(API.LOGIN, payload),
    onSuccess: ({body}) => {
      setToken({accessToken: body.access, refreshToken: body.refresh});
      setUserInfo(body.user);
    },
  });

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
