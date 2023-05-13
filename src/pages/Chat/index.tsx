import {FC, useEffect, useRef, useState} from 'react'
import less from './index.less'
import ChatInput from '@/pages/Chat/components/ChatInput'
import AIChatItem from '@/pages/Chat/components/ChatItem/AIChatItem'
import UserChatItem from '@/pages/Chat/components/ChatItem/UserChatItem'
import {ChatItem} from '@/interface/chat'
import RichEdit from '@/pages/Chat/components/RichEdit'
import {withAuth} from '@/hocs/withAuth'
import {createChat, getChatHistoryList} from '@/services/api'
import queryString from 'query-string'
import {history, useModel} from 'umi'

const Chat: FC = () => {
  const {templateContent} = useModel('chatModel')

  const [chatList, setChatList] = useState([])
  const [currentChatId, setCurrentChatId] = useState<number>(0)
  const [currentChat, setCurrentChat] = useState<ChatItem | null>(null)
  const scrollContainerRef = useRef(null)
  const scrollPlaceholder = useRef(null)
  const [loading, setLoading] = useState(false)
  const [historyLoading, setHistoryLoading] = useState(false)
  const [editVisible, setEditVisible] = useState(false)
  const [editChat, setEditChat] = useState<ChatItem | null>(null)
  const [chatPage, setChatPage] = useState(1)

  const sendData = async (d) => {
    let chatId = currentChatId
    if (chatId === 0) {
      try {
        const res = await createChat()
        if (res?.chat_id) {
          setCurrentChatId(res.chat_id)
          chatId = res.chat_id
          console.log('chatId:', chatId)
        }
      } catch (e) {
        console.log('createChat error', e)
      }
    }
    const o: ChatItem = {
      type: 'question',
      content: d,
    }

    if (currentChat) {
      setCurrentChat(null)
    }

    chatList.push(o)
    setChatList(chatList)

    setLoading(true)
    fetch('/api/v1/chat/send_text', {
      headers: {
        'Accept': 'text/event-stream',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: d,
        type: 'text',
      }),
      redirect: 'follow',
      method: 'POST',
    })
    // Retrieve its body as ReadableStream
    .then((response) => {
      const reader = response.body.getReader()
      const textDecoder = new TextDecoder()
      let text = ''
      pump()

      function pump() {
        reader.read().then(({value, done}) => {
          if (done) {
            setCurrentChat(null)
            chatList.push({
              type: 'answer',
              content: text,
            })
            setLoading(false)
            return
          }
          const data = textDecoder.decode(value)
          const arr = data.split('data:')

          arr.forEach((x) => {
            if (x) {
              const stream = x && JSON.parse(x)
              text = text + stream.data
              setCurrentChat({
                type: 'answer',
                content: text,
              })
            }
          })
          pump()
        })
      }
    })
  }

  const list = () => {
    return <>
      {
        [...chatList, currentChat].map((item, i) => {
          return item && (
            <div key={i}>
              {item.type === 'question' ?
                <UserChatItem data={item.content}/> :
                <AIChatItem
                  addToEditor={() => {
                    setEditChat(item)
                    setEditVisible(true)
                    const tt = setTimeout(() => {
                      setEditChat(null)
                      clearTimeout(tt)
                    }, 100)
                  }}
                  data={item.content}/>}
            </div>
          )
        })
      }
    </>
  }

  const getHistory = async (chat_id) => {
    const arr = chatList
    try {
      const res = await getChatHistoryList({
        chat_id,
        page: chatPage,
      })
      if (res?.length > 0) {
        res.forEach((x) => {
          arr.unshift({
            type: 'answer',
            content: x.response,
          })
          arr.unshift({
            type: 'question',
            content: x.request,
          })
        })
        setChatList(arr)
        setChatPage(chatPage + 1)
      }
      const clear = setTimeout(() => {
        setHistoryLoading(false)
        clearTimeout(clear)
      }, 100)
    } catch (e) {
      console.log('-- e: ', e)
    }
  }


  useEffect(() => {
    scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight
  }, [chatList.length])

  useEffect(() => {
    if (historyLoading) {
      getHistory(currentChatId)
    }
  }, [historyLoading])

  const resetChat = () => {
    setCurrentChatId(0)
    setChatList([])
    setChatPage(0)
  }
  useEffect(() => {
    const query = queryString.parse(history.location.search)
    console.log('-- query: ', query)
    const {chat_id} = query
    if (chat_id) {
      setCurrentChatId(Number(chat_id))
      getHistory(chat_id)
    } else {
      resetChat()
    }
    scrollContainerRef.current.addEventListener('scroll', async () => {
      if (scrollContainerRef.current.scrollTop <= 150) {
        if (!historyLoading && scrollContainerRef.current.scrollTop % 10 === 0) {
          setHistoryLoading(true)
        }
      }
    })
  }, [history.location])

  useEffect(() => {
    if (templateContent) {
      resetChat()
    }
  }, [templateContent])

  return (
    <div className={less.chatAndEdit}>
      <div className={less.chatContainer}>
        <div className={less.chatContent}>
          <div className={less.scrollContainer} ref={scrollContainerRef}>
            <div className={less.listHeaderPlaceholder}/>
            {list()}
            <div className={less.scrollPlaceholder} ref={scrollPlaceholder}></div>
          </div>
        </div>
        <div className={less.input}>
          <ChatInput loading={loading} send={sendData}/>
        </div>
      </div>

      <div className={[less.editContainer, editVisible ? '' : less.zooWidth].join(' ')}>
        <div className={less.hideButton} onClick={() => {
          setEditVisible(!editVisible)
        }}>
          {editVisible ? '收起' : '编辑器'}
        </div>
        <div className={less.container} style={{display: editVisible ? '' : 'none'}}>
          <RichEdit chat={editChat} editVisible={editVisible} currentChatId={currentChatId}/>
        </div>
      </div>
    </div>
  )
}

export default withAuth(Chat)
