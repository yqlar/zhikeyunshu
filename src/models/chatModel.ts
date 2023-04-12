// 全局共享数据示例
import {useState} from 'react'

const chatModel = () => {
  const [templateModalVisible, setTemplateModalVisible] = useState(false)
  const openTemplateModal = () => {
    setTemplateModalVisible(true)
  }
  const closeTemplateModal = () => {
    setTemplateModalVisible(false)
  }
  return {
    templateModalVisible, closeTemplateModal, openTemplateModal
  }
}

export default chatModel

