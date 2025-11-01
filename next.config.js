const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://manage.digirdp.com/includes/api.php/:path*',
      },
    ];
  },
};