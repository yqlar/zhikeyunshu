import {FC} from 'react'
import less from './index.less'
import {userLogout} from '@/services/api'
import {setLocalStorage} from '@/utils/localCache'
import {history} from 'umi'
import {Popconfirm} from 'antd'
import userHead from '@/assets/img/user-head.png'
import {isLogin} from '@/utils'

const UserInfo: FC = () => {
  return (
    <div className={less.userInfo}>

      <Popconfirm
        title="您是否要退出登录？"
        onConfirm={() => {
          userLogout().then((res) => {
            if (res?.code === '200') {
              setLocalStorage('isLogin', false)
              history.push('/')
              document.cookie = ''
            }
          })
        }}
        okText="是"
        cancelText="否"
      >
        <div className={less.head}>
          {isLogin() && <img src={userHead} alt=""/> }
        </div>
      </Popconfirm>


      <div className={less.info}>
        {/*<div>my name</div>*/}
        {/*<div>开通会员畅聊，享三大专属权益</div>*/}
      </div>
    </div>
  )
}

export default UserInfo
