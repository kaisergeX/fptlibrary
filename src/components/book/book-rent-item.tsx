import {Image, type ImageProps, ActionIcon, Tooltip} from '@mantine/core';
import {IconNotebookOff} from '@tabler/icons-react';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';
import {usePersistStore} from '~/store';
import type {Book} from '~/types';
import {classNames} from '~/util';

type BookRentItemProps = Book & {
  className?: string;
  coverProps?: Omit<ImageProps, 'src'> & {alt?: string};
  onActionClick?: () => void;
};

const BookRentItem = ({
  className = '',
  id,
  cover,
  title,
  author,
  coverProps,
}: BookRentItemProps) => {
  const {t} = useTranslation();
  const removeBook = usePersistStore((state) => state.removeBook);

  return (
    <div className={classNames('flex w-full gap-2', className)}>
      <div className="flex aspect-[1/1.5] basis-1/3">
        <Image
          className="rounded-lg"
          src={cover}
          fallbackSrc={`https://placehold.co/200x300?text=${title}`}
          alt={`Book cover - ${title}`}
          loading="lazy"
          {...coverProps}
        />
      </div>
      <div className="flex basis-2/3 flex-col justify-between gap-2">
        <article className="flex flex-col gap-2">
          <div>
            <Link className="link-secondary" to="#">
              <h3 className="line-clamp-2 text-base font-bold">{title}</h3>
            </Link>
            {author && <div className="italic">{author}</div>}
          </div>
        </article>
        <div className="flex-center-between">
          {/* <span>{t('common.quantity')}: 1</span> */}
          <span></span>

          <Tooltip label={t('common.delete')}>
            <ActionIcon
              variant="subtle"
              color="red"
              radius="xl"
              aria-label="Remove book"
              className="dark:text-inherit"
              onClick={() => removeBook(id)}
            >
              <IconNotebookOff />
            </ActionIcon>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default BookRentItem;
