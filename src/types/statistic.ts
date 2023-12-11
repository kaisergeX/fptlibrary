import type {Book, ResponseData} from '.';

export type TopPage = {
  current: {
    reportDate?: string | null;
    year: number;
    month: number;
    userExpired: number;
    userActive: number;
    bookCreated: number;
    userBanned: number;
    borrowCount: number;
    availableBook: number;
    inHandBook: number;
    bookedBook: number;
    offBook: number;
  };
  mostPopular: Book[];
  report: [];
};

export type TopPageResData = ResponseData<TopPage>;
