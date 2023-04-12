import {FC, useEffect, useState} from 'react'
import {Button, Input, Menu, Modal} from 'antd'
import TemplateList from '@/components/TemplateList'
import less from './index.less'
import {SearchOutlined} from '@ant-design/icons'
import { useModel } from 'umi'

const PriceModal: FC = () => {
  const {priceModalVisible, closePriceModal} = useModel('userModel')

  return (
    <Modal className={less.modal} width={1100} open={priceModalVisible} footer={null} maskClosable={true} onCancel={(() => {
      closePriceModal()
    })}>

    </Modal>
  )
}

export default PriceModal
