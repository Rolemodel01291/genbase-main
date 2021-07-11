const withAntdLess = require('next-plugin-antd-less');

module.exports = withAntdLess({
  webpack(config) {
    return config;
  },
  env: {
    CORPSEC_API_URL: process.env.CORPSEC_API_URL,
    PREST_TOKEN: process.env.PREST_TOKEN,
    PREST_API_URL: process.env.PREST_API_URL,
    PREST_BATCH_API_URL: process.env.PREST_BATCH_API_URL
  }
});
