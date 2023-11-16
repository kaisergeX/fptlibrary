import {t} from 'i18next';
import type {ControlledProps} from 'react-medium-image-zoom';
import {classNames} from '~/util';

type CustomZoomContentProps = {
  author?: string;
  summary?: string;
} & Parameters<NonNullable<ControlledProps['ZoomContent']>>[0];

const CustomZoomContent = ({
  author,
  summary,
  buttonUnzoom,
  modalState,
  img,
}: CustomZoomContentProps) => {
  return (
    <>
      {buttonUnzoom}
      <figure>
        {img}

        <figcaption
          className={classNames(
            !summary && !author ? 'hidden' : '',
            'bg-reverse absolute inset-x-0 bottom-0 p-4 transition-opacity duration-300',
            (modalState as unknown) === 'LOADED' ? 'opacity-20 hover:opacity-100' : 'opacity-0',
          )}
        >
          <p className="line-clamp-3">{summary}</p>

          <cite className="mt-4 block text-right">
            {t('book.author')}: {author || t('book.authorUnknown')}
          </cite>
        </figcaption>
      </figure>
    </>
  );
};

export default CustomZoomContent;
