import type {ReactNode} from 'react';
import type {BookStatus, ImportStatus} from '~/constants';
import type {Role} from './store';

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
  page: number;
  pageSize: number;
};

export type UserInfo = {
  id?: number;
  role: Role;
  email: string;
  name?: string;
  avatar?: string;
  expireDate?: string | null;
  active?: boolean;
};

export type RequestParams<T = Primitives> = Record<string, T>;

export type ResponseData<T> = {
  success: boolean;
  body: T;
  error?: {code: string; message: string; timestamp: string};
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
  price?: string;
  status: BookStatus;
  publishYear?: string;
  qrCode: string;

  createAt: string;
  updateAt: string;
};

export type BooksResData = ResponseData<Book[]>;

export type BookFilterFormValues = {
  genre?: string[];
  ageTag?: string[];
  country?: Country['id'][];
  status?: BookStatus;
  publishYear?: Date | null;
};

export type BookFormValues = {
  title: string;
  author: string;
  summary?: string;
  cover: string | File;

  genre: string[];
  country: Country['id'];
  ageTag: string;

  publishYear?: Date | null;
  episode?: number;
  totalEpisode?: number;
  price: number;

  status: BookStatus;
};

export type BookRequestData = Omit<BookFormValues, 'cover' | 'genre' | 'publishYear'> & {
  cover?: File;
  genre: string;
  publishYear?: number;
};

export type BookImportRequest = {
  file: File;
};

export type BookImportResData = ResponseData<{
  id: number;
  file: string;
  status: ImportStatus;
  message: string | null;
}>;

export type BookImportDetailResData = ResponseData<{
  id: number;
  file: string;
  status: ImportStatus;
  message: string | null;
  imported: number;
  error: number;
  errorFile: null;
}>;

export type UserManagament = {
  id: number;
  name: string;
  email: string;
  avatar?: string | null;
  role: Role;
  expireDate?: string | null;
  isBanned: boolean;
  active: boolean;
};

export type UserManagementList = ResponseData<UserManagament[]>;

export type ExtendExpiredDate = {
  expireDate: string;
};

export type Orders = {
  id: string;
  user: Omit<UserManagament, 'role' | 'expireDate' | 'active'>;
  book: Book;
  lastStatus: BookStatus;
  borrowedAt: string;
  returnedAt: string;
};

export type OrdersListResData = ResponseData<Orders[]>;
