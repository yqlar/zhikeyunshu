import '@wangeditor/editor/dist/css/style.css' // 引入 css
import React, {FC, useEffect, useRef, useState} from 'react'
import { Editor, Toolbar} from '@wangeditor/editor-for-react'
import { Boot, IDomEditor, IEditorConfig, IToolbarConfig} from '@wangeditor/editor'
import less from './index.less'
import {ChatItem} from '@/interface/chat'
import markdownModule from '@wangeditor/plugin-md'
import {getDocDetail, saveDocDetail} from '@/services/api'
import {Input, message} from 'antd'
import lodash_throttle from 'lodash/throttle'

interface Props {
  chat?: ChatItem | null
  editVisible?: boolean
  currentChatId?: number
  currentChatTitle?: string
}

const RichEdit: FC<Props> = (props) => {
  const [editor, setEditor] = useState<IDomEditor | null>(null)
  const [text, setText] = useState('')
  const [title, setTitle] = useState('')
  const [html, setHtml] = useState<string>('')
  const saveDoc = useRef(lodash_throttle((id, data, t) => {
    saveDocDetail({
      chat_id: id || 0,
      content: data,
      title: t,
    }).then(() => {
      // message.success('文档自动保存')
    })
  }, 5000))

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {
    excludeKeys: ['group-image', 'group-video', 'emotion', 'todo', 'insertLink']
  }

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: '请输入内容...',
  }

  const editorChange = (editor: any) => {
    setText(editor.getText())
    setHtml(editor.getHtml())
  }

  useEffect(() => {
    if (props?.chat) {
      const h = editor?.getText() === '' ? '' : html
      setHtml(h + `<p>${props.chat.content}</p>`)
    }

    if (props.editVisible) {
      const curToolbarConfig = editor.getConfig()
      console.log( curToolbarConfig )
    }

  }, [props?.chat])

  Boot.registerModule(markdownModule)

  useEffect(() => {
    if (html && props.editVisible) {
      saveDoc.current(props.currentChatId, html, title || (new Date()).toString())
    }
  }, [html, title])

  useEffect(() => {
    if (props.currentChatTitle && !title) {
      setTitle(props.currentChatTitle)
    }
  }, [props.currentChatTitle])

  useEffect(() => {
    if (props.currentChatId) {
      getDocDetail({
        chat_id: Number(props.currentChatId),
      }).then((res) => {
        if (res) {
          setHtml(res?.content)
          setTitle(res.title)
        }
      })
    }
  }, [props.currentChatId])

  return (
    <div className={less.richEdit}>
      <Input bordered={false} className={less.title} placeholder="标题" value={title} onChange={(e) => {
        setTitle(e.target.value)
      }}/>
      <Toolbar
        editor={editor}
        defaultConfig={toolbarConfig}
        mode="default"
        style={{borderBottom: '1px solid #ccc', maxHeight: '121px'}}
      />
      <Editor
        defaultConfig={editorConfig}
        value={html}
        onCreated={setEditor}
        onChange={editorChange}
        mode="default"
        style={{height: '100%',overflowY: 'hidden', paddingBottom: '32px', flexShrink: '1'}}
      />
      <div className={less.textCount}><span>{text.length}个字符</span></div>
    </div>
  )
}

export default RichEdit
