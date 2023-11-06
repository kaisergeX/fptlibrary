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

const validationSchema = z.object({
  email: z.string().trim().email(i18next.t('auth.validation.email')),
  password: z.string().min(8, i18next.t('auth.validation.password')),
});

type LoginForm = z.infer<typeof validationSchema>;

const LoginPage = () => {
  const {t} = useTranslation();
  const {setToken} = usePersistStore();
  const {userInfo, setUserInfo} = useStorage();

  const form = useForm<LoginForm>({
    initialValues: {
      email: userInfo.email,
      password: '',
    },

    validate: zodResolver(validationSchema),
    validateInputOnBlur: true,
  });

  const handleLogin = (formValues: LoginForm) => {
    // @todo call API then
    setUserInfo({email: formValues.email.trim()});
    setToken({accessToken: 'fakeToken'});
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
