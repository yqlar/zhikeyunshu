// 全局共享数据示例
import {useState} from 'react'
import {isLogin} from '@/utils'

const chatModel = () => {
  const [templateModalVisible, setTemplateModalVisible] = useState(false)
  const [templateContent, setTemplateContent] = useState('')
  const openTemplateModal = () => {
    if (isLogin()) {
      setTemplateModalVisible(true)
    }
  }
  const closeTemplateModal = () => {
    setTemplateModalVisible(false)
  }
  const changeTemplateContent = (data) => {
    setTemplateContent(data)
  }
  return {
    templateModalVisible, closeTemplateModal, openTemplateModal, changeTemplateContent, templateContent
  }
}

export default chatModel

