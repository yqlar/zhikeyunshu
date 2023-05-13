import type { RequestConfig } from 'umi';

console.log()
export const request: RequestConfig = {
  // timeout: 10000,
  errorConfig: {
    errorHandler(){
    },
    errorThrower(){
    },
  },
  requestInterceptors: [
    (url, options) => {
    let u = 'https://mini.vcode.me' + url
    if (process.env.NODE_ENV === 'development') {
      u = '/api' + url
    }

      // if (options.eventSource) {
      //   console.log(111)
      //   options.adapter = (config) => {
      //     console.log('config.url', config.url)
      //     console.log(config)
      //     return new Promise((resolve) => {
      //       const source = new EventSource(config.url, {
      //         withCredentials: true,
      //         headers: config.headers,
      //       })
      //       source.onmessage = function (event) {
      //         resolve({
      //           data: event.data,
      //           status: 200,
      //         })
      //       }
      //     })
      //   }
      // }

      return { url: u, options }
    },
  ],
  responseInterceptors: [],

};
