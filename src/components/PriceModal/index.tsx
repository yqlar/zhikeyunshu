import {FC} from 'react'
import less from './index.less'
import {Button, Card, Modal} from 'antd'
import {useModel} from 'umi'
import userHeadImg from '@/assets/img/user-head.png'
import {CheckOutlined} from '@ant-design/icons'
import VipQrCode from '@/assets/img/vip-qr-code.png'
const PriceModal: FC = () => {
  const {priceModalVisible, closePriceModal} = useModel('userModel')

  return (
    <Modal centered={true} width={400} open={priceModalVisible} footer={null} maskClosable={true} onCancel={(() => {
      closePriceModal()
    })}>
      <div className={less.title}>请打开手机微信扫码支付</div>
      <div className={less.subTitle}>开通会员，享受Web+手机双端无限畅聊</div>
      <div className="text-center pb-[30px]">
        <img className="w-[180px]" src={VipQrCode} alt=""/>
      </div>
    </Modal>
  )
}

export default PriceModal
