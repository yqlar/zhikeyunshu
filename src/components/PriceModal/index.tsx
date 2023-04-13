import {FC} from 'react'
import less from './index.less'
import {Button, Card, Modal} from 'antd'
import {useModel} from 'umi'
import userHeadImg from '@/assets/img/user-head.png'
import {CheckOutlined} from '@ant-design/icons'

const PriceModal: FC = () => {
  const {priceModalVisible, closePriceModal} = useModel('userModel')

  return (
    <Modal centered={true} width={700} open={priceModalVisible} footer={null} maskClosable={true} onCancel={(() => {
      closePriceModal()
    })}>
      <div className={less.title}>
        You have no words remaining!
      </div>
      <div className={less.subTitle}>You don’t have words remaining this month. Upgrade now to continue using Copy.ai.</div>
      <div class="flex">
        <div className={less.priceContainer}>
          <div className={less.priceList}>
            <Card bodyStyle={{padding: 0}} className={less.priceCard} hoverable={true}>
              <div className={less.cartTitle}>Day pass</div>
              <div className={less.cardSubTitle}>
                Get unlimited words for the next 24 hours
              </div>

              <div className={less.price}>
                <span>¥</span>
                <span>19</span>
                <span> one time</span>
              </div>

              <div className={less.buy}>
                <Button type='default' size='large'>Purchase now</Button>
              </div>
            </Card>

            <Card style={{border: '1px solid #1A8BFE'}} bodyStyle={{padding: 0}} className={less.priceCard} hoverable={true}>
              <div className={less.newTag}>新人特惠</div>
              <div className={less.cartTitle}>Pro</div>
              <div className={less.cardSubTitle}>Unlimited words. Each Month.</div>

              <div className={less.price}>
                <span>¥</span>
                <span>19</span>
                <span> one time</span>
              </div>

              <div className={less.buy}>
                <Button type='primary' size='large'>Upgrade now</Button>
              </div>
            </Card>
          </div>
          <div className={less.interests}>
            <div>
              <CheckOutlined /> Unlimited words
            </div>
            <div>
              <CheckOutlined /> Up to 5 user seats
            </div>
            <div>
              <CheckOutlined /> 90+ copywriting tools
            </div>
          </div>
        </div>
        <div className={less.right}>
          <div>"Copy.ai has quickly become one of the most useful tools in my marketing stack. Copy.ai is 50% ghost writer, 50% brainstorming partner, and 100% worth it."
          </div>
          <div className={less.userHead}>
            <img class="ab-center" src={userHeadImg} alt=""/>
          </div>
          <div className={less.useName}>Brennan Foo - On Deck</div>
        </div>
      </div>
    </Modal>
  )
}

export default PriceModal
