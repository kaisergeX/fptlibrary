import {SEARCH_PARAMS} from '~/config/path';

export function countFilterType(
  searchParams: URLSearchParams,
  omitKeys: string[] = [SEARCH_PARAMS.SEARCH, SEARCH_PARAMS.PAGE, SEARCH_PARAMS.PAGE_SIZE],
) {
  let countFilter = 0;
  Object.keys(Object.fromEntries(searchParams)).forEach((key) => {
    if (omitKeys.includes(key.toLowerCase())) {
      return;
    }
    countFilter++;
  });

  return countFilter;
}
