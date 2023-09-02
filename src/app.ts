import type {RequestConfig, RequestOptionsInit} from 'umi'
import {getHost, logout} from '@/utils'

const demoResponseInterceptors = (response: Response, options: RequestOptionsInit) => {
    if (response?.data?.code === '700') {
        logout()
    }
    return response
}


export const request: RequestConfig = {
    // timeout: 10000,
    errorConfig: {
        errorHandler() {
        },
        errorThrower() {
        },
    },
    requestInterceptors: [(
        (url, options) => {

            let u = getHost() + url
            if (process.env.NODE_ENV === 'development' || window.location.hostname.includes('vercel.app')) {
                u = '/api' + url
            }

            return {url: u, options}
        }
    )],
    responseInterceptors: [demoResponseInterceptors],
};
