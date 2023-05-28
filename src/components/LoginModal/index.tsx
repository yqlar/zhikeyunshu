import {FC} from 'react'
import less from './index.less'
import {useModel} from 'umi'
import {Modal} from 'antd'

interface Props {
  qrCodeUrl: string | null
}
const LoginModal: FC = (props: Props) => {
  const {loginModalVisible, closeLoginModal} = useModel('userModel')

  return <Modal centered={true}
                width={400}
                open={loginModalVisible}
                footer={null}
                maskClosable={false}
                keyboard={false}
                close
                closable={false}
                onCancel={(() => {
                  closeLoginModal()
                })}>
    <div className={less.title}>
      微信扫码一键登录
    </div>
    <div className={less.subtitle}>
      未注册的微信号将自动创建账号
    </div>
    <div className={less.code}>
      {props.qrCodeUrl ? <img src={props.qrCodeUrl} alt=""/> : '刷新'}

    </div>
    <div className={less.footer}>
      您登录即同意用户服务协议、隐私政策 和 授权许可协议，如您成为稿定设计会员，成为会员即视为同意会员服务协议
    </div>
  </Modal>
}

export default LoginModal
