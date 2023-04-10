import {FC} from 'react'
import less from './index.less'
import Logo from '@/components/logo'
import type {MenuProps} from 'antd'
import {Button, Menu} from 'antd'

const HomePageHeader: FC = () => {
  const items: MenuProps['items'] = [
    {
      label: 'Chat',
      key: 'Chat',
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

  return (
    <div className={less.header}>
      <Logo/>
      <div className={less.menu}>
        <Menu mode="horizontal" items={items}/>
        <Button type="primary" shape="round" size="large">Get Started It's Free</Button>
      </div>
    </div>
  )
}

export default HomePageHeader
