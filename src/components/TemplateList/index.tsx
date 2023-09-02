import {FC, useState} from 'react'
import less from './index.less'
import TemplateCard from '@/components/TemplateCard'
import {TemplateItem} from '@/interface/templates'

interface Props {
    templateOnClick(x: TemplateItem): void
}

const TemplateList: FC<Props> = (props) => {
    const [select, setSelect] = useState<number>(-1)
    const list: TemplateItem [] = [
        {
            name: 'Blog Post Wizard',
            desc: 'Jump into a whole first draft of your blog post in 5 minutes — all we need is your title and topic.',
        },
        {
            name: 'Write Blog Intro',
            desc: 'Writing a blog? Create a compelling intro to get your blog going',
        },
        {
            name: 'Write Blog Section',
            desc: 'Write a full section of your blog in seconds!',
        },
        {
            name: 'Write Blog Intro',
            desc: 'Writing a blog? Create a compelling intro to get your blog going',
        },
        {
            name: 'Write Blog Section',
            desc: 'Write a full section of your blog in seconds!',
        },
        {
            name: 'Write Blog Intro',
            desc: 'Writing a blog? Create a compelling intro to get your blog going',
        },
        {
            name: 'Write Blog Section',
            desc: 'Write a full section of your blog in seconds!',
        }, {
            name: 'Blog Post Wizard',
            desc: 'Jump into a whole first draft of your blog post in 5 minutes — all we need is your title and topic.',
        },
        {
            name: 'Write Blog Intro',
            desc: 'Writing a blog? Create a compelling intro to get your blog going',
        },
        {
            name: 'Write Blog Section',
            desc: 'Write a full section of your blog in seconds!',
        },
        {
            name: 'Write Blog Intro',
            desc: 'Writing a blog? Create a compelling intro to get your blog going',
        },
        {
            name: 'Write Blog Section',
            desc: 'Write a full section of your blog in seconds!',
        },
        {
            name: 'Write Blog Intro',
            desc: 'Writing a blog? Create a compelling intro to get your blog going',
        },
        {
            name: 'Write Blog Section',
            desc: 'Write a full section of your blog in seconds!',
        }, {
            name: 'Blog Post Wizard',
            desc: 'Jump into a whole first draft of your blog post in 5 minutes — all we need is your title and topic.',
        },
        {
            name: 'Write Blog Intro',
            desc: 'Writing a blog? Create a compelling intro to get your blog going',
        },
        {
            name: 'Write Blog Section',
            desc: 'Write a full section of your blog in seconds!',
        },
        {
            name: 'Write Blog Intro',
            desc: 'Writing a blog? Create a compelling intro to get your blog going',
        },
        {
            name: 'Write Blog Section',
            desc: 'Write a full section of your blog in seconds!',
        },
        {
            name: 'Write Blog Intro',
            desc: 'Writing a blog? Create a compelling intro to get your blog going',
        },
        {
            name: 'Write Blog Section',
            desc: 'Write a full section of your blog in seconds!',
        },
    ]

    return (
        <div className={less.list}>
            <div>
                {list.map((x, i) => {
                    return (
                        <div onClick={() => {
                            props.templateOnClick(x)
                            setSelect(i)
                        }} key={i}>
                            <TemplateCard selected={i === select} name={x.name} desc={x.desc}/>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default TemplateList
