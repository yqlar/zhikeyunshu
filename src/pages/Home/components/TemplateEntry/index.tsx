import {FC} from 'react'
import less from './index.less'
import book from '@/assets/img/book.svg'
import right from '@/assets/img/arrow-right.svg'

const TemplateEntry: FC = () => {
    return (
        <div className={less.card}>
            <div className={less.left}>
                <div className={less.imgContainer}>
                    <img src={book} alt="book"/>
                </div>
                <div className={less.title}>
                    <div>FOR BLOG WRITERS</div>
                    <div>Write blogs 10x faster</div>
                </div>
            </div>
            <img src={right} alt=""/>
        </div>
    )
}

export default TemplateEntry
