import React, {FC, useEffect, useRef, useState} from 'react'
import {message, Modal, Spin} from 'antd'
import QRCodeSVG from 'qrcode.react'
import {useModel, history} from 'umi'
import {checkWeChatPaymentStatus, getVipPriceQrCode} from "@/services/api";
import wechat from '@/assets/img/wechat.svg'

const QrCode: FC = () => {
    const {priceModalVisible, closePriceModal, setPriceModalVisible, priceType} = useModel('userModel')
    const [qrCodeValue, setPrCodeValue] = useState('')
    const [loading, setLoading] = useState(false)
    const clearTime = useRef<any>()

    const onCancel = () => {
        if (qrCodeValue) {
            setPrCodeValue('')
            setPriceModalVisible(false)
            closePriceModal()
            clearTimeout(clearTime.current)
        }
    }

    const checkPayment = async (trade_no) => {
        const res = await checkWeChatPaymentStatus({trade_no})
        if (res?.paid_status) {
            message.success('支付成功！')
            clearTimeout(clearTime.current)
            onCancel()
            history.push('/chat')
        } else {
            clearTime.current = setTimeout(() => {
                checkPayment(trade_no)
            }, 1000)
        }
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
                <div className="text-[20px] font-bold mt-2 mb-4">
                    支付金额：¥{priceType?.all}
                </div>
                <div className="mb-4 text-[#6c7d8f]">
                    <img className="mr-1 w-4" src={wechat} alt=""/>
                    使用微信扫码支付
                </div>
                <div className="m-auto m-0 w-[150px] h-[150px]  flex items-center justify-center">
                    <Spin spinning={loading}>
                        {qrCodeValue && <QRCodeSVG className="" value={qrCodeValue}/>}
                    </Spin>
                </div>
            </div>
        </Modal>
    )
}

export default QrCode
