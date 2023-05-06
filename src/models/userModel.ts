// 全局共享数据示例
import {useState} from 'react'

const userModel = () => {
  // 会员价格弹窗
  const [priceModalVisible, setPriceModalVisible] = useState(false)
  // 微信二维码登录
  const [loginModalVisible, setLoginModalVisible] = useState(false)

  const openPriceModal = () => {
    setPriceModalVisible(true)
  }
  const closePriceModal = () => {
    setPriceModalVisible(false)
  }
  const openLoginModal = () => {
    setLoginModalVisible(true)
  }
  const closeLoginModal = () => {
    setLoginModalVisible(false)
  }
  return {
    priceModalVisible, openPriceModal, closePriceModal, loginModalVisible, openLoginModal, closeLoginModal,
  }
}

export default userModel

