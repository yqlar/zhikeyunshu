import {FC} from 'react'
import less from './index.less'

const UserInfo: FC = () => {
  return (
    <div className={less.userInfo}>
      <div className={less.head}></div>
      <div className={less.info}>
        <div>my name</div>
        <div>开通会员畅聊，享三大专属权益</div>
      </div>
    </div>
  )
}

export default UserInfo
