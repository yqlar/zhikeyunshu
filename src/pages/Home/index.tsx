import {Button, Layout, Space, message} from 'antd'
import {Content, Footer, Header} from 'antd/es/layout/layout'
import cssVariables from '@/utils/cssVariables'
import less from './index.less'
import HomePageHeader from '@/pages/Home/components/HomePageHeader'
import partner from '@/assets/img/partner.png'
import hookImg from '@/assets/img/hook.svg'
import {Auth} from '@/wrappers/auth'
import LoginModal from '@/components/LoginModal'
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
  //
  // useEffect(() => {
  //   getWeiChatQRCode()
  // }, [])

  return (
    <Space direction="vertical" style={{width: '100%'}} size={[0, 48]}>
      <LoginModal qrCodeUrl={qrCodeUrl}/>

      <Layout>
        <Header style={headerStyle}>
          <HomePageHeader getWeiChatQRCode={getWeiChatQRCode}/>
        </Header>
        <Content style={contentStyle}>
          <div className={less.sectionTitle}>
            <div>无论是怎样的难题</div>
            <div>我们都可以帮您轻松解答</div>
          </div>
          <p className={less.t}>立刻免费注册进行智能问答吧</p>
          <Button size="large" type="primary" shape="round" onClick={getWeiChatQRCode}>免费注册 / 登录</Button>
          <div className={less.line}></div>
          {/*<div className={less.templateList}>*/}
          {/*  <TemplateEntry />*/}
          {/*  <TemplateEntry />*/}
          {/*  <TemplateEntry />*/}
          {/*</div>*/}

          {/*<div className={less.video}>*/}
          {/*  <video src=''></video>*/}
          {/*</div>*/}
          <div className={less.t2}>体验最新AI智能问答效率工具，
            几秒钟就能得到最佳解决方案。
          </div>
          <div className={less.count}>6,000,000+</div>
          <div className={less.t2}>更多专业团队和创作者选择使用 智客Ai助手</div>
          <div className="flex justify-center">
            {/*<img className={less.partner} src={partner} alt=""/>*/}
          </div>
          <div className={less.userList}></div>

          {/*<div className={less.line}></div>*/}
          <div className={less.sectionTitle}>
            <div>智客Ai助手 帮助</div>
            <div>企业伙伴</div>
          </div>
          <div className={less.t2}>在极短的时间内获得更好的解决方案，
            这是一款您能够实际应用到工作中的智能工具
          </div>
          <div className="mt-16 mb-10 flex justify-around">
            <div>
              <div className="text-[22px] mb-[14px] font-extrabold">更快的写出更好的内容</div>
              <div className="text-[16px] w-[280px]">利用人工智能在几分钟内撰写您的内容和文案。</div>
            </div>
            <div>
              <div className="text-[22px] mb-[14px] font-extrabold">和空白的页面说“再见”</div>
              <div className="text-[16px] w-[280px]">只需点击几下即可生成适用于所有广告活动的高转化文案。</div>
            </div>
            <div>
              <div className="text-[22px] mb-[14px] font-extrabold">90+ 工具和热门模版</div>
              <div className="text-[16px] w-[280px]">通过利用90多个工具和模板来简化内容制作。</div>
            </div>
          </div>
          <div className={less.line}></div>
          <div className="text-[68px] font-extrabold mb-6">准备好拥抱Ai时代了吗？</div>
          <div className="text-[22px] mb-4">写作速度提高10倍，吸引您的受众，再也不必为空白的页面苦恼。</div>
          <Button size="large" type="primary" shape="round" onClick={getWeiChatQRCode}>立即开始免费使用</Button>
          <div className="flex justify-around mt-10">
            <div className="flex justify-start items-center">
              <img className="w-[56px] h-[56px] mr-[15px]" src={hookImg} alt=""/>
              <div className="text-[16px]">不需要信用卡</div>
            </div>
            <div className="flex justify-start items-center">
              <img className="w-[56px] h-[56px] mr-[15px]" src={hookImg} alt=""/>
              <div className="text-[16px]">每个月提供2000字节免费使用</div>
            </div>
            <div className="flex justify-start items-center">
              <img className="w-[56px] h-[56px] mr-[15px]" src={hookImg} alt=""/>
              <div className="text-[16px]">90+ 工具和热门模版</div>
            </div>
          </div>
        </Content>
        <Footer style={footerStyle}>Footer</Footer>

      </Layout>
    </Space>
  )
}

export default Auth(HomePage)
