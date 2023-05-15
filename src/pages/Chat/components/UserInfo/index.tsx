import {FC} from 'react'
import less from './index.less'
import {userLogout} from '@/services/api'
import {setLocalStorage} from '@/utils/localCache'
import {history} from 'umi'

const UserInfo: FC = () => {
  return (
    <div className={less.userInfo}>
      <div className={less.head} onClick={() => {
        userLogout().then((res) => {
          console.log('-- res: ', res)
            if (res?.code === '200') {
              setLocalStorage('isLogin', false)
              history.push('/')
              document.cookie = ''
            }
        })
      }}></div>
      <div className={less.info}>
        <div>my name</div>
        <div>开通会员畅聊，享三大专属权益</div>
      </div>
    </div>
  )
}

export default UserInfo
