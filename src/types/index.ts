export enum SupportedLanguage {
  EN = 'en',
  VI = 'vi',
}

export type UserData = {
  email: string;
  name?: string;
};

export type Book = {
  id: string;
  name: string;
};
