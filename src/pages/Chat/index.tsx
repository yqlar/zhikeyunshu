import {FC, useEffect, useRef, useState} from 'react'
import less from './index.less'
import Logo from '@/components/logo'
import {Menu, MenuProps} from 'antd'
import ImgChat from '@/assets/img/chat.svg'
import ImgTemplate from '@/assets/img/template.svg'
import AddMember from '@/pages/Chat/components/AddMember'
import ChatInput from '@/pages/Chat/components/ChatInput'
import AIChatItem from '@/pages/Chat/components/ChatItem/AIChatItem'
import UserChatItem from '@/pages/Chat/components/ChatItem/UserChatItem'
import {ChatItem} from '@/interface/chat'
import UserInfo from '@/pages/Chat/components/UserInfo'
import TemplatesModal from '@/pages/Chat/components/TemplatesModal'
import { useModel } from 'umi'

const Chat: FC = () => {
  const [chatList, setChatList] = useState<ChatItem[]>([])
  const [currentChat, setCurrentChat] = useState<ChatItem | null>(null)
  const [currentMenu, setCurrentMenu] = useState('chat')
  const scrollContainerRef = useRef(null)
  const scrollPlaceholder = useRef(null)
  const [loading, setLoading] = useState(false)
  const {openTemplateModal} = useModel('chatModel')

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
    if (d.key !== 'templates') {
      setCurrentMenu(d.key)
    } else {
      openTemplateModal()
    }
  }

  useEffect(() => {
    scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight
  }, [chatList.length])

  const sendData = (d) => {
    const o: ChatItem = {
      type: 'question',
      content: d,
    }
    if (currentChat) {
      setCurrentChat(null)
    }

    chatList.push(o)
    setChatList(chatList)

    getAiData(d)
  }

  const getAiData = (d) => {
    const t = new Date() + d
    setLoading(true)
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
      } else {
        setCurrentChat(null)
        chatList.push({
          type: 'answer',
          content: d,
        })
        setLoading(false)
      }
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
        <div className={less.userHead}>
          <UserInfo/>
        </div>
      </div>
      <div className={less.right}>
        <div className={less.head}>
          <AddMember/>
        </div>
        <div className={less.chatAndEdit}>
          <div className={less.chatContainer}>
            <div className={less.chatContent}>
              <div className={less.scrollContainer} ref={scrollContainerRef}>
                {list()}
                <div className={less.scrollPlaceholder} ref={scrollPlaceholder}></div>
              </div>
            </div>
            <div className={less.input}>
              <ChatInput loading={loading} send={sendData}/>
            </div>
          </div>
          <div className={less.editContainer}></div>
        </div>
      </div>


      <TemplatesModal/>
    </div>
  )
}

export default Chat
