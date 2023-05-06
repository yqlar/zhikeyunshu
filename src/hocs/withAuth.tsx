import {Navigate} from 'umi'
import {getLocalStorage} from '@/utils/localCache'

export const withAuth = (Component) => () => {
  const isLogin = getLocalStorage('isLogin')
  if (isLogin) {
    if (Component.name === 'Chat') {
      return <Component/>
    } else {
      return <Navigate to="/Chat"/>
    }
  } else {
    if (Component.name === 'HomePage') {
      return <Component/>
    } else {
      return <Navigate to="/"/>
    }
  }
}


