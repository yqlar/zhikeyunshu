import {FC, useEffect, useState} from 'react'
import {Button, Input, Menu, Modal} from 'antd'
import TemplateList from '@/components/TemplateList'
import less from './index.less'
import {SearchOutlined} from '@ant-design/icons'
import {TemplateItem} from '@/interface/templates'
import { useModel } from 'umi'
import {getTemplateList} from '@/services/api'

const TemplatesModal: FC = () => {
  const {templateModalVisible, closeTemplateModal} = useModel('chatModel')
  const [disable, setDisable] = useState(true)
  const [selectTemplate, setSelectTemplate] = useState<TemplateItem | null>(null)
  const items = [
    {
      key: 'all',
      label: 'All Templates',
    },
    {
      key: 'custom',
      label: 'Custom',
    },
    {
      key: 'blog',
      label: 'Blog',
    },
    {
      key: 'social',
      label: 'Social Media Content',
    },
  ]

  useEffect(() => {
      if (templateModalVisible) {
        getTemplateList().then((res) => {
          console.log(res)
            if (res) {

            }
        })
      }
  }, [templateModalVisible])

  const setTemplate = () => {
    console.log('-- select: ', selectTemplate)
  }

  return (
    <Modal className={less.modal} width={1100} open={templateModalVisible} footer={null} maskClosable={true} onCancel={(() => {
      closeTemplateModal()
    })}>
      <div className={less.modalContent}>
        <div className={less.left}>
          <div className={less.title}>
            Templates
          </div>
          <Menu className={less.menu} items={items}/>
        </div>
        <div className={less.right}>
          <div className={less.input}>
            <Input size="large" placeholder="Try Blog Email" prefix={<SearchOutlined width={24}/>}/>
          </div>
          <TemplateList templateOnClick={(d) => {
            setDisable(false)
            setSelectTemplate(d)
          }}/>
          <div className={less.control}>
            <Button onClick={setTemplate} disabled={disable} type={disable ? 'default' : 'primary'} size="large">Start
              New Project</Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default TemplatesModal
