import {FC} from 'react'
import less from './index.less'

const ChatLoading: FC = () => {
  return (
    <div className={less.loading}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default ChatLoading
