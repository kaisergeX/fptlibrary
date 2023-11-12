import {PasswordInput, TextInput} from '@mantine/core';
import {useForm, zodResolver} from '@mantine/form';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';
import {Path} from '~/config/path';
import {Head} from '~/layout/outlet/Head';
import {IconAt, IconLock} from '@tabler/icons-react';
import i18next from 'i18next';
import {z} from 'zod';
import {usePersistStore, useStorage} from '~/store';
import {useMutation} from '@tanstack/react-query';
import {http} from '~/util/http';
import {API} from '~/constants/service';
import type {ResponseData} from '~/types';

type LoginPayload = {
  username: string;
  password: string;
};

type LoginResData = ResponseData<{
  refresh: string;
  access: string;
}>;

const validationSchema = z.object({
  email: z.string().trim().email(i18next.t('auth.validation.email')),
  password: z.string().min(6, i18next.t('auth.validation.password')),
});

type LoginForm = z.infer<typeof validationSchema>;

const LoginPage = () => {
  const {t} = useTranslation();
  const {setToken} = usePersistStore();
  const {userInfo, setUserInfo} = useStorage();

  const {mutate: loginMutate, isPending} = useMutation({
    mutationFn: (payload: LoginPayload) => http.post<LoginResData>(API.LOGIN, payload),
    onSuccess: ({body}, {username}) => {
      setToken({accessToken: body.access, refreshToken: body.refresh});
      setUserInfo({email: username});
    },
  });

  const form = useForm<LoginForm>({
    initialValues: {
      email: userInfo.email,
      password: '',
    },

    validate: zodResolver(validationSchema),
    validateInputOnBlur: true,
  });

  const handleLogin = ({email, password}: LoginForm) => {
    loginMutate({username: email.trim(), password});
  };

  return (
    <>
      <Head title={t('auth.login')} />

      <form
        id="login-form"
        className="flex flex-col gap-4 py-8"
        onSubmit={form.onSubmit(handleLogin)}
      >
        <TextInput
          leftSectionPointerEvents="none"
          leftSection={<IconAt size="1rem" />}
          withAsterisk
          size="md"
          label="Email"
          placeholder="your@email.com"
          autoFocus
          {...form.getInputProps('email')}
        />

        <PasswordInput
          leftSection={<IconLock size="1rem" />}
          withAsterisk
          size="md"
          label={t('auth.password')}
          placeholder={t('auth.password')}
          autoFocus={!!userInfo.email}
          {...form.getInputProps('password')}
        />
      </form>

      <div>
        <button
          className="button mb-2 w-full justify-center text-base"
          type="submit"
          form="login-form"
          disabled={isPending}
        >
          {t('auth.login')}
        </button>
        <Link className="link-secondary text-sm" to={Path.SIGNUP}>
          {t('auth.toSignUp')}
        </Link>
      </div>
    </>
  );
};

export default LoginPage;
