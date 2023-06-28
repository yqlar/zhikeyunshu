import {FC, useEffect} from 'react'
import less from './index.less'
import Logo from '@/components/logo'
import type {MenuProps} from 'antd'
import {Button, Menu} from 'antd'
import {history} from 'umi'

const HomePageHeader: FC = (props: any) => {

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

  return (
    <div className={less.header}>
      <Logo/>
      <div className={less.menu}>

        <Menu mode="horizontal" items={[]} onClick={menuAction}/>
        <Button type="primary" shape="round" size="large" onClick={props.getWeiChatQRCode}>开启免费智能问答</Button>
      </div>
    </div>
  )
}

export default HomePageHeader
