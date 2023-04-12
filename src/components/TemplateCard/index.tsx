import {FC} from 'react'
import less from './index.less'
import writeIcon from '@/assets/img/write.svg'
interface Props {
  selected: boolean
}

const TemplateCard: FC<Props> = (props) => {
  return (
    <div className={[less.templateCard, props.selected ? less.select : ''].join(' ')}>
      <div>
        <img src={writeIcon} alt=""/>
      </div>
      <div className={less.name}>Write a Paragraph</div>
      <div className={less.desc}>
        Generate well-written  paragraphs on any given subject.
      </div>
    </div>
  )
}

export default TemplateCard
