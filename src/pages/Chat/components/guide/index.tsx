import { FC } from 'react'
import GuideSearch from '@/assets/img/guide-search.png'
import GuideLongContent from '@/assets/img/guide-long-content.png'
import GuideSuggest from '@/assets/img/guide-suggest.png'
import GuideLaw from '@/assets/img/guide-law.png'

interface Props {
  updateInput(x: string): void;
}

const Guide: FC = (props: Props) => {
  const list = [
    {
      img: GuideSearch,
      title: '实时搜索',
      template: ['"汇总关于人工智能的最新消息"', '"写一篇关于数字货币的研究报告"'],
    },
    {
      img: GuideLongContent,
      title: '长篇内容',
      template: ['"创作有关于搜索引起优化的博客文章"', '"写一篇关于智客Ai助手的新闻稿"'],
    },
    {
      img: GuideSuggest,
      title: '集思广益',
      template: ['"为时装周生成10个适用于小红书的标题"', '"用乔布斯的风格为自行车写一篇产品描述"'],
    },
    {
      img: GuideLaw,
      title: '法律咨询',
      template: ['"工作中受伤但企业未缴纳工伤保险可以要求赔偿吗？"', '"追索劳动报酬要求先向劳动仲裁申请裁决吗？"'],
    },
  ]
  return (
    <div className="text-center">
      <div className="text-[28px] font-extrabold mb-[24px] mt-[40px]">
        欢迎使用 <span className="text-[#1A8BFE]">智客Ai助手</span>
      </div>
      <div className="text-[#333333] mb-[40px]">
        开启一项任务，然后通过聊天就可以完成剩下的工作。不知道从何说起？查看以下提示寻找灵感吧。
      </div>
      <div>
        {list.map(item => {
          return (
            <div className="flex items-center mb-[40px]" key={item.title}>
              <img className="mr-[20px] w-[48px] h-[48px]" src={item.img} alt="" />
              <div className="text-left">
                <div className="text-[18px] font-semibold mb-[9px] leading-[24px]">{item.title}</div>
                {item.template.map(temp => {
                  return (
                    <div
                      key={temp}
                      className="cursor-pointer mb-[4px] text-[#476E96]"
                      onClick={() => {
                        const t = temp.split('"')
                        props.updateInput(t[1])
                      }}
                    >
                      {temp}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Guide
