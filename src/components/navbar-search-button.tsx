import {Tooltip, ActionIcon} from '@mantine/core';
import {useClickOutside, useHotkeys, useOs, useTimeout} from '@mantine/hooks';
import {IconSearch} from '@tabler/icons-react';
import {memo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import {Path} from '~/config/path';
import {isMobile} from '~/util';

const shouldShowHotKeyHint = Math.floor(Math.random() * 10) === 5;

export default memo(function NavbarSearchButton() {
  const navigate = useNavigate();
  const {t} = useTranslation();
  const deviceOS = useOs();
  const [hotkeyHintOpened, setHotkeyHintOpened] = useState(!isMobile() && shouldShowHotKeyHint);

  const {clear: clearAutoCloseHint} = useTimeout(
    () => {
      hotkeyHintOpened && setHotkeyHintOpened(false);
    },
    5000,
    {autoInvoke: hotkeyHintOpened},
  );

  const hotkeyHintRef = useClickOutside(() => {
    setHotkeyHintOpened(false);
    clearAutoCloseHint();
  });

  useHotkeys([['ctrl+K', () => navigate(Path.BOOK_BROWSING)]]);

  return (
    <Tooltip
      ref={hotkeyHintRef}
      label={t('common.navSearchHotKeyHint', {hotkey: deviceOS === 'macos' ? '⌘ K' : 'Ctrl + K'})}
      opened={hotkeyHintOpened}
      withArrow
    >
      <ActionIcon
        variant="subtle"
        size="lg"
        radius="xl"
        aria-label="Search book"
        className="dark:text-inherit"
        onClick={() => navigate(Path.BOOK_BROWSING)}
      >
        <IconSearch />
      </ActionIcon>
    </Tooltip>
  );
});
