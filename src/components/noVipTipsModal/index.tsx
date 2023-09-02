import React, { FC } from 'react'
import { Button, Modal } from 'antd'
import { useModel, history } from 'umi'

const NoVipTipsModal: FC = () => {
  const { noVipTipsModal, openNoVipTipsModal, closeNoVipTipsModal } = useModel('userModel')

  const onCancel = () => {
    closeNoVipTipsModal()
  }

  return (
    <Modal title="" width={420} open={noVipTipsModal} onCancel={() => onCancel()} footer={null} style={{ top: '40vh' }}>
      <div className="text-4 text-center mt-5">
        您的免费次数已用完，立即升级成为 <span className="text-[#1A8BFE]">ZHIKE Pro</span>{' '}
        会员，解锁专属功能，无限畅聊。
      </div>
      <div className="mt-5 text-center">
        <Button
          type="primary"
          onClick={() => {
            history.push('/vip')
          }}
        >
          立即升级
        </Button>
      </div>
    </Modal>
  )
}

export default NoVipTipsModal
