import {Navigate, useLocation} from 'umi'
import {getLocalStorage} from '@/utils/localCache'

export const Auth = (Component) => () => {
  const pathname = useLocation().pathname
  const isLogin = getLocalStorage('isLogin')

  if (isLogin) {
    if (pathname !== '/') {
      return <Component/>
    } else {
      return <Navigate to="/chat"/>
    }
  } else {
    if (pathname === '/') {
      return <Component/>
    } else {
      return <Navigate to="/"/>
    }
  }
}


