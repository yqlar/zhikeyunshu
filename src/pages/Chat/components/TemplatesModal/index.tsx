import {FC, useEffect, useState} from 'react'
import {Button, Menu, Modal} from 'antd'
import less from './index.less'
import {useModel, history} from 'umi'
import * as api from '@/services/api'

const TemplatesModal: FC = () => {
  const {templateModalVisible, closeTemplateModal, changeTemplateContent} = useModel('chatModel')
  const [templateList, setTemplateList] = useState([])
  const [currentTemplateList, setCurrentTemplateList] = useState([])
  const [currentTemplate, setCurrentTemplate] = useState(null)
  const [firstListKey, setFirstListKey] = useState('')
  const [secondListKey, setSecondListKey] = useState('')

  const formatMenuData = (list) => {
    return list.map(x => {
      return {
        key: x.id,
        label: x.title || x.name,
        ...x,
      }
    })
  }

  const getTemplate = async () => {
    try {
      const res = await api.getTemplateList()
      if (res?.length > 0) {
        const d = formatMenuData(res)
        setFirstListKey(String(d[0].key))
        setTemplateList(d)
        firstMenuAction(d[0].details)
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

  const firstMenuAction = (details) => {
    const list = formatMenuData(details)
    setSecondListKey(String(list[0].key))
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

  return (
    <Modal className={less.modal} width={1100} bodyStyle={{height: '70vh'}} open={templateModalVisible} footer={null}
           maskClosable={true}
           destroyOnClose={true}
           onCancel={(() => {
             closeTemplateModal()
           })}>
      <div className={less.modalContent}>
        <div className={less.title}>
          <span>Templates</span>
          <div className={less.input}>
            {/*<Input size="large" placeholder="Try Blog Email" prefix={<SearchOutlined width={24}/>}/>*/}
          </div>
        </div>
        <div className={less.templateList}>
          <div className={less.left}>
            <Menu className={less.menu} items={templateList} onSelect={(d) => {
              setFirstListKey(String(d.key))
              firstMenuAction(d.item.props?.details)
            }} selectedKeys={[firstListKey]}/>
          </div>
          <div className={less.left}>
            {
              currentTemplateList?.length > 0 &&
              <Menu className={less.menu} items={currentTemplateList} onSelect={(d) => {
                setSecondListKey(String(d.key))
                setCurrentTemplate(d.item.props)
              }}
                    selectedKeys={[secondListKey]}/>
            }
          </div>
          <div className={less.right}>
            {
              currentTemplate && (<>
                <div className={less.preview}>
                  预览
                </div>
                <div className={less.templateContent}
                     dangerouslySetInnerHTML={formatTemplateContent(currentTemplate?.content || '')}/>
                <div className={less.control}>
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
