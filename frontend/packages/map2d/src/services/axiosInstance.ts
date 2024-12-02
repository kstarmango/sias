import Axios, { AxiosError, AxiosRequestConfig } from 'axios';

// const AXIOS_INSTANCE = Axios.create({
//   baseURL: import.meta.env.BASE_URL,
//   withCredentials: true,
// });

const AXIOS_INSTANCE = Axios.create({
    baseURL: '/proxy',
    withCredentials: true,
});

// AXIOS_INSTANCE.interceptors.request.use(
//   config => {
//     // queryString 에서 access_token 을 가져와서 헤더에 추가
//     const params = new URLSearchParams(window.location.search);
//     const accessToken = params.get('access_token');
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }

//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   },
// );

AXIOS_INSTANCE.interceptors.response.use(
  res => {
    console.log('axios.js response : ', res);
    return res;
  },
  error => {
    return Promise.reject(error);
  },
);

// add a second `options` argument here if you want to pass extra options to each generated query
export const axiosInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  const source = Axios.CancelToken.source();
  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    withCredentials: true,
    cancelToken: source.token,
  }).then(({ data }) => data);

  // @ts-ignore
  promise.cancel = () => {
    source.cancel('Query was cancelled');
  };

  return promise;
};

export type ErrorType<T> = AxiosError<T>;

export type BodyType<T> = T;
