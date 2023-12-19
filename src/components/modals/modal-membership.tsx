import {Modal, Divider} from '@mantine/core';
import {IconInfoCircle} from '@tabler/icons-react';
import {useTranslation} from 'react-i18next';
import WorkplaceIcon from '~/assets/WorkplaceIcon';

type ModalMembershipProps = {
  title?: string;
  opened: boolean;
  onClose: () => void;
};

export default function ModalMembership({title, opened, onClose}: ModalMembershipProps) {
  const {t} = useTranslation();
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={title}
      classNames={{content: 'bg-gray-100'}}
      overlayProps={{backgroundOpacity: 0.5, blur: 2}}
      radius="md"
      size="lg"
      centered
      zIndex={201}
    >
      <div className="my-4 flex items-center gap-4 text-center max-sm:flex-col">
        <div className="w-full rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-800 sm:basis-1/2">
          <h3 className="mb-4 text-2xl font-bold">{t('users.renewMembership.monthly')}</h3>
          <span className="text-3xl font-black leading-none">
            13.000 <sup>&#8363;</sup>
          </span>{' '}
          / {t('users.renewMembership.perMonth')}
        </div>
        <div className="border-animate w-full rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-800 sm:basis-1/2">
          <h3 className="mb-4 text-center text-2xl font-bold">
            {t('users.renewMembership.yearly')}
          </h3>
          <span className="relative text-3xl font-black leading-none">
            <del className="absolute -top-4 left-0 text-sm font-normal opacity-70">
              <span>156.000&#8363;</span>
            </del>
            139.000 <sup>&#8363;</sup>
          </span>{' '}
          / {t('users.renewMembership.perYear')}
        </div>
      </div>
      <Divider my="lg" variant="dashed" />
      <h3>{t('users.renewMembership.bankTransfer')}</h3>

      <a
        href="https://fpt.workplace.com/groups/1082042972793515"
        className="inline-flex align-middle"
        target="_blank"
        rel="noopener noreferrer"
      >
        <WorkplaceIcon /> {t('users.membershipGuide')}
      </a>
      {/* <p>
        {t('users.renewMembership.bankAccount')}:{' '}
        <span className="text-lg font-semibold">xxxxxx</span>
        <br />
        Ngân hàng A
      </p> */}

      <Divider my="lg" variant="dashed" />
      <p>{t('users.renewMembership.noMembership')}</p>
      <Divider my="lg" variant="dashed" />
      <div className="flex gap-2">
        <IconInfoCircle />
        {t('users.renewMembership.guide')}
      </div>
    </Modal>
  );
}
