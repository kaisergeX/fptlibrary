import {useTranslation} from 'react-i18next';
import ModalMembership from './modals/modal-membership';
import {useState} from 'react';
import {Button} from '@mantine/core';

type TermsAndConditionsProps = {
  hideGreeting?: boolean;
  confirmSignup?: boolean;
};

export default function TermsAndConditions({
  confirmSignup = false,
  hideGreeting = false,
}: TermsAndConditionsProps) {
  const {t} = useTranslation();
  const [openedMembershipGuide, setOpenedMembershipGuide] = useState(false);

  return (
    <div>
      {hideGreeting || (
        <>
          <div className="text-center text-4xl">👋</div>
          <h2 className="text-center font-bold max-sm:whitespace-pre-wrap">
            {t('common.fullGreeting')}
          </h2>
        </>
      )}
      <div className="space-y-4 py-4 font-semibold sm:px-14">
        {confirmSignup && <p>{t('terms.beforeContinue')}.</p>}
        <p>
          {t('terms.membership')}:{' '}
          <Button
            variant="light"
            size="compact-md"
            color="green"
            onClick={() => setOpenedMembershipGuide(true)}
          >
            {t('users.membershipGuide')}
          </Button>
          <br />
          {t('users.renewMembership.noMembership')}
        </p>
        <p>
          {t('terms.googleAccount')}{' '}
          <a
            href="https://support.google.com/accounts/answer/12921417"
            rel="noopener noreferrer nofollow"
            target="_blank"
          >
            {t('terms.readMoreGoogleInfoShare')}
          </a>
          .
        </p>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 z-[-1] w-1/5 overflow-hidden opacity-30">
        <img
          className="sm:-mb-6 sm:-ml-10"
          src="/image/hero-bg-left.png"
          alt="book background image"
        />
      </div>
      <ModalMembership
        title={t('users.membershipGuide')}
        opened={openedMembershipGuide}
        onClose={() => setOpenedMembershipGuide(false)}
      />
    </div>
  );
}
