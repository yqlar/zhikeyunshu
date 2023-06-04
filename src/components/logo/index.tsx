import {FC} from 'react'
import logo from '@/assets/img/logo.svg'
import less from './index.less'

const Logo: FC = () => {
  return <a className={less.logo} href='/'>
    <img src={logo} alt="logo"/>
    <span>it2.ai</span>
  </a>
}

export default Logo
