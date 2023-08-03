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


export const isWeChat = () => {
  //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
  var ua = window.navigator.userAgent.toLowerCase();
  //通过正则表达式匹配ua中是否含有MicroMessenger字符串
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true;
  } else {
    return false;
  }
}
