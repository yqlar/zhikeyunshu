import {FC} from 'react'
import less from './index.less'
import vipIcon from '@/assets/img/vip-crown-fill.svg'
import {useModel} from 'umi'

const AddMember: FC = () => {
  const {openPriceModal} = useModel('userModel')

  return (
    <div className={less.addMember} onClick={() => {
      openPriceModal()
    }}>
      <img src={vipIcon} alt=""/>
      <div>加入会员，无限畅聊</div>
    </div>
  )
}

export default AddMember