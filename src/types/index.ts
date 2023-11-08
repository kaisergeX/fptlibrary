export enum SupportedLanguage {
  EN = 'en',
  VI = 'vi',
}

export type UserInfo = {
  email: string;
  name?: string;
};

export type ResponseData<T> = {data: T};

export type Genre = {
  id: number;
  name: string;
};

export type GenresResData = ResponseData<Genre[]>;

export type Book = {
  id: string;
  name: string;
  author?: string;
  summary?: string;
  cover?: string;
  genres: Genre['id'][];
};

export type BooksResData = ResponseData<Book[]>;
