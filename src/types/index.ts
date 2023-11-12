export type Primitives = string | number | boolean;

export enum SupportedLanguage {
  EN = 'en',
  VI = 'vi',
}

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
  description?: string;
  cover?: string;
  genre: Genre[];
  country: Country;
  ageTag: AgeTag[];
  episode: number;
  status: number;
  totalEpisode: number;
  price?: number;
  publishYear: string;
};

export type BooksResData = ResponseData<Book[]>;
