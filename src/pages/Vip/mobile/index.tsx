import React, { FC, useEffect, useMemo, useState } from 'react'
import { Button, message, Modal } from 'antd'
import less from './index.less'
import vipRecommend from '@/assets/img/vip-recommend.svg'
import QrCode from '@/pages/Vip/components/qrCode'
import qs from 'qs'
import { getAccessToken, mobilePay } from '@/services/api'

const VipMobile: FC = props => {
  const { timeType, setTimeType, priceList } = props?.data
  const [currentSelect, setCurrentSelect] = useState('one_year_paid_pro')
  const [token, setToken] = useState('')

  useEffect(() => {
    const query = qs.parse(location.href.split('?')[1])
    const { code } = query
    if (code) {
      getAccessToken({ code }).then(res => {
        if (res?.token) {
          setToken(res.token)
        }
      })
    } else {
      location.href =
        'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf5368c9d8cd91aef&redirect_uri=http%3A%2F%2Fmini.vcode.me%2Fvip&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect'
    }
  }, [])

  const pay = type => {
    mobilePay({
      product_type: type,
      token,
      channel: 'wechat_type',
    })
      .then(res => {
        if (res?.paySign) {
          const { timeStamp, package: wxPackage, paySign, appId, signType, nonceStr, prepayId } = res

          function onBridgeReady() {
            WeixinJSBridge.invoke(
              'getBrandWCPayRequest',
              {
                timeStamp: timeStamp,
                package: wxPackage,
                paySign: paySign,
                appId: appId,
                signType: signType,
                nonceStr: nonceStr,
              },
              function (res) {
                if (res.err_msg === 'get_brand_wcpay_request:ok') {
                  Modal.success({ content: '支付成功！' })
                } else if (res.err_msg === 'chooseWXPay:fail') {
                  Modal.error({ content: '订单支付失败！' })
                } else {
                  message.error(res)
                  // let closeLink = host + '/v1/pay/asset/paid/close?token=' + token + '&prepay_id=' + prepayId
                  // $.get(closeLink, function (_data, status) {
                  //     if (status == 'success') {
                  //         weui.toast(_data.message, {
                  //             duration: 2000,
                  //             className: "bears"
                  //         })
                  //     }
                  // })
                }
              },
            )
          }

          if (typeof WeixinJSBridge == 'undefined') {
            if (document.addEventListener) {
              document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
            } else if (document.attachEvent) {
              document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
              document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
            }
          } else {
            onBridgeReady()
          }
        } else {
          message.error(res.message)
        }
      })
      .catch(e => {
        message.error(e)
      })
  }

  const isPro = useMemo(() => {
    return ['one_month_paid_pro', 'one_year_paid_pro'].includes(currentSelect)
  }, [currentSelect])

  const isPlus = useMemo(() => {
    return ['one_month_paid_pro_plus', 'one_year_paid_pro_plus'].includes(currentSelect)
  }, [currentSelect])

  return (
    <div className="p-[20px] text-center">
      <div className="text-[20px] my-[12px]">加入会员</div>
      <h1 className="text-[18px] font-bold mb-1">使用智客Ai助手提高工作效率</h1>
      <h2 className="text-[12px] font-bold mb-[24px] textMulticolor">使用智客Ai助手提高工作效率</h2>
      <div className={less.timeSwitch}>
        <div
          className={timeType === 'month' ? less.timeSwitchIsActive : ''}
          onClick={() => {
            setTimeType('month')
          }}
        >
          每月
        </div>
        <div
          className={timeType === 'year' ? less.timeSwitchIsActive : ''}
          onClick={() => {
            setTimeType('year')
          }}
        >
          <div>每年</div>
          <div>save 30%</div>
        </div>
      </div>
      <div>
        {/* pro */}
        <div className="flex j-c-around px-1">
          <div
            className={`${less.borderItem} ${isPro && less.active}`}
            onClick={() => {
              setCurrentSelect(priceList[timeType].pro.id)
            }}
          >
            <img className="absolute -right-5 -top-5" src={vipRecommend} alt="" />
            <div className="text-[14px] font-bold">ZHIKE Pro</div>
            <div className="text-[11px] text-gray-400 mb-6">每天不到{priceList[timeType]?.pro?.day}元</div>
            <div className="text-[22px] font-bold mb-[23px] text-[#1A8BFE]">
              {priceList[timeType]?.pro?.month}元 <span className="text-[12px]">/月</span>
            </div>

            <Button
              type={isPro ? 'primary' : 'default'}
              size="large"
              block
              onClick={() => {
                pay(priceList[timeType].pro.id)
              }}
            >
              立即升级
            </Button>
          </div>
          <div
            className={`${less.borderItem} ${isPlus && less.active}`}
            onClick={() => {
              setCurrentSelect(priceList[timeType].pro_plus.id)
            }}
          >
            <div className="text-[14px] font-bold">ZHIKE Pro+</div>
            <div className="text-[11px] text-gray-400 mb-6">每天不到{priceList[timeType]?.pro_plus?.day}元</div>
            <div className="text-[22px] font-bold mb-[23px] text-[#1A8BFE]">
              {priceList[timeType]?.pro_plus?.month}元 <span className="text-[12px]">/月</span>
            </div>

            <Button
              type={isPlus ? 'primary' : 'default'}
              size="large"
              block
              onClick={() => {
                pay(priceList[timeType].pro_plus.id)
              }}
            >
              立即升级
            </Button>
          </div>
        </div>

        <div className="text-[12px] text-gray-400 text-left my-[24px]">
          <a target="_blank" href="/protocol">
            开通前请阅读并同意《智客Ai系列会员协议》
          </a>
        </div>

        {isPro ? (
          <div className="text-left">
            <div className="text-[16px] font-medium mb-4">ZHIKE Pro 的优势：</div>
            <div className="text-gray-600">
              <div className="mb-2">
                <span className="text-xs text-gray-300 mr-[10px]">●</span>
                <span>更多查询</span>
              </div>
              <div className="pl-5 mb-2">✅ 2500 次查询每月</div>
              <div className="pl-5 mb-2">
                ✅ 赠送：30 次GPT-4查询每月
                <span className="text-[#aaaaaa]">（即将）</span>
              </div>
              <div className="pl-5 mb-2">
                ✅ 赠送：生成 200 张图片每月
                <span className="text-[#aaaaaa]">（即将）</span>
              </div>
              <div className="mb-2">
                <span className="text-xs text-gray-300 mr-[10px]">●</span>
                <span>访问所有基础功能</span>
              </div>
              <div className="mb-2">
                <span className="text-xs text-gray-300 mr-[10px]">●</span>
                <span>访问所有专业功能</span>
              </div>
              <div className="pl-5 mb-2">
                ✅ ChatPDF：分析PDF文件的内 容，然后用一个文本生成的AI 来回答你的问题。
                <span className="text-[#aaaaaa]">（即将）</span>
              </div>
              <div className="pl-5 mb-2">
                ✅ 智能搜索：使用我们的聊天机 器人的实时网页搜索和引用的 功能简化搜索，增强准确性。
              </div>
              <div className="pl-5 mb-2">
                ✅ YouTube 摘要：简化视频摘要和亮点提取。<span className="text-[#aaaaaa]">（即将）</span>
              </div>
              <div className="mb-2">
                <span className="text-xs text-gray-300 mr-[10px]">●</span>
                <span>其他优势</span>
              </div>
              <div className="pl-5 mb-2">✅ 流量高峰期无请求限制</div>
              <div className="pl-5 mb-2">✅ 2倍更快的响应时间</div>
              <div className="pl-5 mb-2">✅ 优先电子邮件支持</div>
            </div>
          </div>
        ) : (
          <div className="text-left">
            <div className="text-[16px] font-medium mb-4">ZHIKE Pro+ 的优势：</div>
            <div className="text-gray-600">
              <div className="mb-2">
                <span className="text-xs text-gray-300 mr-[10px]">●</span>
                <span>更多查询</span>
              </div>
              <div className="pl-5 mb-2">✅ 6000 次查询每月</div>
              <div className="pl-5 mb-2">
                ✅ 赠送：60 次GPT-4查询每月<span className="text-[#aaaaaa]">（即将）</span>
              </div>
              <div className="pl-5 mb-2">
                ✅ 赠送：生成 400 张图片每月<span className="text-[#aaaaaa]">（即将）</span>
              </div>
              <div className="mb-2">
                <span className="text-xs text-gray-300 mr-[10px]">●</span>
                <span>访问ZHIKE Pro的所有功能</span>
              </div>
            </div>
          </div>
        )}
      </div>
      <QrCode />
    </div>
  )
}

export default VipMobile
