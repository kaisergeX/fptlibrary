import {IconMail, IconPhone} from '@tabler/icons-react';
import {useQuery} from '@tanstack/react-query';
import {t} from 'i18next';
import {Trans} from 'react-i18next';
import {Link} from 'react-router-dom';
import WorkplaceIcon from '~/assets/WorkplaceIcon';
import AppLogo from '~/components/app-logo';
import {Path, SEARCH_PARAMS} from '~/config/path';
import {API, QueryKey} from '~/constants/service';
import type {GenresResData} from '~/types';
import {arrSamples, classNames} from '~/util';
import {http} from '~/util/http';

export default function Footer({className = ''}: {className?: string}) {
  const {data: genresFooter = []} = useQuery({
    queryKey: [QueryKey.GENRES],
    queryFn: () => http.get<GenresResData>(API.GENRES),
    select: ({body}) => arrSamples(body, 5),
  });

  return (
    <footer className={classNames('relative isolate bg-white dark:bg-black', className)}>
      <div className="absolute inset-x-0 top-[-6vw] z-[-1] hidden sm:block 2xl:top-[-8vw]">
        <img
          className="block w-full dark:invert 2xl:hidden"
          src="/image/layered-waves-haikei.svg"
          alt="hidden"
        />
        <img
          className="hidden w-full dark:invert 2xl:block"
          src="/image/layered-waves-haikei-xl.svg"
          alt="hidden"
        />
      </div>

      <div className="container mx-auto flex justify-between gap-4 px-4 pb-4 sm-only:flex-col sm-only:pt-4 sm:gap-8">
        <div className="sm:w-1/4">
          <AppLogo className="h-24" />
          <h3 className="sm:mt-4">Thư viện Văn học Thế giới DEK biết gì</h3>
          <a
            href="https://maps.app.goo.gl/PCBgJ25qxznFSJ2AA"
            className="link-secondary block text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('common.libraryAddress')}
          </a>
        </div>
        <div className="flex flex-col">
          <h3 className="mb-2 font-bold">{t('genre.def')}</h3>
          {genresFooter.map(({id, genreName}) => (
            <Link
              key={id}
              className="link-secondary w-fit"
              to={{pathname: Path.BOOK_BROWSING, search: `${SEARCH_PARAMS.GENRE}=${id}`}}
            >
              <Trans t={t}>genre.{genreName}</Trans>
            </Link>
          ))}
        </div>
        <div>
          <h3 className="mb-2 font-bold">{t('common.contact')}</h3>
          <div className="flex items-center gap-4">
            <a
              href="https://fpt.workplace.com/groups/1082042972793515"
              className="link-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <WorkplaceIcon />
            </a>

            <a href="mailto:" className="link-secondary">
              <IconMail />
            </a>

            <a href="tel:+" className="link-secondary">
              <IconPhone />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
