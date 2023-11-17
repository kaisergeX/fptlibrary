import type {ReactNode} from 'react';
import type {BookStatus} from '~/constants';

export type Primitives = string | number | boolean;
export type ObjectAny = Record<PropertyKey, unknown>;
export type ExtractValues<T> = T[keyof T];

export type BreadcrumbsOptions = {
  data: {title: string; url?: string}[];
  separator?: ReactNode;
};

export type DataGridFilter = {
  numPages: number;
  pageSize: number;
};

export type UserInfo = {
  email: string;
  name?: string;
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
};

export type BooksResData = ResponseData<Book[]>;

export type BookFormValues = Omit<
  Book,
  'id' | 'genre' | 'country' | 'ageTag' | 'cover' | 'publishYear'
> & {
  cover: File | null;
  genre: string[];
  country: Country['id'];
  ageTag: number | null;
  publishYear?: Date | null;
};

export type BookRequestData = Omit<BookFormValues, 'cover' | 'genre'> & {
  cover: File;
  genre: string;
};
