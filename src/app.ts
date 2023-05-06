import type { RequestConfig } from 'umi';

console.log()
export const request: RequestConfig = {
  timeout: 10000,
  errorConfig: {
    errorHandler(){
    },
    errorThrower(){
    }
  },
  requestInterceptors: [
    (url, options) => {
    let u = 'https://mini.vcode.me' + url
    if (process.env.NODE_ENV === 'development') {
      u = '/api' + url
    }
      return { url: u, options }
    },
  ],
  responseInterceptors: [],
};
