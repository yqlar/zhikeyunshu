import {FC, useEffect, useState} from 'react'
import {Button, Input, Menu, message, Modal} from 'antd'
import less from './index.less'
import {history, useModel} from 'umi'
import * as api from '@/services/api'
import plusSvg from '@/assets/img/plus.svg'
import {delCustomTemplate} from '@/services/api'

const TemplatesModal: FC = () => {
  const {templateModalVisible, closeTemplateModal, changeTemplateContent} = useModel('chatModel')
  const [templateList, setTemplateList] = useState([])
  const [currentTemplateList, setCurrentTemplateList] = useState([])
  const [currentTemplate, setCurrentTemplate] = useState(null)
  const [firstListKey, setFirstListKey] = useState('')
  const [secondListKey, setSecondListKey] = useState('')
  const [isResetTemplate, setIsResetTemplate] = useState(true)
  const [isEditTemplate, setIsEditTemplate] = useState(false)
  const [createVisible, setCreateVisible] = useState(true)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const {TextArea} = Input

  const formatMenuData = (list) => {
    return list?.map(x => {
      return {
        key: x.id,
        label: x.title || x.name,
        ...x,
      }
    }) || []
  }

  const getTemplate = async () => {
    try {
      const res = await api.getTemplateList()
      if (res?.length > 0) {
        const d = formatMenuData(res)
        setFirstListKey(String(d[0]?.key))
        setTemplateList(d)
        firstMenuAction(d[0])
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (templateModalVisible) {
      getTemplate()
    }
  }, [templateModalVisible])

  const firstMenuAction = (firstMenuItem) => {
    const {details} = firstMenuItem
    const list = formatMenuData(details || [])
    list.forEach((x) => {
      x.type_key = firstMenuItem.type_key
    })
    setSecondListKey(String(list[0]?.key))
    setCurrentTemplateList(list)
    setCurrentTemplate(list[0])
  }

  const formatTemplateContent = (content) => {
    var reg = /\[([^\]]+)\]/g
    var arr = content.match(reg)
    let d = content
    arr?.forEach((x) => {
      d = d.replaceAll(x, `<span>${x}</span>`)
    })

    return {__html: d}
  }

  // 保存模版
  const saveTemplate = async () => {
    let res = null
    console.log('-- currentTemplate: ', currentTemplate)
    if (currentTemplate) {
      res = await api.updateCustomTemplate({
        detail_id: currentTemplate.id,
        title,
        content,
      })
    } else {
      res = await api.createTemplate({
        title,
        content,
      })
    }

    if (res) {
      message.success('保存成功！')

      setIsEditTemplate(false)
      setTitle('')
      setContent('')
      getTemplate()
    }
  }

  const delCustomTemplate = async () => {
    const res = await api.delCustomTemplate(currentTemplate.id)
    if (res) {
      message.success('删除成功！')
      getTemplate()
    }
  }

  return (
    <Modal className={less.modal} width={1100} bodyStyle={{height: '70vh'}} open={templateModalVisible} footer={null}
           maskClosable={true}
           destroyOnClose={true}
           onCancel={(() => {
             closeTemplateModal()
           })}>
      <div className={less.modalContent}>
        <div className={less.title}>
          <span>模版中心</span>
          <div className={less.input}>
            {/*<Input size="large" placeholder="Try Blog Email" prefix={<SearchOutlined width={24}/>}/>*/}
          </div>
        </div>
        <div className={less.templateList}>
          <div className={less.left}>
            <Menu className={less.menu} items={templateList} onSelect={(d) => {
              setFirstListKey(String(d.key))
              firstMenuAction(d.item.props)
              setIsEditTemplate(false)
              setCreateVisible(d.item.props?.type_key === 'custom')
            }} selectedKeys={[firstListKey]}/>
          </div>
          <div className={less.left}>
            {createVisible &&
              <div>
                {
                  isEditTemplate &&
                  <Input value={title} onChange={(e) => {
                    setTitle(e.target.value)
                  }} size="large" placeholder="模版标题"/>
                }
                {!isEditTemplate && <div className="mb-4 text-center">
                  <Button
                    className="flex items-center"
                    block
                    onClick={() => {
                      setIsEditTemplate(true)
                      setCurrentTemplate(null)
                      setSecondListKey('')
                    }} type="text" size="large">
                    <img className="mr-2" src={plusSvg} alt="加号"/><span>新建自定义模版</span></Button>
                </div>}
              </div>
            }
            {
              currentTemplateList?.length > 0 &&
              <Menu
                className={less.menu}
                items={currentTemplateList}
                onSelect={(d) => {
                  setSecondListKey(String(d.key))
                  setCurrentTemplate({
                    ...d.item.props,
                  })
                  setIsEditTemplate(false)
                }}
                selectedKeys={[secondListKey]}
              />
            }
          </div>
          <div className={less.right}>
            {isEditTemplate &&
              <div className="relative h-full">
                <TextArea
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value)
                  }}
                  bordered={false}
                  style={{height: 120, marginBottom: 24}}
                  placeholder="输入模版内容，例如：请用[角色]的身份，创作一个小故事"
                  autoSize={{minRows: 20, maxRows: 100}}
                />
                <div className="absolute bottom-0 w-full bg-white pt-4 text-right">
                  <Button size="large" type="primary" onClick={() => {
                    saveTemplate()
                  }}>保存模版</Button>
                </div>
              </div>
            }
            {
              ((currentTemplate && !isResetTemplate) || !isEditTemplate) && (<>
                <div className={less.preview}>
                  预览
                </div>
                <div className={less.templateContent}
                     dangerouslySetInnerHTML={formatTemplateContent(currentTemplate?.content || '')}/>
                <div className={less.control}>
                  {(currentTemplate?.type_key === 'custom') &&

                    <>

                      <Button className="mr-4" type="default" size="large" onClick={() => {
                        delCustomTemplate()
                      }}>删除模版</Button>

                      <Button className="mr-4" type="default" size="large" onClick={() => {
                        setTitle(currentTemplate.title)
                        setContent(currentTemplate.content)
                        setIsEditTemplate(true)
                      }}>修改模版</Button>
                    </>
                  }

                  <Button type="primary" size="large" onClick={() => {
                    history.push('/chat')
                    changeTemplateContent(currentTemplate?.content)
                    closeTemplateModal()
                  }}>使用模版</Button>
                </div>
              </>)
            }
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default TemplatesModal
