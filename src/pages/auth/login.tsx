import {Button} from '@mantine/core';
import {useTranslation} from 'react-i18next';
import {useLocation, useSearchParams} from 'react-router-dom';
import {Head} from '~/layout/outlet/Head';
import {usePersistStore, useStorage} from '~/store';
import type {ResponseData} from '~/types';
import {useGoogleLogin} from '@react-oauth/google';
import GoogleLogo from '~/assets/GoogleLogo';
import AppLogo from '~/components/app-logo';
import Footer from '~/layout/footer';

type LoginPayload = {
  username: string;
  password: string;
};

type LoginResData = ResponseData<{
  refresh: string;
  access: string;
}>;

const LoginPage = () => {
  const {t} = useTranslation();
  const location = useLocation();
  const {setToken} = usePersistStore();
  const {userInfo, setUserInfo} = useStorage();
  const [searchParams] = useSearchParams();
  console.log(searchParams.get('code'));

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse),
    flow: 'auth-code',
    ux_mode: 'redirect',
    redirect_uri: window.location.origin,
  });

  // const {mutate: loginMutate, isPending} = useMutation({
  //   mutationFn: (payload: LoginPayload) => http.post<LoginResData>(API.LOGIN, payload),
  //   onSuccess: ({body}, {username}) => {
  //     setToken({accessToken: body.access, refreshToken: body.refresh});
  //     setUserInfo({email: username});
  //   },
  // });

  return (
    <>
      <Head title={t('auth.login')} />

      <main className="bg-theme flex-center h-full">
        <div className="flex flex-col items-center gap-8 p-4 sm:w-full sm:max-w-lg">
          <AppLogo className="h-24" />

          <Button
            leftSection={<GoogleLogo />}
            variant="default"
            radius="md"
            size="md"
            onClick={() => googleLogin()}
          >
            {t('auth.signIn.withGoogle')}
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default LoginPage;
