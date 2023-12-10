import {Button, LoadingOverlay, Modal} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import {IconPrinter} from '@tabler/icons-react';
import {useRef, type ReactNode, type PropsWithChildren} from 'react';
import {useTranslation} from 'react-i18next';
import {useReactToPrint} from 'react-to-print';

type ModalPrintProps = {
  className?: string;
  opened: boolean;
  documentTitle: string;
  title?: ReactNode;
  onClose: () => void;
};

export default function ModalPrint({
  className = '',
  opened = false,
  title,
  documentTitle,
  onClose,
  children,
}: PropsWithChildren<ModalPrintProps>) {
  const {t} = useTranslation();
  const printComponentRef = useRef<HTMLDivElement>(null);
  const [printLoading, {open, close}] = useDisclosure(false);

  const handlePrint = useReactToPrint({
    content: () => printComponentRef.current,
    onBeforeGetContent: () => {
      open();
      setTimeout(() => {
        close();
      }, 1000);
    },
    documentTitle,
    removeAfterPrint: true,
  });

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={title}
      size="xl"
      radius="md"
      centered
      overlayProps={{backgroundOpacity: 0.5, blur: 2}}
      withCloseButton={!printLoading}
      closeOnEscape={!printLoading}
      closeOnClickOutside={!printLoading}
    >
      <LoadingOverlay visible={printLoading} overlayProps={{blur: 2}} />
      <div className={className} ref={printComponentRef}>
        {children}
      </div>
      <div className="mt-4 text-right">
        <Button leftSection={<IconPrinter />} onClick={handlePrint}>
          {t('common.print')}
        </Button>
      </div>
    </Modal>
  );
}
