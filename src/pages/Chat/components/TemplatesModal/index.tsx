import {FC, useEffect, useState} from 'react'
import {Input, Menu, Modal, Button} from 'antd'
import less from './index.less'
import {SearchOutlined} from '@ant-design/icons'
import {useModel} from 'umi'
import * as api from '@/services/api'

const TemplatesModal: FC = () => {
  const {templateModalVisible, closeTemplateModal, changeTemplateContent} = useModel('chatModel')
  const [disable, setDisable] = useState(true)
  const [templateList, setTemplateList] = useState([])
  const [currentTemplateList, setCurrentTemplateList] = useState([])
  const [currentTemplate, setCurrentTemplate] = useState(null)

  const getTemplate = async () => {
    try {
      const res = await api.getTemplateList()
      if (res?.length > 0) {
        const d = res.map(x => {
          return {
            key: x.id,
            label: x.name,
            ...x,
          }
        })
        setTemplateList(d)
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

  const firstMenuAction = (d) => {
    const list = d.item.props?.details?.map(x => {
      return {
        key: x.id,
        label: x.title,
        ...x,
      }
    })
    setCurrentTemplateList(list)
  }

  const secondMenuAction = (d) => {
    setCurrentTemplate(d.item.props)
  }

  const formatTemplateContent = (content) => {
    var reg = /\[([^\]]+)\]/g
    var arr = content.match(reg)
    let d = content
    arr.forEach((x) => {
      d = d.replaceAll(x, `<span>${x}</span>`)
    })

    return {__html: d}
  }

  return (
    <Modal className={less.modal} width={1100} bodyStyle={{height: '70vh'}} open={templateModalVisible} footer={null}
           maskClosable={true}
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
            <Menu className={less.menu} items={templateList} onClick={firstMenuAction}/>
          </div>
          <div className={less.left}>
            {
              currentTemplateList?.length > 0 &&
              <Menu className={less.menu} items={currentTemplateList} onClick={secondMenuAction}/>
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
