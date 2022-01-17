const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://mook-boilerplate.herokuapp.com',
      secure: false,
      changeOrigin: true,
    })
  );
};
