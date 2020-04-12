const provisionConfig = require('./webpack.config')

module.exports = () => {
  const outputPath = './public'
  const mode = 'development'

  const config = provisionConfig({
    mode,
    outputPath
  })

  return config
}
