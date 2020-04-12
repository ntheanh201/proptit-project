const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = ({ mode, outputPath }) => {
  return {
    mode,
    entry: './src/index.tsx',
    output: {
      path: path.resolve(process.cwd(), outputPath),
      filename: '[name].[hash:8].js'
    },
    resolve: {
      alias: {
        ui: path.resolve(process.cwd(), 'src', 'packages', 'ui'),
        base: path.resolve(process.cwd(), 'src', 'packages', 'base'),
        layout: path.resolve(process.cwd(), 'src', 'packages', 'layout'),
        core: path.resolve(process.cwd(), 'src', 'packages', 'core'),
        service: path.resolve(process.cwd(), 'src', 'packages', 'service'),
        environments: path.resolve(process.cwd(), 'src', 'environments')
      },
      extensions: ['.ts', '.tsx', '.js']
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'awesome-typescript-loader'
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: './src/index.html'
      })
    ],
    devServer: {
      compress: true,
      clientLogLevel: 'none',
      contentBase: './public',
      overlay: true,
      hot: false,
      port: 8123,
      quiet: true,
      host: '0.0.0.0',
      disableHostCheck: true,
      historyApiFallback: true,
      watchOptions: {
        ignored: /node_modules/
      }
    }
  }
}
