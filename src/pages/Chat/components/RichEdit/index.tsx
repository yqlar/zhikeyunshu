import '@wangeditor/editor/dist/css/style.css' // 引入 css
import React, {FC, useEffect, useState} from 'react'
import {Editor, Toolbar} from '@wangeditor/editor-for-react'
import {Boot, IDomEditor, IEditorConfig, IToolbarConfig} from '@wangeditor/editor'
import less from './index.less'
import {ChatItem} from '@/interface/chat'
import markdownModule from '@wangeditor/plugin-md'
import {saveDocDetail} from '@/services/api'


interface Props {
  chat?: ChatItem | null
  editVisible?: boolean
  currentChatId?: number
}

const RichEdit: FC<Props> = (props) => {
  const [editor, setEditor] = useState<IDomEditor | null>(null)
  const [text, setText] = useState('')
  const [html, setHtml] = useState<string>('')


  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {}

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
  }, [props?.chat])

  useEffect(() => {
    if (props.editVisible && html !== '') {
      saveDocDetail({
        chat_id: props.currentChatId || 0,
        content: html,
      })
    }
  }, [html, props.editVisible])

  Boot.registerModule(markdownModule)

  return (
    <div className={less.richEdit}>
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
