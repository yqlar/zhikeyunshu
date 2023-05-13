import {defineConfig} from '@umijs/max'

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {
    dataField: 'data'
  },
  title: '智客云数AI助手',
  lessLoader: {
    modifyVars: {
      // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
      // 引入全局 less 变量
      hack: `true; @import "@/assets/less/variables.less";`,
    },
  },
  routes: [
    {
      path: '/',
      name: '首页',
      layout: '@/layouts/index',
      component: '@/pages/Home/index',
    },
    {
      path: '/chat',
      name: '对话',
      layout: '@/layouts/index',
      component: '@/pages/Chat/index',
    },
    {
      path: '/chat-history',
      name: '对话历史',
      layout: '@/layouts/index',
      component: '@/pages/ChatHistory/index',
    },
  ],
  npmClient: 'yarn',
  proxy: {
    '/api': {
      'target': 'https://mini.vcode.me/',
      'changeOrigin': true,
      'pathRewrite': { '^/api' : '' },
    },
  },
})

