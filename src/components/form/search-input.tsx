import {TextInput, CloseButton} from '@mantine/core';
import {getHotkeyHandler} from '@mantine/hooks';
import {IconSearch} from '@tabler/icons-react';
import {t} from 'i18next';
import {useCallback, useRef, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import {SEARCH_PARAMS} from '~/config/path';

export default function SearchInput() {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchKeyword, setSearchKeyword] = useState(searchParams.get(SEARCH_PARAMS.SEARCH) || '');

  const handleSearch = useCallback(
    (keyWord: string) =>
      setSearchParams(
        (prevSearchParams) => {
          if (!keyWord) {
            prevSearchParams.delete(SEARCH_PARAMS.SEARCH);
            return prevSearchParams;
          }

          return {
            ...Object.fromEntries(prevSearchParams),
            [SEARCH_PARAMS.SEARCH]: keyWord,
          };
        },
        {replace: true},
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <TextInput
      ref={searchInputRef}
      classNames={{wrapper: 'transition-[width]'}}
      value={searchKeyword}
      onChange={(event) => setSearchKeyword(event.target.value)}
      type="search"
      placeholder={t('common.search')}
      leftSection={<IconSearch size="1rem" />}
      leftSectionProps={{
        className: 'cursor-pointer',
        onClick: () => {
          handleSearch(searchKeyword);
          searchInputRef.current?.focus();
        },
      }}
      rightSection={
        searchKeyword ? (
          <CloseButton
            onClick={() => {
              setSearchKeyword('');
              handleSearch('');
              searchInputRef.current?.focus();
            }}
          />
        ) : undefined
      }
      onKeyDown={getHotkeyHandler([['Enter', () => handleSearch(searchKeyword)]])}
      autoFocus
    />
  );
}
