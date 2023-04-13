import {FC, useEffect, useState} from 'react'
import less from './index.less'
import logo from '@/assets/img/logo.svg'
import copy from '@/assets/img/copy.svg'
import move from '@/assets/img/move.svg'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import {message} from 'antd'
import ChatLoading from '@/pages/Chat/components/ChatLoading'

interface Props {
  data: string
  addToEditor: () => void
}

const AIChatItem: FC<Props> = (props) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(props.data === '')
  }, [props.data])

  return (
    <div className={less.chatItem}>
      <div className={less.head}>
        <img src={logo} alt=""/>
      </div>
      <div className={[less.content, less.bc].join(' ')}>
        {
          loading ? <ChatLoading/> : <>
            <div className={less.text}>
              {props.data}
            </div>
            <div className={less.control}>
              <CopyToClipboard
                text={props.data}
                onCopy={() => {
                  message.open({
                    type: 'success',
                    content: '复制成功',
                    duration: 2,
                  })
                }}
              >
                <div>
                  <img src={copy} alt=""/>
                  <span>复制</span>
                </div>
              </CopyToClipboard>
              <div onClick={props.addToEditor}>
                <img src={move} alt=""/>
                <span>添加到编辑器</span>
              </div>
            </div>
          </>
        }
      </div>
    </div>
  )
}

export default AIChatItem
