import {useQuery} from '@tanstack/react-query';
import {API, QueryKey} from '~/constants/service';
import type {AgeTagResData, CountryResData, GenresResData} from '~/types';
import {i18nNormalizeKey} from '~/util';
import {http} from '~/util/http';

type MasterDataOptions = {
  enableGenres?: boolean;

  enableCountries?: boolean;
  enableAgeTags?: boolean;
};

const defaulltMasterDataOptions = {
  enableGenres: true,
  enableCountries: true,
  enableAgeTags: true,
};

const defaultMasterData = {
  genreData: {selectGenreList: [], genres: []},
  countryData: {selectCountryList: [], countries: []},
  ageTagData: {selectAgeTagList: [], ageTags: []},
};

export default function useMasterData({
  enableAgeTags = true,
  enableCountries = true,
  enableGenres = true,
}: MasterDataOptions = defaulltMasterDataOptions) {
  const {data: {genres = [], selectGenreList = []} = defaultMasterData.genreData} = useQuery({
    queryKey: [QueryKey.GENRES],
    queryFn: () => http.get<GenresResData>(API.GENRES),
    select: ({body}) => ({
      selectGenreList: body.map(({id, genreName}) => ({
        label: i18nNormalizeKey(`genre.${genreName}`),
        value: id.toString(),
      })),
      genres: body,
    }),
    refetchOnWindowFocus: false,
    enabled: enableGenres,
  });

  const {data: {countries = [], selectCountryList = []} = defaultMasterData.countryData} = useQuery(
    {
      queryKey: [QueryKey.MASTER_DATA_COUNTRIES],
      queryFn: () => http.get<CountryResData>(API.COUNTRIES),
      select: ({body}) => ({
        selectCountryList: body.map(({id, name}) => ({label: name, value: id})),
        countries: body,
      }),
      refetchOnWindowFocus: false,
      enabled: enableCountries,
    },
  );

  const {data: {ageTags = [], selectAgeTagList = []} = defaultMasterData.ageTagData} = useQuery({
    queryKey: [QueryKey.AGE_TAG],
    queryFn: () => http.get<AgeTagResData>(API.AGE_TAGS),
    select: ({body}) => ({
      selectAgeTagList: body.map(({id, ageTagName}) => ({
        label: i18nNormalizeKey(`ageTag.${ageTagName}`),
        value: id.toString(),
      })),
      ageTags: body,
    }),
    refetchOnWindowFocus: false,
    enabled: enableAgeTags,
  });

  return {genres, selectGenreList, countries, selectCountryList, ageTags, selectAgeTagList};
}
