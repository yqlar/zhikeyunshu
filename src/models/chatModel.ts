// 全局共享数据示例
import { useState } from 'react'
import { isLogin } from '@/utils'

const chatModel = () => {
  const [templateModalVisible, setTemplateModalVisible] = useState(false)
  const [continueButtonVisible, setContinueButtonVisible] = useState(false)
  const [gptModel, setGptModel] = useState('gpt3')
  const [templateContent, setTemplateContent] = useState('')
  const openTemplateModal = () => {
    if (isLogin()) {
      setTemplateModalVisible(true)
    }
  }
  const closeTemplateModal = () => {
    setTemplateModalVisible(false)
  }
  const changeTemplateContent = data => {
    setTemplateContent(data)
  }
  const hideContinueButton = () => {
    setContinueButtonVisible(false)
  }
  const showContinueButton = () => {
    setContinueButtonVisible(true)
  }
  return {
    templateModalVisible,
    closeTemplateModal,
    openTemplateModal,
    changeTemplateContent,
    templateContent,
    continueButtonVisible,
    hideContinueButton,
    showContinueButton,
    gptModel,
    setGptModel,
  }
}

export default chatModel
