import {FC, useEffect, useState} from 'react'
import {Auth} from '@/wrappers/auth'
import {getChatList} from '@/services/api'
import less from './index.less'
import {history} from 'umi'

const ChatHistory: FC = () => {
  const [chatList, setChatList] = useState([])

  useEffect(() => {
    getChatList().then((res) => {
      if (res) {
        setChatList(res)
      }
    })
  }, [])

  const handlerCardClick = (id: number) => {
    history.push(`/chat?chat_id=${id}`)
  }

  return (
    <div className={less.list}>{
      chatList?.length > 0 && chatList.map((item) => (
        <div className={less.chatCard} key={item.id} onClick={() => {
          handlerCardClick(item.id)
        }}>
          <div className={less.title}>
            {item.title}
          </div>
          <div className={less.content}>
            {item.created_at} <br/>
            {item.id}
          </div>
          <div className={less.footer}>
            <span onClick={() => {

            }}>...</span>
          </div>
        </div>
      ))
    }</div>
  )
}

export default Auth(ChatHistory)
