import { FC } from 'react'
import less from './index.less'
import userHead from '@/assets/img/user-head.png'
interface Props {
  data: string
}
const UserChatItem: FC<Props> = props => {
  return (
    <div className={less.chatItem}>
      <div className={less.head}>
        <img src={userHead} alt="" />
      </div>
      <div className={less.content}>{props.data}</div>
    </div>
  )
}

export default UserChatItem
