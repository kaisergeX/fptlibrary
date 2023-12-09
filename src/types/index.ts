import type {ReactNode} from 'react';
import type {BookStatus} from '~/constants';

export type Primitives = string | number | boolean;
export type ObjectAny = Record<PropertyKey, unknown>;
export type ObjectPrimitives = Record<PropertyKey, Primitives>;
export type ExtractValues<T> = T[keyof T];

export type PromiseAllSettledReturnType<ResultType, ErrorType> = Promise<{
  fulfilled: PromiseFulfilledResult<ResultType>['value'][];
  rejected: ErrorType[];
}>;

export type BreadcrumbsOptions = {
  data: {title: string; url?: string}[];
  separator?: ReactNode;
};

export type DataGridFilter = {
  numPages: number;
  pageSize: number;
};

export type UserInfo = {
  id?: number;
  email: string;
  name?: string;
  avatar?: string;
};

export type RequestParams<T = Primitives> = Record<string, T>;

export type ResponseData<T> = {
  success: boolean;
  body: T;
  error: Record<string, unknown>;
};

export type ListResponseData<T> = ResponseData<T> & {
  body: T[];

  count: number;
  pageSize: number;
  numPages: number;
};

export type Country = {
  id: string;
  name: string;
};

export type CountryResData = ResponseData<Country[]>;

export type Genre = {
  id: number;
  genreName: string;
};

export type GenresResData = ResponseData<Genre[]>;

export type AgeTag = {
  id: number;
  ageTagName: string;
};

export type AgeTagResData = ResponseData<AgeTag[]>;

export type Book = {
  id: string;
  title: string;
  author: string;
  summary?: string;
  cover: string;
  genre: Genre[];
  country: Country;
  ageTag: AgeTag;
  episode?: number;
  totalEpisode?: number;
  price?: number;
  status: BookStatus;
  publishYear?: string;
  createAt: string;
  updateAt: string;
};

export type BooksResData = ResponseData<Book[]>;

export type BookFilterFormValues = {
  title?: string;
  genre?: string[];
  ageTag?: string[];
  country?: Country['id'][];
  status?: BookStatus;
  publishYear?: Date | null;
};

export type BookFormValues = Omit<
  Book,
  'id' | 'genre' | 'country' | 'ageTag' | 'cover' | 'publishYear' | 'createAt' | 'updateAt'
> & {
  cover: string | File;
  genre: string[];
  country: Country['id'];
  ageTag: string;
  publishYear?: Date | null;
};

export type BookRequestData = Omit<BookFormValues, 'cover' | 'genre' | 'publishYear'> & {
  cover?: File;
  genre: string;
  publishYear?: number;
};
