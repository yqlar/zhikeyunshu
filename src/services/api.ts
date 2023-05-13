import {request} from '@umijs/max'

// 获取微信登录二维码
export async function getWeChatQRCode(
  options?: { [key: string]: any },
) {
  return request('/v1/user/wechat/qrcode', {
    method: 'GET',
    ...(options || {}),
  })
}

// 微信登录二维码扫码回调
export async function scanCallback(
  params: {
    session_id: string
  },
  options?: { [key: string]: any },
) {
  return request('/v1/user/wechat/scan_callback', {
    method: 'GET',
    params,
    ...(options || {}),
  })
}

// chat 列表
export async function getChatList(
  options?: { [key: string]: any },
) {
  return request('/v1/chat/list', {
    method: 'GET',
    ...(options || {}),
  })
}

// 模版列表
export async function getTemplateList(
  options?: { [key: string]: any },
) {
  return request('/v1/tmpl/list', {
    method: 'GET',
    ...(options || {}),
  })
}

// 获取右侧文档内容
export async function getDocDetail(
  params: {
    chat_id: string
  },
  options?: { [key: string]: any },
) {
  return request('/v1/chat/document/detail', {
    method: 'GET',
    params,
    ...(options || {}),
  })
}

// 保存右侧文档内容
export async function saveDocDetail(
  data: {
    chat_id: number
    content: string
    title: string
  },
  options?: { [key: string]: any },
) {
  return request('/v1/chat/document/save', {
    method: 'POST',
    data,
    ...(options || {}),
  })
}

// chat 历史
export async function getChatHistoryList(
  params: {
    chat_id: number
    page: number
    latest_msg_id?: string
  },
  options?: { [key: string]: any },
) {
  return request('/v1/chat/history', {
    method: 'GET',
    params: {
      ...params,
      size: 10,
    },
    ...(options || {}),
  })
}

// 关闭当前 chat
export async function closeChat(
  id: string,
  options?: { [key: string]: any },
) {
  return request(`/v1/chat/close/${id}`, {
    method: 'POST',
    ...(options || {}),
  })
}

// 新建 chat
export async function createChat(
  options?: { [key: string]: any },
) {
  return request('/v1/chat/new', {
    method: 'POST',
    ...(options || {}),
  })
}

// 发送问题
export async function sendChatQuestion(
  data:{
    text: string,
    type: 'text',
    chat_id: number
  },
  options?: { [key: string]: any },
) {
  return request('/v1/chat/send_text', {
    method: 'POST',
    data,
    responseType: 'stream',
    ...(options || {}),
  })
}
