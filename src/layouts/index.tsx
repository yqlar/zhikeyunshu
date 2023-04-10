import {FC} from 'react'
import {ConnectProps} from 'react-redux'
import less from '@/layouts/index.less'
import {Outlet} from 'umi'

type Props = ConnectProps

const BasicLayout: FC = (props: Props) => {
  return <div className={less.layout}>
    <Outlet/>
  </div>

}

export default BasicLayout
