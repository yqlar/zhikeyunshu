import { FC, useEffect, useRef, useState } from 'react'
import less from './index.less'
import ChatInput from '@/pages/Chat/components/ChatInput'
import AIChatItem from '@/pages/Chat/components/ChatItem/AIChatItem'
import UserChatItem from '@/pages/Chat/components/ChatItem/UserChatItem'
import { ChatItem } from '@/interface/chat'
import RichEdit from '@/pages/Chat/components/RichEdit'
import * as api from '@/services/api'
import queryString from 'query-string'
import { history, useModel } from 'umi'
import { Auth } from '@/wrappers/auth'
import { getHost } from '@/utils'
import Guide from '@/pages/Chat/components/guide'
import { ErrorCode } from '@/enum/ErrorCode'
import NoVipTipsModal from '@/components/noVipTipsModal'

const Chat: FC = () => {
  const { templateContent, showContinueButton, gptModel, setGptModel } = useModel('chatModel')
  const { openNoVipTipsModal } = useModel('userModel')
  const [chatList, setChatList] = useState([])
  const [currentChatId, setCurrentChatId] = useState<number>(0)
  const [currentChat, setCurrentChat] = useState<ChatItem | null>(null)
  const [currentChatTitle, setCurrentChatTitle] = useState<string>('')
  const scrollContainerRef = useRef(null)
  const scrollPlaceholder = useRef(null)
  const [loading, setLoading] = useState(false)
  const [historyLoading, setHistoryLoading] = useState(false)
  const [editVisible, setEditVisible] = useState(false)
  const [editChat, setEditChat] = useState<ChatItem | null>(null)
  const [inputValue, setInputValue] = useState<string>('')
  const [chatPage, setChatPage] = useState(1)
  const [isOnline, setIsOnline] = useState(false)
  const query = queryString.parse(history.location.search)
  const { chat_id } = query

  const createChatTitle = async chatId => {
    try {
      const res = await api.genTitle({ chat_id: chatId })
      if (res) {
        setCurrentChatTitle(res.title)
      }
    } catch (e) {
      console.log('-- createChatTitle error: ', e)
    }
  }

  const sendData = async d => {
    let chatId = currentChatId
    if (chatId === 0) {
      try {
        const res = await api.createChat()
        if (res?.chat_id) {
          setCurrentChatId(res.chat_id)
          chatId = res.chat_id
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

    const url = '/v1/chat/send_text'
    let u = getHost() + url
    if (process.env.NODE_ENV === 'development' || window.location.hostname.includes('vercel.app')) {
      u = '/api' + url
    }

    fetch(u, {
      headers: {
        Accept: 'text/event-stream',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: d,
        type: 'text',
        online: isOnline,
        model: gptModel,
      }),
      redirect: 'follow',
      method: 'POST',
    })
      // Retrieve its body as ReadableStream
      .then(response => {
        const reader = response.body.getReader()
        const textDecoder = new TextDecoder()
        let text = ''
        pump()

        function pump() {
          reader.read().then(({ value, done }) => {
            if (done) {
              if (chatList.length === 1) {
                // 当第一个问题提问完成后，请求生成 title
                createChatTitle(chatId)
              }
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
            console.log('-- data: ', arr)

            arr.forEach(x => {
              if (x) {
                const stream = x && JSON.parse(x)
                if (stream.code === ErrorCode.NO_VIP) {
                  openNoVipTipsModal()
                  return null
                }
                text = text + stream.data
                setCurrentChat({
                  type: 'answer',
                  content: text,
                })
                if (stream.finish_reason === 'length') {
                  // showContinueButton()
                  // setContinueButtonVisible(true)
                }
              }
            })
            pump()
          })
        }
      })
  }

  const list = () => {
    return (
      <>
        {[...chatList, currentChat].map((item, i) => {
          return (
            item && (
              <div key={i}>
                {item.type === 'question' ? (
                  <UserChatItem data={item.content} />
                ) : (
                  <AIChatItem
                    addToEditor={() => {
                      setEditChat(item)
                      setEditVisible(true)
                      const tt = setTimeout(() => {
                        setEditChat(null)
                        clearTimeout(tt)
                      }, 100)
                    }}
                    data={item.content}
                  />
                )}
              </div>
            )
          )
        })}
      </>
    )
  }

  const getHistory = async chat_id => {
    const arr = chatList
    try {
      const res = await api.getChatHistoryList({
        chat_id,
        page: chatPage,
      })
      if (res?.length > 0) {
        res.forEach(x => {
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
        console.log('3333', res[0].model)
        setGptModel(res[0].model)
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
    setTimeout(() => {
      if (scrollPlaceholder?.current.scrollIntoView) {
        scrollPlaceholder.current.scrollIntoView({
          behavior: 'smooth',
        })
      } else {
        scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight
      }
    }, 0)
  }, [chatList.length])

  useEffect(() => {
    if (chat_id && historyLoading) {
      getHistory(chat_id)
    }
  }, [historyLoading])

  const resetChat = () => {
    setCurrentChatId(0)
    setChatList([])
    setChatPage(0)
    setGptModel('gpt3')
  }

  // 继续请求对话
  const continueChat = () => {
    const res = api.continueChat({
      chat_id: currentChatId,
    })
  }

  useEffect(() => {
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
            <div className={less.listHeaderPlaceholder} />
            {chatList.length === 0 ? <Guide updateInput={setInputValue} /> : list()}
            <a className={less.scrollPlaceholder} ref={scrollPlaceholder}></a>
          </div>
        </div>
        <div className={less.input}>
          <ChatInput
            switchChange={setIsOnline}
            loading={loading}
            send={sendData}
            continueChat={continueChat}
            inputValue={inputValue}
          />
        </div>
      </div>

      <div className={[less.editContainer, editVisible ? '' : less.zooWidth].join(' ')}>
        <div
          className={less.hideButton}
          onClick={() => {
            setEditVisible(!editVisible)
          }}
        >
          {editVisible ? '收起' : '编辑器'}
        </div>
        <div className={less.container} style={{ display: editVisible ? '' : 'none' }}>
          <RichEdit
            currentChatTitle={currentChatTitle}
            chat={editChat}
            editVisible={editVisible}
            currentChatId={currentChatId}
          />
        </div>
      </div>
      <NoVipTipsModal />
    </div>
  )
}

export default Auth(Chat)
