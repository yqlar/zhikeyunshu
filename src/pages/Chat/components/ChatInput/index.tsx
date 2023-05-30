import {FC, useEffect, useState} from 'react'
import {Button, Input} from 'antd'
import less from './index.less'
import promptIcon from '@/assets/img/prompt.svg'
import sendIcon from '@/assets/img/send.svg'
import {useModel, history} from 'umi'

interface Props {
  send(t: string): void

  loading: boolean
}

const {TextArea} = Input
const ChatInput: FC<Props> = (props) => {
  const [chatContent, setChatContent] = useState('')
  const [disable, setDisable] = useState(true)
  const {openTemplateModal, templateContent, changeTemplateContent} = useModel('chatModel')

  useEffect(() => {
    if (templateContent) {
      setChatContent(templateContent)
      changeTemplateContent('')
      setDisable(false)
      history.push(`/chat`)
    }
  }, [templateContent])

  useEffect(() => {
    handelDisable(chatContent)
  }, [props.loading])

  const inputChange = (e) => {
    handelDisable(e.target.value)
    setChatContent(e.target.value)
  }

  const handelDisable = (d) => {
    setDisable(d === '' || props.loading)
  }
  const sendData = () => {
    if (!disable) {
      props.send(chatContent)
      setChatContent('')
      setDisable(true)
    }
  }

  const keyUpAction = (e) => {
    if (e.key === 'Enter') {
      sendData()
      e.cancelBubble = true
      e.preventDefault()
      e.stopPropagation()
    }
  }

  return (
    <div>
      <div className={less.chat}>
        <TextArea
          bordered={false}
          value={chatContent}
          onChange={inputChange}
          placeholder="点击输入文字内容"
          autoSize={{minRows: 2, maxRows: 10}}
          onKeyDown={keyUpAction}
        />
        <div className={less.chatControl}>
          <Button onClick={() => {
            openTemplateModal()
          }}>
            <img src={promptIcon} alt=""/>
            <span>模版中心</span>
          </Button>
          <Button
            disabled={disable}
            className={[less.send, disable ? less.disable : '']}
            type="primary"
            shape="circle"
            size="large"
            onClick={sendData}
          >
            <img src={sendIcon} alt=""/>
          </Button>
        </div>
      </div>
      <div className={less.tips}>
        聊天目前处于测试阶段，遇到问题请给我们反馈
      </div>
    </div>

  )
}

export default ChatInput
