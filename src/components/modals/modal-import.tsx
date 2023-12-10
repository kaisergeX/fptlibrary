import {ActionIcon, Button, Input, Modal} from '@mantine/core';
import {Dropzone, MS_EXCEL_MIME_TYPE} from '@mantine/dropzone';
import {IconCircleCheckFilled, IconFileCheck, IconInfoCircle} from '@tabler/icons-react';
import {IconDragDrop, IconFileSpreadsheet} from '@tabler/icons-react';
import {IconBan, IconCloudUpload, IconFileDownload, IconX} from '@tabler/icons-react';
import {useState, type ReactNode, useCallback, memo} from 'react';
import {useTranslation} from 'react-i18next';
import {MAX_FILE_SIZE, MAX_FILE_SIZE_MB, ACCEPTED_IMPORT_FILE_EXTENSIONS} from '~/config/system';
import {DOCUMENTS_URL, ImportStatus} from '~/constants';
import {classNames, findNotiConfig} from '~/util';
import {zodExcel} from '~/util/validation';
import FakeProgressBar from '../fake-progress-bar';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {API, DEFAULT_STALE_TIME, QueryKey} from '~/constants/service';
import type {BookImportDetailResData, BookImportRequest, BookImportResData} from '~/types';
import {http} from '~/util/http';
import {hideNotification, showNotification} from '@mantine/notifications';
import {NotiCode} from '~/types/notification';
import {generatePath} from 'react-router-dom';

type ModalImportProps = {
  opened: boolean;
  title?: ReactNode;
  onClose: () => void;
};

