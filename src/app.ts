import type {RequestConfig} from 'umi'

export const request: RequestConfig = {
  // timeout: 10000,
  errorConfig: {
    errorHandler(){
    },
    errorThrower(){
    },
  },
  requestInterceptors: [(
    (url, options) => {
      let u = 'http://mini.vcode.me' + url
      if (process.env.NODE_ENV === 'development' || window.location.hostname.includes('vercel.app')) {
        u = '/api' + url
      }

      return {url: u, options}
    }
  )],
  responseInterceptors: [],
};
