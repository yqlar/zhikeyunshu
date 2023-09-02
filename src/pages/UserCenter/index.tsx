import { Button, Card, Table } from 'antd'
import { history } from 'umi'
import gpt3 from './gpt3.svg'
import gpt4 from './gpt4.svg'
import { useEffect, useState } from 'react'
import { bookingList, userVipData } from '@/services/api'

const UserCenter = () => {
  const [data, setData] = useState([])
  const [userData, setUserData] = useState({
    membership: {
      paid_product_type: '-',
      end_time: '-',
    },
    usage: {
      gpt_3: '-',
      gpt_3_extra: '-',
      gpt_4: '-',
      gpt_4_extra: '-',
    },
  })
  const columns = [
    {
      title: '订单详情',
      dataIndex: 'product_type_name',
      key: 'product_type_name',
    },
    {
      title: '时间',
      dataIndex: 'pay_time',
      key: 'pay_time',
    },
    {
      title: '金额',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
  ]

  useEffect(() => {
    bookingList().then(res => {
      if (res) {
        setData(res)
      }
      console.log(res)
    })
    userVipData().then(res => {
      if (res) {
        setUserData(res)
      }
      console.log(res)
    })
  }, [])

  return (
    <div className="px-[40px] py-[30px] overflow-y-auto h-[calc(100vh-80px)]">
      <div className="font-[20px] font-bold mb-[32px]">计费</div>

      <div className="flex j-c-around ">
        <Card style={{ width: 455, marginRight: '10px' }}>
          {userData?.membership?.paid_product_type ? (
            <>
              <div className="text-[20px] font-bold text-[#9e9e9e]">
                目前，您使用的是{' '}
                <span className="text-[rgba(26,139,254,1)]">{userData?.membership?.paid_product_type}</span>
                ，感谢您支持我们的持续发展。
              </div>
              <div className="mt-[80px] flex items-center justify-between">
                <div className="text-[#9E9E9E]">会员计划到期时间: {userData?.membership?.end_time.split(' ')[0]}</div>
                <Button
                  shape="round"
                  type="primary"
                  onClick={() => {
                    history.push('/vip')
                  }}
                >
                  立即续费
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="text-[#9e9e9e] text-[20px] font-bold">
                目前，您使用的是 <span className="text-[#15BA11]">免费计划</span>，没有与之相关的账单信息。
                可以升级到我们的高级计划以解锁更多功能并支持我们的持续发展。
              </div>
              <div className="text-center mt-[24px]">
                <Button
                  size="large"
                  type="primary"
                  shape="round"
                  onClick={() => {
                    history.push('/vip')
                  }}
                >
                  立即升级
                </Button>
              </div>
            </>
          )}
        </Card>
        <Card style={{ width: 455 }}>
          <div className="flex j-c-start w-full pb-[24px] border-b-[1px] border-b-[rgba(51,51,51,0.3)] mb-[24px]">
            <div className="mr-[24px] w-[60px] text-center flex-shrink-0">
              <div className="text-center">
                <img src={gpt3} alt="" />
              </div>
              <div className="mt-[8px] text-[14px] font-bold">GPT 3.5</div>
            </div>
            <div className="flex j-c-between w-full">
              <div>
                <div>基础版 (每天 5 个查询)</div>
                <div className="mt-[10px]">额外</div>
              </div>
              <div className="text-[#9E9E9E]">
                <div>剩余{userData?.usage.gpt_3}条</div>
                <div className="mt-[10px]">剩余{userData?.usage.gpt_3_extra}条</div>
              </div>
            </div>
          </div>

          <div className="flex j-c-start w-full">
            <div className="mr-[24px] w-[60px] text-center flex-shrink-0">
              <div>
                <img src={gpt4} alt="" />
              </div>
              <div className="mt-[8px] text-[14px] font-bold">GPT 4</div>
            </div>
            <div className="flex j-c-between w-full">
              <div>
                <div>基础版</div>
                <div className="mt-[10px]">额外</div>
              </div>
              <div className="text-[#9E9E9E]">
                <div>剩余{userData?.usage.gpt_4}条</div>
                <div className="mt-[10px]">剩余{userData?.usage.gpt_4_extra}条</div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div>
        <div className="font-[20px] font-bold my-[32px]">我的订单</div>

        <Table columns={columns} dataSource={data}></Table>
      </div>
    </div>
  )
}
export default UserCenter
