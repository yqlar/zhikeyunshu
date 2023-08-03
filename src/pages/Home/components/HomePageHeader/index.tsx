import {FC, useEffect, useState} from 'react'
import less from './index.less'
import Logo from '@/components/logo'
import type {MenuProps} from 'antd'
import {Button, Menu} from 'antd'
import {history, useModel} from 'umi'
import {isLogin} from "@/utils";

const HomePageHeader: FC = () => {
    const {openLoginModal} = useModel('userModel')
    const [selectedMenu, setSelectedMenu] = useState('')

    const items: MenuProps['items'] = [
        {
            label: '会员计划',
            key: 'vip',
            url: '/vip',
        },

        // {
        //   label: 'Chat',
    //   key: 'chat',
    //   url: '/chat',
    // },
    // {
    //   label: 'Use Cases',
    //   key: 'UseCases',
    // },
    // {
    //   label: 'Resources',
    //   key: 'Resources',
    // },
    // {
    //   label: 'Pricing',
    //   key: 'Pricing',
    // },
  ]

  const menuAction = (data) => {
      const item = items.find(x => x.key === data.key)
      setSelectedMenu(item.key)
      history.push(item.url)
  }

  useEffect(() => {
      if (history.location.pathname.includes('vip')) {
          setSelectedMenu('vip')
      }
  }, [])

  return (
    <div className={less.header}>
        <Logo/>
        <div className={less.menu}>

            <Menu mode="horizontal" items={items} onClick={menuAction} selectedKeys={[selectedMenu]}/>
            <Button type="primary" shape="round" size="large"
                    onClick={() => {
                        isLogin() ? history.push('/chat') : openLoginModal()
                    }}>开启免费智能问答</Button>
        </div>
    </div>
  )
}

export default HomePageHeader
