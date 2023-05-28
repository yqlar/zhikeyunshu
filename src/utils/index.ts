import {getLocalStorage, setLocalStorage} from '@/utils/localCache'
import {history} from 'umi'

export const isLogin = () => {
  const isLogin = getLocalStorage('isLogin')
  return isLogin
}

export const logout = () => {
  setLocalStorage('isLogin', false)
  history.push('/')
  document.cookie = ''
}

export const getHost = () => {
  var protocol = window.location.protocol
  var hostname = window.location.hostname
  if (process.env.NODE_ENV === 'development') {
    return 'http://mini.vcode.me'
  } else {
    return protocol + '//' + hostname
  }
}
