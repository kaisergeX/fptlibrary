import {showNotification} from '@mantine/notifications';
import axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from 'axios';
import {API_BASE_URL} from './system';
import {findNotiConfig} from '~/util';
import {ErrorCode} from '~/types/notification';

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

  const notiConfig = findNotiConfig(ErrorCode.ERR); // an unknown error noti.
  if (error === null || !axios.isAxiosError(error)) {
    showNotification(notiConfig);
    return Promise.reject(error);
  }

  const errRes = error.response;
  const errStatus = errRes?.status;
  if (errStatus === 401) {
    showNotification(findNotiConfig(ErrorCode.ERR_UNAUTHORIZED));
    return Promise.reject(error);
  }

  // Show a noti with server error msg
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const serverErrMessage = errRes?.data?.error?.message;
  if (serverErrMessage && typeof serverErrMessage === 'string') {
    notiConfig.message = serverErrMessage;
  }

  showNotification(notiConfig);
  return Promise.reject(error);
};

axiosInstance.interceptors.request.use(handleBeforeRequest, (error) => Promise.reject(error));
axiosInstance.interceptors.response.use((response) => response, handleResponseError);

export default axiosInstance;