export default memo(function ModalImport({opened, title, onClose}: ModalImportProps) {
  const {t} = useTranslation();
  const queryClient = useQueryClient();
  const [importInProgress, setImportInProgress] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [errorMsg, setErrorMsg] = useState('');
  const [importId, setImportId] = useState('');

  const {isPending: isPendingUpload, mutate: mutateImport} = useMutation({
    mutationFn: (payload: BookImportRequest) =>
      http.post<BookImportResData>(API.BOOK_IMPORT, payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    onSuccess: ({body}) => {
      showNotification(findNotiConfig(NotiCode.BOOK_IMPORT_PROCESSING));
      setImportInProgress(true);
      setImportId(body?.id.toString());
    },
  });

  const {data: importCompleted} = useQuery({
    queryKey: [QueryKey.BOOK_IMPORT_DETAIL, importId],
    queryFn: () =>
      http.get<BookImportDetailResData>(generatePath(API.BOOK_IMPORT_DETAIL, {id: importId})),
    select: ({body}) => {
      if (
        body.status === ImportStatus.IMPORT_STATUS_DONE ||
        body.status === ImportStatus.IMPORT_STATUS_ERROR
      ) {
        hideNotification(NotiCode.BOOK_IMPORT_PROCESSING);
        handleResetState();
      }

      if (body.status === ImportStatus.IMPORT_STATUS_DONE) {
        void queryClient.invalidateQueries({queryKey: [QueryKey.BOOKS]});
      }

      if (body.status === ImportStatus.IMPORT_STATUS_ERROR) {
        setErrorMsg(t('import.error.process'));
      }

      return body.status === ImportStatus.IMPORT_STATUS_DONE;
    },
    staleTime: DEFAULT_STALE_TIME,
    refetchInterval: importId ? 5000 : false,
    enabled: !!importId,
  });

  const isProcessing = importInProgress || isPendingUpload;

  const handleFileSelection = useCallback((file?: File) => {
    if (!file) {
      return setErrorMsg('');
    }

    const validateFile = zodExcel.safeParse(file);
    if (!validateFile.success) {
      setErrorMsg(validateFile.error.errors[0].message);
      return;
    }

    setSelectedFile(file);
    setErrorMsg('');
  }, []);

  const handleResetState = () => {
    setImportId('');
    setSelectedFile(undefined);
    setImportInProgress(false);
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={title || t('import.importData')}
      size="xl"
      radius="md"
      centered
      overlayProps={{backgroundOpacity: 0.5, blur: 2}}
    >
      <a
        className="link-secondary inline-flex gap-1 font-semibold text-green-700 hover:text-green-600"
        href={DOCUMENTS_URL.BOOKS_IMPORT_TEMPLATE}
        target="_blank"
        rel="noopener noreferrer"
      >
        <IconFileDownload /> {t('import.templateFile')}
      </a>

      <div className="relative">
        {!selectedFile || isProcessing || (
          <ActionIcon
            className="absolute -right-3 -top-3 z-10"
            radius="xl"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedFile(undefined);
            }}
          >
            <IconX />
          </ActionIcon>
        )}
        <Dropzone
          className={classNames(
            'group flex-center relative min-h-[30vh] w-full text-center',
            importInProgress || importCompleted ? 'border-none' : '',
            errorMsg ? 'border-red-600' : '',
          )}
          classNames={{inner: 'flex-center w-full flex-col gap-2'}}
          onDrop={(files) => handleFileSelection(files[0])}
          onReject={(fileRejections) => handleFileSelection(fileRejections[0].file)}
          maxSize={MAX_FILE_SIZE}
          accept={MS_EXCEL_MIME_TYPE}
          disabled={!!selectedFile || isProcessing}
        >
          <Dropzone.Accept>
            <IconFileCheck className="text-green-600" size="3rem" />
          </Dropzone.Accept>

          <Dropzone.Idle>
            {selectedFile ? (
              <IconFileSpreadsheet className="text-slate-500" size="3rem" />
            ) : (
              <IconDragDrop className="text-slate-500" size="3rem" />
            )}
          </Dropzone.Idle>

          <Dropzone.Reject>
            <IconBan className="text-red-600" size="3rem" />
          </Dropzone.Reject>

          {selectedFile ? (
            <div className="flex w-full flex-col items-center">
              <h3>{selectedFile.name}</h3>

              {(importInProgress || importCompleted) && (
                <>
                  <h4 className="mt-8 flex w-full items-center gap-1 text-left">
                    {importCompleted ? (
                      <>
                        <IconCircleCheckFilled
                          size="1rem"
                          className="text-[--mantine-color-teal-filled]"
                        />
                        {t('common.completed')}!
                      </>
                    ) : (
                      <>{t('common.processing')}...</>
                    )}
                  </h4>
                  <FakeProgressBar
                    start
                    completed={importCompleted}
                    className="w-full"
                    classNames={{section: 'transition-[width] duration-300'}}
                    color="teal"
                    radius="md"
                    size="lg"
                    maxFakeProgress={95}
                    animated
                    frequency={3000}
                  />
                </>
              )}
            </div>
          ) : (
            <>
              <h3>{t('common.dragFile')}</h3>
              <p className="text-xs text-slate-500 sm:text-sm">
                {t('common.validation.fileType', {
                  mimeTypes: ACCEPTED_IMPORT_FILE_EXTENSIONS.join(', '),
                })}
                <br />
                {t('common.validation.maxFileSize', {
                  size: `${MAX_FILE_SIZE_MB}MB`,
                })}
              </p>
            </>
          )}
        </Dropzone>
        <Input.Error className="mt-2">{errorMsg}</Input.Error>
      </div>

      <div className="flex-center-between mt-4 gap-4 max-sm:flex-col">
        <Input.Description className="flex gap-1 whitespace-pre-wrap">
          <IconInfoCircle size="1rem" /> {t('import.takeTime')}
        </Input.Description>
        <Button
          leftSection={<IconCloudUpload />}
          disabled={!selectedFile}
          loading={isProcessing}
          onClick={() => selectedFile && mutateImport({file: selectedFile})}
        >
          {t('common.upload')}
        </Button>
      </div>
    </Modal>
  );
});
