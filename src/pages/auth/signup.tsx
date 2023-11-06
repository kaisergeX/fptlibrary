import {PasswordInput, TextInput} from '@mantine/core';
import {useForm, zodResolver} from '@mantine/form';
import {Trans, useTranslation} from 'react-i18next';
import {Link, useNavigate} from 'react-router-dom';
import i18next from 'i18next';
import {z} from 'zod';
import {Path} from '~/config/path';
import {Head} from '~/layout/outlet/Head';
import {useStorage} from '~/store';

const validationSchema = z
  .object({
    email: z.string().trim().email(i18next.t('auth.validation.email')),
    password: z.string().min(8, i18next.t('auth.validation.password')),
    confirmPassword: z.string().min(1, i18next.t('common.validation.required')),
  })
  .refine(({password, confirmPassword}) => password === confirmPassword, {
    message: i18next.t('auth.validation.passwordNotMatch'),
    path: ['confirmPassword'],
  });

type SignupForm = z.infer<typeof validationSchema>;

const SignUpPage = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const setUserInfo = useStorage((state) => state.setUserInfo);

  const form = useForm<SignupForm>({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },

    validate: zodResolver(validationSchema),
    validateInputOnChange: ['confirmPassword'],
    validateInputOnBlur: true,
  });

  const handleSignup = (formValues: SignupForm) => {
    // @todo call API then
    setUserInfo({email: formValues.email});
    navigate(Path.LOGIN, {replace: true});
  };

  return (
    <>
      <Head title={t('auth.signUp')} />

      <form
        id="sign-up-form"
        className="flex flex-col gap-4 pt-8"
        onSubmit={form.onSubmit(handleSignup)}
      >
        <TextInput
          withAsterisk
          size="md"
          label="Email"
          placeholder="your@email.com"
          autoFocus
          {...form.getInputProps('email')}
        />

        <PasswordInput
          withAsterisk
          size="md"
          label={t('auth.password')}
          placeholder={t('auth.password')}
          {...form.getInputProps('password')}
        />

        <PasswordInput
          withAsterisk
          size="md"
          label={t('auth.confirmPassword')}
          autoComplete="off"
          placeholder={t('auth.confirmPassword')}
          {...form.getInputProps('confirmPassword')}
        />

        <div className="mb-4 text-sm">
          <Trans
            t={t}
            i18nKey="policy.sentence"
            components={{
              PolicyComponent: (
                <Link
                  to="#"
                  // rel="noopener noreferrer nofollow" target="_blank"
                />
              ),
            }}
            values={{policy: t('policy.privacy.title')}}
          />
        </div>

        <button className="button w-full justify-center text-base" type="submit">
          {t('auth.signUp')}
        </button>
      </form>
    </>
  );
};

export default SignUpPage;
