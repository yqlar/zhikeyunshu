import {FC, useEffect, useState} from 'react'
import less from './index.less'
import Logo from '@/components/logo'
import type {MenuProps} from 'antd'
import {Button, Menu, message} from 'antd'
import {history, useModel} from 'umi'
import * as api from '@/services/api'
import LoginModal from '@/components/LoginModal'
import {setLocalStorage} from '@/utils/localCache'

const HomePageHeader: FC = () => {
  const {openLoginModal, closeLoginModal} = useModel('userModel')
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null)

  const items: MenuProps['items'] = [
    {
      label: 'Chat',
      key: 'chat',
      url: '/chat',
    },
    {
      label: 'Use Cases',
      key: 'UseCases',
    },
    {
      label: 'Resources',
      key: 'Resources',
    },
    {
      label: 'Pricing',
      key: 'Pricing',
    },
  ]

  useEffect(() => {
      document.cookie
  }, [])

  const menuAction = (data) => {
    const item = items.find(x => x.key === data.key)
    history.push(item.url)
  }

  const codeCallback = async (session_id: string) => {
    const d = await api.scanCallback({session_id})

    if (d.code === '200') {
      setLocalStorage('isLogin', true)
      closeLoginModal()
      message.success('登录成功')
      history.push('/chat')
    } else {
      const ttt = setTimeout(() => {
        codeCallback(session_id)
        clearTimeout(ttt)
      }, 1000)
    }

  }

  const getWeiChatQRCode = async () => {
    const d = await api.getWeChatQRCode()
    if (d?.url) {
      setQrCodeUrl(d.url)
      codeCallback(d.session_id)
    }
    openLoginModal()
  }


  return (
    <div className={less.header}>
      <Logo/>
      <div className={less.menu}>
        <Menu mode="horizontal" items={items} onClick={menuAction}/>
        <Button type="primary" shape="round" size="large" onClick={getWeiChatQRCode}>Get Started It's Free</Button>
      </div>
      <LoginModal qrCodeUrl={qrCodeUrl}/>

    </div>
  )
}

export default HomePageHeader
