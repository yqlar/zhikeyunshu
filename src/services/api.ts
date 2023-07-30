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
    chat_id: number
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

// // 发送问题
// export async function sendChatQuestion(
//   data:{
//     text: string,
//     type: 'text',
//     chat_id: number
//   },
//   options?: { [key: string]: any },
// ) {
//   return request('/v1/chat/send_text', {
//     method: 'POST',
//     data,
//     responseType: 'stream',
//     ...(options || {}),
//   })
// }

// 推出登录
export async function userLogout(
  options?: { [key: string]: any },
) {
  return request('/v1/user/logout', {
    method: 'POST',
    ...(options || {}),
  })
}

// 生成问题 title
export async function genTitle(
  data: {
    chat_id: number
  },
  options?: { [key: string]: any },
) {
  return request('/v1/chat/gen_title', {
    method: 'POST',
    data,
    ...(options || {}),
  })
}

// 生成自定义模版
export async function createTemplate(
  data: {
    title: string
    content: string
  },
  options?: { [key: string]: any },
) {
  return request('/v1/tmpl/custom/create', {
    method: 'POST',
    data,
    ...(options || {}),
  })
}

// 修改自定义模版
export async function updateCustomTemplate(
  data: {
    detail_id: number
    title: string
    content: string
  },
  options?: { [key: string]: any },
) {
  return request('/v1/tmpl/custom/update', {
    method: 'POST',
    data,
    ...(options || {}),
  })
}

// 删除自定义模版
export async function delCustomTemplate(
  id,
  options?: { [key: string]: any },
) {
  return request(`/v1/tmpl/custom/delete?detail_id=${id}`, {
    method: 'POST',
    ...(options || {}),
  })
}

// 继续对话
export async function continueChat(
  data: {
    chat_id: number
  },
  options?: { [key: string]: any },
) {
  return request('/v1/chat/send_text/continue', {
    method: 'POST',
    data,
    ...(options || {}),
  })
}

// 获取支付二维码
export async function getVipPriceQrCode(
    params: {
      product_type: string
  },
  options?: { [key: string]: any },
) {
  return request('/v1/pay/asset/paid/unite/product', {
    method: 'GET',
    params,
    ...(options || {}),
  })
}

// 轮训支付状态
export async function checkWeChatPaymentStatus(
    params: {
      trade_no: string
  },
  options?: { [key: string]: any },
) {

  return request('/v1/pay/asset/paid/unite/scan_callback', {
    method: 'GET',
    params,
    ...(options || {}),
  })
}

// 移动端获取微信 access_token
export async function getAccessToken(
    params: {
      code: string
    },
    options?: { [key: string]: any },
) {
  return request('/v1/pay/asset/paid/product', {
    method: 'GET',
    params,
    ...(options || {}),
  })
}


// 移动端支付
export async function mobilePay(
    params: {
      product_type: string
      token: string
      channel: string
  },
  options?: { [key: string]: any },
) {
  return request('/v1/pay/asset/paid/product', {
    method: 'GET',
    params,
    ...(options || {}),
  })
}
