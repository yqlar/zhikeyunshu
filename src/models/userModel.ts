// 全局共享数据示例
import {useState} from 'react'

const userModel = () => {
    // 会员价格弹窗
    const [priceModalVisible, setPriceModalVisible] = useState(false)
    // 微信二维码登录
    const [loginModalVisible, setLoginModalVisible] = useState(false)
    // vip 价格类型
    const [priceType, setPriceType] = useState(null)
    // 非 vip 时提示弹窗
    const [noVipTipsModal, setNoVipTipsModal] = useState(false)

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
    const openNoVipTipsModal = () => {
        setNoVipTipsModal(true)
    }
    const closeNoVipTipsModal = () => {
        setNoVipTipsModal(false)
    }
    return {
        priceModalVisible,
        setPriceModalVisible,
        openPriceModal,
        closePriceModal,
        loginModalVisible,
        openLoginModal,
        closeLoginModal,
        priceType,
        setPriceType,
        noVipTipsModal,
        openNoVipTipsModal,
        closeNoVipTipsModal
    }
}

export default userModel

