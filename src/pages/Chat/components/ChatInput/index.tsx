import {FC, useEffect, useState} from 'react'
import {Button, Input, Switch} from 'antd'
import less from './index.less'
import promptIcon from '@/assets/img/prompt.svg'
import sendIcon from '@/assets/img/send.svg'
import {history, useModel} from 'umi'

interface Props {
    send(t: string): void

    inputValue: string

    continueChat(): void

    loading: boolean

    switchChange(val: boolean): void
}

const {TextArea} = Input
const ChatInput: FC<Props> = (props) => {
    const [chatContent, setChatContent] = useState('')
    const [disable, setDisable] = useState(true)
    const {openTemplateModal, templateContent, changeTemplateContent, continueButtonVisible} = useModel('chatModel')
    const [isOnline, setIsOnline] = useState(false)
    useEffect(() => {
        if (templateContent) {
            setChatContent(templateContent)
            changeTemplateContent('')
            setDisable(false)
            history.push(`/chat`)
        }
    }, [templateContent])

    useEffect(() => {
        if (props.inputValue) {
            setChatContent(props.inputValue)
            setDisable(false)
        }
    }, [props.inputValue])

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
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            sendData()
            e.cancelBubble = true
            e.preventDefault()
            e.stopPropagation()
        }
    }

    const onChange = (val) => {
        console.log(val)
        props.switchChange(val)
    }

    return (
        <div>
            {continueButtonVisible && <div className="flex justify-center h-10 w-full mb-4">
                {/*<Button className="mr-8" shape="round" type="default" onClick={() => {*/}

                {/*}}>重新生成内容</Button>*/}
                <Button shape="round" type="default" onClick={() => {
                    props.continueChat()
                }}>继续生成剩余内容</Button>
            </div>}
            <div className={less.chat}>
                <TextArea
                    bordered={false}
                    value={chatContent}
                    onChange={inputChange}
                    placeholder="点击输入文字内容，按 Ctrl + Entry 发送内容"
                    autoSize={{minRows: 2, maxRows: 10}}
                    onKeyDown={keyUpAction}
                />
                <div className={less.chatControl}>
                    <div className="flex gap-4">
                        <Button onClick={() => {
                            openTemplateModal()
                        }}>
                            <img src={promptIcon} alt=""/>
                            <span>模版中心</span>
                        </Button>
                        <div className="flex gap-[4px] items-center">
                            <span className="text-[#476E96]">网络访问</span>
                            <Switch onChange={onChange}/>
                        </div>
                    </div>
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
        </div>

    )
}

export default ChatInput
