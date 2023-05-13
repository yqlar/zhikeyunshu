// const request = require('request');
//
// module.exports = (req, res) => {
//   let prefix = "/api"
//   if (!req.url.startsWith(prefix)) {
//     return;
//   }
//   let target = "https://mini.vcode.me" + req.url.substring(prefix.length);
//
//   var options = {
//     'url': target,
//   }
//   request(options, function (error, response) {
//     if (error) throw new Error(error);
//     res.write(response.body);
//     res.end();
//   });
// }

// 该服务为 vercel serve跨域处理
const {
  createProxyMiddleware
} = require('http-proxy-middleware')

module.exports = (req, res) => {
  let target = ''

  if (req.url.startsWith('/api')) {
    target = 'https://mini.vcode.me'
  }
  // 创建代理对象并转发请求
  createProxyMiddleware({
    compress: true,
    target,
    changeOrigin: true,
    pathRewrite: {
      // 通过路径重写，去除请求路径中的 `/backend`
      // 例如 /backend/user/login 将被转发到 http://backend-api.com/user/login
      '^/api/': '/'
    }
  })(req, res)
}
