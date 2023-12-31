import {showNotification} from '@mantine/notifications';
import axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from 'axios';
import {API_BASE_URL} from './system';
import {findNotiConfig} from '~/util';
import {ErrorCode} from '~/types/notification';
import {usePersistStore} from '~/store';
import type {ResponseData} from '~/types';

const httpConfig: AxiosRequestConfig = {
  withCredentials: true,
  baseURL: API_BASE_URL,
  timeout: 10000,
};
const axiosInstance = axios.create(httpConfig);

// Additional logic before request is sent
const handleBeforeRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  /**
   * We should NOT add `Authorization` into headers of every request.
   * Use `http` or `httpNonAuth` helpers instead.
   *
   * If needed, consider the risk carefully,
   * then uncomment the logic below to add `Authorization` header to every axios requests.
   */
  // const accessToken = usePersistStore.getState().accessToken;
  // if (config.headers && accessToken) {
  //   config.headers.Authorization = `Bearer ${accessToken}`;
  // }

  return config;
};

const handleResponseError = (error: Error | AxiosError | null) => {
  if (!navigator.onLine) {
    showNotification(findNotiConfig(ErrorCode.ERR_NETWORK));
    return Promise.reject(error);
  }

  let notiConfig = findNotiConfig(ErrorCode.ERR); // an unknown error noti.
  if (error === null || !axios.isAxiosError(error)) {
    showNotification(notiConfig);
    return Promise.reject(error);
  }

  const errRes = error.response;
  const errStatus = errRes?.status;
  const errData = errRes?.data as ResponseData<null> | undefined;

  switch (errStatus) {
    case 401: {
      showNotification(findNotiConfig(ErrorCode.ERR_UNAUTHORIZED));
      usePersistStore.getState().resetAuthStore();
      // Outlet will handle redirecting if needed

      return Promise.reject(error);
    }

    case 400: {
      // Try to show translated server err msg (mapping by server's error code)
      const serverErrCode = errData?.error?.code;

      // BOOK_ALREADY_BORROWED error will be manually handled by the related mutation.
      if (serverErrCode === ErrorCode.BOOK_ALREADY_BORROWED) {
        return Promise.reject(error);
      }

      notiConfig = findNotiConfig(
        typeof serverErrCode === 'string' ? (serverErrCode as ErrorCode) : ErrorCode.ERR_BADREQUEST,
      );
      break;
    }

    case 403: {
      if (errData?.error?.code === ErrorCode.BANNED) {
        showNotification(findNotiConfig(ErrorCode.BANNED));
        usePersistStore.getState().resetAuthStore();
        // Outlet will handle redirecting if needed
        return Promise.reject(error);
      }
      break;
    }

    default:
      break;
  }

  showNotification(notiConfig);
  return Promise.reject(error);
};

axiosInstance.interceptors.request.use(handleBeforeRequest, (error) => Promise.reject(error));
axiosInstance.interceptors.response.use((response) => response, handleResponseError);

export default axiosInstance;
