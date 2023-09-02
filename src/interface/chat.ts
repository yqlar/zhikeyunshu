export interface ChatItem {
    // id: number
    type: 'answer' | 'question'
    content: string
}

export interface AnswerItem {
    msg_id: string
    type: 'text'
    data: string
}
