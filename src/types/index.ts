export enum SupportedLanguage {
  EN = 'en',
  VI = 'vi',
}

export type UserInfo = {
  email: string;
  name?: string;
};

export type Book = {
  id: string;
  name: string;
  author?: string;
  summary?: string;
  cover?: string;
  genre: string;
  genreName?: string;
};
