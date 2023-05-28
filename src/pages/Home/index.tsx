import {Button, Layout, message, Space} from 'antd'
import {Content, Footer, Header} from 'antd/es/layout/layout'
import cssVariables from '@/utils/cssVariables'
import less from './index.less'
import HomePageHeader from '@/pages/Home/components/HomePageHeader'
import TemplateEntry from '@/pages/Home/components/TemplateEntry'
import partner from '@/assets/img/partner.png'
import LoginModal from '@/components/LoginModal'
import {Auth} from '@/wrappers/auth'
import {useEffect, useState} from 'react'
import * as api from '@/services/api'
import {history, useModel} from 'umi'
import {setLocalStorage} from '@/utils/localCache'

const HomePage: React.FC = () => {
  const {openLoginModal, closeLoginModal} = useModel('userModel')
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null)

  const headerStyle: React.CSSProperties = {
    color: cssVariables.fontColorMain,
    height: 100,
    backgroundColor: cssVariables.backgroundColorMain,
  }
  const contentStyle: React.CSSProperties = {
    minHeight: 1000,
    backgroundColor: cssVariables.backgroundColorMain,
    textAlign: 'center',
  }
  const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: cssVariables.backgroundColorMain,
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

  useEffect(() => {
    getWeiChatQRCode()
  }, [])

  return (
    <Space direction="vertical" style={{width: '100%'}} size={[0, 48]}>
      <LoginModal qrCodeUrl={qrCodeUrl}/>

      {/*<Layout>*/}
      {/*  <Header style={headerStyle}>*/}
      {/*    <HomePageHeader/>*/}
      {/*  </Header>*/}
      {/*  <Content style={contentStyle}>*/}
      {/*    <div className={less.sectionTitle}>*/}
      {/*      <div>*/}
      {/*        Whatever you want to ask,*/}
      {/*      </div>*/}
      {/*      <div>*/}
      {/*        our chat has the answers*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*    <p className={less.t}>Get your free account today</p>*/}
      {/*    <Button size="large" type="primary" shape="round">Sign up with email</Button>*/}
      {/*    <div className={less.line}></div>*/}
      {/*    <div className={less.templateList}>*/}
      {/*      <TemplateEntry />*/}
      {/*      <TemplateEntry />*/}
      {/*      <TemplateEntry />*/}
      {/*    </div>*/}

      {/*    <div className={less.video}>*/}
      {/*      <video src=''></video>*/}
      {/*    </div>*/}
      {/*    <div className={less.t2}>Experience the full power of an AI*/}
      {/*      content generator that delivers*/}
      {/*      premium results in seconds.</div>*/}
      {/*    <div className={less.count}>6,000,000+</div>*/}
      {/*    <div className={less.t2}>professionals & teams choose Copy.ai.</div>*/}
      {/*    <img className={less.partner} src={partner} alt=""/>*/}
      {/*    <div className={less.userList}></div>*/}
      {/*    <div className={less.sectionTitle}>*/}
      {/*      <div>Copy.ai helps</div>*/}
      {/*      <div>business owners</div>*/}
      {/*    </div>*/}
      {/*    <div className={less.t2}>*/}
      {/*      Get better results in a fraction of the time.*/}
      {/*      Finally, a writing tool you’ll actually use.*/}
      {/*    </div>*/}
      {/*  </Content>*/}
      {/*  <Footer style={footerStyle}>Footer</Footer>*/}

      {/*</Layout>*/}
    </Space>
  )
}

export default Auth(HomePage)
