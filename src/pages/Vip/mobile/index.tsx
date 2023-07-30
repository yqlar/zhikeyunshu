import React, {FC, useState} from 'react'
import {Button} from 'antd'
import less from './index.less'
import vipRecommend from '@/assets/img/vip-recommend.svg'
import QrCode from "@/pages/Vip/components/qrCode";

const VipMobile: FC = (props) => {
    const {timeType, setTimeType, priceList, recharge} = props?.data
    const [currentSelect, setCurrentSelect] = useState('pro')

    return (
        <div className="p-[20px] text-center">
            <div className="text-[20px] my-[12px]">加入会员</div>
            <h1 className="text-[18px] font-bold mb-1">使用智客Ai助手提高工作效率</h1>
            <h2 className="text-[12px] font-bold mb-[24px] textMulticolor">使用智客Ai助手提高工作效率</h2>
            <div className={less.timeSwitch}>
                <div className={timeType === 'month' ? less.timeSwitchIsActive : ''} onClick={() => {
                    setTimeType("month")
                }}>
                    每月
                </div>
                <div className={timeType === 'year' ? less.timeSwitchIsActive : ''} onClick={() => {
                    setTimeType("year")
                }}>
                    <div>每年</div>
                    <div>save 30%</div>
                </div>
            </div>
            <div>

                {/* pro */}
                <div className="flex j-c-around px-1">
                    <div className={`${less.borderItem} ${currentSelect === 'pro' && less.active}`} onClick={() => {
                        setCurrentSelect('pro')
                    }}>
                        <img className="absolute -right-5 -top-5" src={vipRecommend} alt=""/>
                        <div className="text-[14px] font-bold">ZHIKE Pro</div>
                        <div className="text-[11px] text-gray-400 mb-6">每天不到{priceList[timeType]?.pro?.day}元</div>
                        <div
                            className="text-[22px] font-bold mb-[23px] text-[#1A8BFE]">{priceList[timeType]?.pro?.month}元 <span
                            className="text-[12px]">/月</span></div>

                        <Button type={currentSelect === 'pro' ? 'primary' : 'default'} size="large" block
                                onClick={() => {
                                    recharge('pro')
                                }}>立即升级</Button>
                    </div>
                    <div className={`${less.borderItem} ${currentSelect === 'pro+' && less.active}`} onClick={() => {
                        setCurrentSelect('pro+')
                    }}>
                        <div className="text-[14px] font-bold">ZHIKE Pro+</div>
                        <div className="text-[11px] text-gray-400 mb-6">每天不到{priceList[timeType]?.pro_plus?.day}元
                        </div>
                        <div
                            className="text-[22px] font-bold mb-[23px] text-[#1A8BFE]">{priceList[timeType]?.pro_plus?.month}元 <span
                            className="text-[12px]">/月</span></div>

                        <Button type={currentSelect === 'pro+' ? 'primary' : 'default'} size="large" block
                                onClick={() => {
                                    recharge('pro')
                                }}>立即升级</Button>
                    </div>
                </div>

                <div className="text-[12px] text-gray-400 text-left my-[24px]">
                    <a target="_blank" href="/protocol">开通前请阅读并同意《智客Ai系列会员协议》</a>
                </div>

                {currentSelect === 'pro' ?
                    <div className="text-left">
                        <div className="text-[16px] font-medium mb-4">ZHIKE Pro 的优势：</div>
                        <div className="text-gray-600">
                            <div className="mb-2">
                                <span className="text-xs text-gray-300 mr-[10px]">●</span>
                                <span>更多查询</span>
                            </div>
                            <div className="pl-5 mb-2">
                                ✅ 2500 次查询每月
                            </div>
                            <div className="pl-5 mb-2">
                                ✅ 赠送：30 次GPT-4查询每月
                            </div>
                            <div className="pl-5 mb-2">
                                ✅ 赠送：生成 200 张图片每月<span className="text-[#aaaaaa]">（即将）</span>
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
                                ✅ ChatPDF：分析PDF文件的内 容，然后用一个文本生成的AI 来回答你的问题。<span
                                className="text-[#aaaaaa]">（即将）</span>
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
                            <div className="pl-5 mb-2">
                                ✅ 流量高峰期无请求限制
                            </div>
                            <div className="pl-5 mb-2">
                                ✅ 2倍更快的响应时间
                            </div>
                            <div className="pl-5 mb-2">
                                ✅ 优先电子邮件支持
                            </div>
                        </div>
                    </div> :
                    <div className="text-left">
                        <div className="text-[16px] font-medium mb-4">ZHIKE Pro+ 的优势：</div>
                        <div className="text-gray-600">
                            <div className="mb-2">
                                <span className="text-xs text-gray-300 mr-[10px]">●</span>
                                <span>更多查询</span>
                            </div>
                            <div className="pl-5 mb-2">
                                ✅ 6000 次查询每月
                            </div>
                            <div className="pl-5 mb-2">
                                ✅ 赠送：60 次GPT-4查询每月<span className="text-[#aaaaaa]">（即将）</span>
                            </div>
                            <div className="pl-5 mb-2">
                                ✅ 赠送：生成 400 张图片每月
                            </div>
                            <div className="mb-2">
                                <span className="text-xs text-gray-300 mr-[10px]">●</span>
                                <span>访问ZHIKE Pro的所有功能</span>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <QrCode/>
        </div>
    )
}

export default VipMobile
