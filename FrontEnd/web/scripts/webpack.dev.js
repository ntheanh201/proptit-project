const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const provisionConfig = require('./webpack.config')

module.exports = () => {
  const outputPath = './public'
  const mode = 'development'

  const config = provisionConfig({
    mode,
    outputPath
  })

  config.plugins.push(
    new BundleAnalyzerPlugin({
      openAnalyzer: false // open on :8888
    })
  )

  return config
}
