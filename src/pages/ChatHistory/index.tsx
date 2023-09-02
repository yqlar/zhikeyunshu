import { FC, useEffect, useState } from 'react'
import { Auth } from '@/wrappers/auth'
import { closeChat, getChatList } from '@/services/api'
import less from './index.less'
import { history } from 'umi'
import { message, Popconfirm } from 'antd'

const ChatHistory: FC = () => {
  const [chatList, setChatList] = useState([])

  const getData = () => {
    getChatList().then(res => {
      if (res) {
        setChatList(res)
      }
    })
  }
  useEffect(() => {
    getData()
  }, [])

  const handlerCardClick = (id: number) => {
    history.push(`/chat?chat_id=${id}`)
  }

  const delConfirm = d => {
    closeChat(d.id).then(res => {
      if (res) {
        message.success('关闭成功!')
      } else {
        message.error('关闭失败！')
      }
      getData()
    })
  }

  return (
    <div class={less.container}>
      <div className={less.list}>
        {chatList?.length > 0 &&
          chatList.map(item => (
            <div
              className={less.chatCard}
              key={item.id}
              onClick={() => {
                handlerCardClick(item.id)
              }}
            >
              <div className={less.title}>{item.title}</div>
              <div className={less.content}>
                {item.created_at} <br />
                {/*{item.id}*/}
              </div>
              <div
                className={less.footer}
                onClick={e => {
                  e.stopPropagation()
                }}
              >
                <Popconfirm
                  placement="top"
                  title={'是否关闭对话？'}
                  onConfirm={() => {
                    delConfirm(item)
                  }}
                  okText="Yes"
                  cancelText="No"
                >
                  <span>...</span>
                </Popconfirm>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Auth(ChatHistory)
