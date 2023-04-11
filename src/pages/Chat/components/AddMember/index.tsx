import {FC} from 'react'
import less from './index.less'
import vip from '@/assets/img/vip-crown-fill.svg'
const AddMember: FC = () => {
  return (
    <div className={less.addMember}>
      <img src={vip} alt=""/>
      <div>加入会员，无限畅聊</div>
    </div>
  )
}

export default AddMember
