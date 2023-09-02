import {FC} from 'react'
import logo from '@/assets/img/logo.svg'
import less from './index.less'

const Logo: FC = () => {
    return <a className={less.logo} href='/'>
        <img src={logo} alt="logo"/>
        <span>智客Ai助手</span>
    </a>
}

export default Logo
