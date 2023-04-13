// 全局共享数据示例
import {useState} from 'react'

const userModel = () => {
  const [priceModalVisible, setPriceModalVisible] = useState(false)

  const openPriceModal = () => {
    setPriceModalVisible(true)
  }
  const closePriceModal = () => {
    setPriceModalVisible(false)
  }
  return {
    priceModalVisible, openPriceModal, closePriceModal
  }
}

export default userModel

