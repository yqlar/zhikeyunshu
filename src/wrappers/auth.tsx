import {Navigate} from 'umi'
import {getLocalStorage} from '@/utils/localCache'

export const Auth = (Component) => () => {
  const isLogin = getLocalStorage('isLogin')
  console.log('-- isLogin: ', isLogin)
  if (isLogin) {
    console.log('-- Component.name: ', Component.name)
    if (Component.name !== 'HomePage') {
      console.log('-- 11: ', )
      return <Component/>
    } else {
      console.log('-- 2: ', )
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


