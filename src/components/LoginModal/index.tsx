import {FC, useEffect, useRef, useState} from 'react'
import less from './index.less'
import {history, useModel} from 'umi'
import {message, Modal, Spin} from 'antd'
import * as api from "@/services/api";
import {setLocalStorage} from "@/utils/localCache";
import {isLogin} from "@/utils";

const LoginModal: FC = () => {
  const {loginModalVisible, closeLoginModal} = useModel('userModel')
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const clearTime = useRef<any>()

  const jump = () => {
    const {location} = history
    const {pathname} = location
    if (!pathname.includes('/vip')) {
      history.push('/chat')
    }
  }
  const codeCallback = async (session_id: string) => {
    const d = await api.scanCallback({session_id})
    if (d.code === '200') {
      setLocalStorage('isLogin', true)
      closeLoginModal()
      message.success('登录成功')
      jump()
    } else {
      clearTime.current = setTimeout(() => {
        codeCallback(session_id)
        clearTimeout(clearTime.current)
      }, 1000)
    }
  }

  const getWeiChatQRCode = async () => {
    setLoading(true)
    if (isLogin()) {
      jump()
      return null
    }
    const d = await api.getWeChatQRCode()
    if (d?.url) {
      setQrCodeUrl(d.url)
      codeCallback(d.session_id)
    }
    setLoading(false)
  }

  const cancel = () => {
    if (qrCodeUrl) {
      closeLoginModal()
    }
  }

  useEffect(() => {
    if (loginModalVisible) {
      getWeiChatQRCode()
    } else {
      setQrCodeUrl('')
    }
  }, [loginModalVisible])

  return <Modal centered={true}
                width={400}
                open={loginModalVisible}
                footer={null}
                maskClosable={true}
                close
                onCancel={cancel}
                afterClose={() => {
                  clearTimeout(clearTime.current)
                }}
  >
    <div className={less.title}>
      微信扫码一键登录
    </div>
    <div className={less.subtitle}>
      未注册的微信号将自动创建账号
    </div>
    <div className={less.code}>
      <Spin spinning={!qrCodeUrl}>
        {qrCodeUrl ? <img src={qrCodeUrl} alt=""/> : ''}
      </Spin>
    </div>
    <div className={less.footer}>
      您登录即同意用户服务协议、隐私政策 和 授权许可协议，如您成为稿定设计会员，成为会员即视为同意会员服务协议
    </div>
  </Modal>
}

export default LoginModal
