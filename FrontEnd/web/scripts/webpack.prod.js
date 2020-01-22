const webpack = require('webpack')

const provisionConfig = require('./webpack.config')

module.exports = () => {
  const outputPath = './build'
  const mode = 'production'

  const config = provisionConfig({
    mode,
    outputPath
  })

  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env.SERVER_URL': JSON.stringify(process.env.SERVER_URL)
    })
  )

  return config
}
