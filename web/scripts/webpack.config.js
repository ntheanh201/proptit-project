const path = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')

module.exports = ({ mode, outputPath }) => {
  return {
    mode,
    context: path.resolve(process.cwd(), './src'),
    entry: ['babel-polyfill', './index.js'],
    output: {
      path: path.resolve(process.cwd(), outputPath),
      filename: '[name].[hash:8].js'
      // publicPath: path.resolve(process.cwd(), outputPath)
    },
    resolve: {
      alias: {
        ui: path.resolve(process.cwd(), 'src', 'packages', 'ui'),
        layout: path.resolve(process.cwd(), 'src', 'packages', 'layout'),
        core: path.resolve(process.cwd(), 'src', 'packages', 'core'),
        helpers: path.resolve(process.cwd(), 'src', 'packages', 'helpers'),
        environments: path.resolve(process.cwd(), 'src', 'environments')
      },
      mainFields: ['browser', 'main', 'module'],
      extensions: ['.js', '.json', '.jsx']
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        },
        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map-loader'
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: 'raw-loader'
            }
          ]
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader'
            }
          ]
        },
        {
          exclude: [
            /\.html$/,
            /\.(js|jsx|mjs)$/,
            /\.css$/,
            /\.json$/,
            /\.svg$/,
            /\.(graphql|gql)$/,
            /particles\.js/
          ],
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10000,
                name: 'static/media/[name].[hash:8].[ext]'
              }
            }
          ]
        }
      ]
    },
    node: {
      fs: 'empty'
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        inject: true,
        template: './index.html'
      }),
      new CaseSensitivePathsPlugin()
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
