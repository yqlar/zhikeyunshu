import {Navigate} from 'umi'
import {getLocalStorage} from '@/utils/localCache'

export const Auth = (Component) => () => {
  const isLogin = getLocalStorage('isLogin')
  if (isLogin) {
    if (Component.name !== 'HomePage') {
      return <Component/>
    } else {
      return <Navigate to="/chat"/>
    }
  } else {
    if (Component.name === 'HomePage') {
      return <Component/>
    } else {
      return <Navigate to="/"/>
    }
  }
}

