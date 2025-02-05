const path = require('path')

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // 查找 sass-loader 规则，这里也可以根据实际情况修改查找逻辑
      const sassRule = webpackConfig.module.rules.find((rule) => rule.oneOf)
      if (sassRule) {
        const lessRule = {
          test: /\.less$/,
          use: ['style-loader', 'css-loader', 'less-loader'],
        }
        sassRule.oneOf.unshift(lessRule)
      }
      return webpackConfig
    },
  },
}
