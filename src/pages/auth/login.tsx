import {useTranslation} from 'react-i18next';
import {Head} from '~/layout/outlet/Head';
import {GoogleLogin} from '@react-oauth/google';
import AppLogo from '~/components/app-logo';
import {showNotification} from '@mantine/notifications';
import {findNotiConfig} from '~/util';
import {ErrorCode} from '~/types/notification';
import useAuth from '~/hook/useAuth';
import {Button} from '@mantine/core';
import {modals} from '@mantine/modals';
import TermsAndConditions from '~/components/terms-and-conditions';
import {IconCheck} from '@tabler/icons-react';

const LoginPage = () => {
  const {t} = useTranslation();
  const {loginMutate} = useAuth();

  return (
    <>
      <Head title={t('auth.login')} />

      <main className="bg-theme flex-center h-full">
        <div className="flex flex-col items-center gap-8 p-4">
          <AppLogo className="h-24" />

          <div className="z-10 place-self-center text-center [text-wrap:balance]">
            <h2 className="text-xl font-bold xl:text-2xl 2xl:text-4xl">
              Chào mừng quý vị đến với Cudek - Thư viện Sách văn học FPT Software
            </h2>

            <p className="mt-4 sm:text-lg 2xl:text-xl">
              Thư viện bao gồm 1000+ tựa sách văn học nổi tiếng của VN và Thế giới, bằng tiếng Việt,
              dành cho các Fsofter. Thư viện đặt tại F-Ville 3, FPT Software Hòa lạc. Các tựa sách
              liên tục được cập nhật và bổ sung mới.
              <br />
              Để mượn sách, xin mời các Fsofter đăng ký trở thành member. Xin mời vào group Cộng
              đồng đọc sách Cudek trên FPT Workplace để xem hướng dẫn.
            </p>
          </div>

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

          <div className="text-sm">
            {t('terms.signUp')}{' '}
            <Button
              variant="outline"
              size="compact-sm"
              onClick={() =>
                modals.openConfirmModal({
                  classNames: {body: 'relative'},
                  children: <TermsAndConditions membershipGuideOnWorkplace />,
                  labels: {confirm: t('common.understand'), cancel: ''},
                  confirmProps: {leftSection: <IconCheck size="1.2rem" />},
                  cancelProps: {className: 'hidden'},
                  size: 'xl',
                  closeOnClickOutside: false,
                  withCloseButton: false,
                })
              }
            >
              {t('terms.title')}
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default LoginPage;
