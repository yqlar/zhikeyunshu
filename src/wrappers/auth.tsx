import {Navigate, useLocation} from 'umi'
import {getLocalStorage} from '@/utils/localCache'
import {isLogin} from '@/utils'

export const Auth = (Component) => () => {
    const pathname = useLocation().pathname

    if (isLogin()) {
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


