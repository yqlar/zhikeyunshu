import {FC, useState} from 'react'
import less from './index.less'
import Logo from '@/components/logo'
import {Menu, MenuProps} from 'antd'
import ImgChat from '@/assets/img/chat.svg'
import ImgTemplate from '@/assets/img/template.svg'
import AddMember from '@/pages/Chat/components/AddMember'
import ChatInput from '@/pages/Chat/components/ChatInput'
import AIChatItem from '@/pages/Chat/components/ChatItem/AIChatItem'
import UserChatItem from '@/pages/Chat/components/ChatItem/UserChatItem'
import {ChatItem} from '@/interface/chat-item'

const Chat: FC = () => {
  const [chatList, setChatList] = useState<ChatItem[]>([])
  const [currentChat, setCurrentChat] = useState<ChatItem | null>(null);
  const [currentMenu, setCurrentMenu] = useState('chat');
  const items: MenuProps['items'] = [
    {
      label: '对话',
      key: 'chat',
      icon: (<img className={less.menuIcon} src={ImgChat} alt=""/>),
    },
    {
      label: '模版中心',
      key: 'templates',
      icon: (<img className={less.menuIcon} src={ImgTemplate} alt=""/>),
    },
  ]

  const menuAction = (d) => {
    console.log('-- d: ', d)
    if (d.key !== 'templates') {
      setCurrentMenu(d.key)
    } else {

    }
  }

  const sendData = (d) => {
    const o: ChatItem = {
      type: 'question',
      content: d,
    }

    if (currentChat) {
      chatList.push(currentChat)
      setCurrentChat(null)
    }

    chatList.push(o)
    setChatList(chatList)
    getAiData(d)
  }

  const getAiData = (d) => {
    const t = new Date() + d
    setTextStep(t, '')
  }

  const setTextStep = (t, content) => {
    const l = content.length || 0
    const d = content + t.slice(l, l + 5)
    const tt = setTimeout(() => {
      setCurrentChat({
          type: 'answer',
          content: d,
        })

      if (d.length < t.length) {
        setTextStep(t, d)
      }
      console.log('-- 1: ', 1)
      clearTimeout(tt)
    }, 100)
  }

  const list = () => {
    return <>
      {
        [...chatList, currentChat].map((item, i) => {
          return item && (
            <div key={i}>
              {item.type === 'question' ? <UserChatItem data={item.content}/> : <AIChatItem data={item.content}/>}
            </div>
          )
        })
      }
    </>
  }
  return (
    <div className={less.page}>
      <div className={less.left}>
        <div className={less.logo}>
          <Logo/>
        </div>
        <Menu selectedKeys={[currentMenu]} style={{marginTop: '40px'}} items={items} onClick={menuAction}/>
      </div>
      <div className={less.right}>
        <div className={less.head}>
          <AddMember/>
          <div className={less.userHead}></div>
        </div>
        <div className={less.chatAndEdit}>
          <div className={less.chatContainer}>
            <div className={less.chatContent}>
              <div className={less.scrollContainer}>
                {list()}
              </div>
            </div>
            <div className={less.input}>
              <ChatInput send={sendData}/>
            </div>
          </div>
          <div className={less.editContainer}></div>
        </div>
      </div>
    </div>
  )
}

export default Chat
