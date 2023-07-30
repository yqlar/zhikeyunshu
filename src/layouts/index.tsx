import {FC, useEffect, useState} from 'react'
import less from '@/layouts/index.less'
import {history, Outlet, useLocation, useModel} from 'umi'
import Logo from '@/components/logo'
import UserInfo from '@/pages/Chat/components/UserInfo'
import TemplatesModal from '@/pages/Chat/components/TemplatesModal'
import ImgChat from '@/assets/img/chat.svg'
import ImgTemplate from '@/assets/img/template.svg'
import ImgHistory from '@/assets/img/history.svg'
import {Menu, MenuProps} from 'antd'
import AddMember from '@/pages/Chat/components/AddMember'
import HomePageLayout from "@/layouts/homePageLayout";
import device from 'current-device'

const BasicLayout: FC = () => {
  const [currentMenu, setCurrentMenu] = useState('chat')
  const {openTemplateModal} = useModel('chatModel')
  const location = useLocation()
  const MentItems: MenuProps['items'] = [
    {
      label: '对话',
      key: 'chat',
      path: '/chat',
      icon: (<img className={less.menuIcon} src={ImgChat} alt=""/>),
    },
    {
      label: '模版中心',
      key: 'templates',
      icon: (<img className={less.menuIcon} src={ImgTemplate} alt=""/>),
    },
    {
      label: '历史对话',
      key: 'history',
      path: '/chat-history',
      icon: (<img className={less.menuIcon} src={ImgHistory} alt=""/>),
    },
  ]

  const menuAction = (d) => {
    if (d.key !== 'templates') {
      history.push(d.item.props.path)
    } else {
      openTemplateModal()
    }
  }

  const initMenuSelect = () => {
    const d = MentItems.find(x => x.path === history.location.pathname)
    if (d?.key) {
      setCurrentMenu(d?.key)
    }
  }

  useEffect(() => {
    initMenuSelect()
    // 监听路由变化，改变 menu 的高亮
    history.listen(() => {
      initMenuSelect()
    })
  }, [])


  const list = ['/', '/vip', '/protocol']

  if (device.mobile() && location.pathname.includes('/vip')) {
    return <Outlet/>
  }

  if (list.includes(location.pathname)) {
    return <HomePageLayout>
      <Outlet/>
    </HomePageLayout>
  }

  return <div className={less.layout}>
    <div className={less.page}>
      <div className={less.left}>
        <div className={less.logo}>
          <Logo/>
        </div>
        <Menu selectedKeys={[currentMenu]} style={{marginTop: '40px'}} items={MentItems} onClick={menuAction}/>
        <div className={less.userHead}>
          <UserInfo/>
        </div>
      </div>
      <div className={less.right}>
        <div className={less.head}>
          {/*<div></div>*/}
          <AddMember/>
        </div>
        <Outlet/>
      </div>
      <TemplatesModal/>
    </div>
  </div>
}

export default BasicLayout
