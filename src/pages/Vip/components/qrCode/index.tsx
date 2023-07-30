import React, {FC, useEffect, useRef, useState} from 'react'
import {message, Modal, Spin} from 'antd'
import QRCodeSVG from 'qrcode.react'
import {history, useModel} from 'umi'
import {checkWeChatPaymentStatus, getVipPriceQrCode} from "@/services/api";
import wechat from '@/assets/img/wechat.svg'
import Yes from '@/assets/img/yes.svg'

const QrCode: FC = () => {
    const {priceModalVisible, closePriceModal, setPriceModalVisible, priceType} = useModel('userModel')
    const [qrCodeValue, setPrCodeValue] = useState('')
    const [loading, setLoading] = useState(false)
    const clearTime = useRef<any>()
    const fetchTime = useRef<any>(0)

    const resetStatus = () => {
        clearTimeout(clearTime.current)
        fetchTime.current = 0
    }

    const onCancel = () => {
        if (qrCodeValue) {
            setPrCodeValue('')
            setPriceModalVisible(false)
            closePriceModal()
            resetStatus()
        }
    }

    const checkPayment = async (trade_no) => {
        const res = await checkWeChatPaymentStatus({trade_no})
        if (res?.paid_status) {
            onCancel()

            Modal.success({
                title: '支付成功！',
                content: '感谢您的支持',
                okText: '返回首页',
                onOk: () => {
                    history.push('/chat')
                }
            })
        } else {
            clearTime.current = setTimeout(() => {
                if (fetchTime.current <= 15) {
                    checkPayment(trade_no)
                } else {
                    onCancel()
                    message.error('支付超时，请重新打开支付弹窗扫码！')
                }
            }, 1000)
        }
        fetchTime.current = fetchTime.current + 1
    }

    useEffect(() => {
        if (priceModalVisible) {
            const id = priceType.id
            setLoading(true)
            getVipPriceQrCode({product_type: id}).then((res) => {
                if (res) {
                    setPrCodeValue(res.pay_link)
                    checkPayment(res.trade_no)
                }
            }).finally(() => {
                setLoading(false)
            })
        }
    }, [priceModalVisible])

    return (
        <Modal
            title=""
            width={420}
            keyboard={false}
            maskClosable={false}
            open={priceModalVisible}
            onCancel={() => onCancel()}
            footer={null}
            afterClose={() => {
                clearTimeout(clearTime.current)
            }}
        >

            {/*font-size: 20px;*/}
            {/*font-weight: 700;*/}
            {/*color: #212930;*/}
            {/*line-height: 23px;*/}
            {/*margin-bottom: 16px;*/}

            <div className="text-center p-4">
                <div className="text-[24px] font-bold">{priceType?.name}</div>
                <div className="text-[20px] font-bold mb-4">
                    支付金额：¥{priceType?.all}
                </div>
                <div className="m-auto m-0 w-[150px] h-[150px] flex items-center justify-center p-[12px] border-2 rounded-[8px]">
                    <Spin spinning={loading}>
                        {qrCodeValue && <QRCodeSVG className="" value={qrCodeValue}/>}
                    </Spin>
                </div>
                <div className="mt-4 mb-2 text-[16px] text-[#6c7d8f]">
                    <img className="mr-1 w-5" src={wechat} alt=""/>
                    使用微信扫码支付
                </div>
                <div className="text-[12px] text-gray-400">
                    <a target="_blank" href="/protocol">开通前请阅读并同意《智客Ai系列会员协议》</a>
                </div>
            </div>
        </Modal>
    )
}

export default QrCode
