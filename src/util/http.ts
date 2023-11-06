import type {AxiosRequestConfig} from 'axios';
import axiosInstance from '~/config/axiosInstance';
import {usePersistStore} from '~/store';

const httpConfig: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const getAuthConfig = (config?: AxiosRequestConfig) => {
  const accessToken = usePersistStore.getState().accessToken;
  const customHttpConfig = {...httpConfig, ...config};
  if (customHttpConfig.headers && accessToken) {
    /**
     * @todo upgrade axios version after this issue https://github.com/axios/axios/issues/5416 fixed.
     */
    // (customHttpConfig.headers as AxiosHeaders).set('Authorization', `Bearer ${accessToken}`);
    customHttpConfig.headers.Authorization = `Bearer ${accessToken}`;
  }

  // Add paramsSerializer to adapt with complex params structure, even directly into axiosInstance, if needed.
  // const queryParams = config?.params
  // if(queryParams){
  //   customHttpConfig.paramsSerializer = ...
  // }

  return customHttpConfig;
};

const apiGet = <T>(url: string, config?: AxiosRequestConfig) =>
  axiosInstance.get<T>(url, getAuthConfig(config)).then(({data}) => data);

const apiPost = <T>(url: string, payload?: unknown, config?: AxiosRequestConfig) =>
  axiosInstance.post<T>(url, payload, getAuthConfig(config)).then(({data}) => data);

const apiGetNonAuth = async <T>(url: string, config?: AxiosRequestConfig) =>
  axiosInstance.get<T>(url, {...httpConfig, ...config}).then(({data}) => data);

const apiPostNonAuth = <T>(url: string, payload?: unknown, config?: AxiosRequestConfig) =>
  axiosInstance.post<T>(url, payload, {...httpConfig, ...config}).then(({data}) => data);

export const http = {
  get: apiGet,
  post: apiPost,
};

export const httpNonAuth = {
  get: apiGetNonAuth,
  post: apiPostNonAuth,
};
