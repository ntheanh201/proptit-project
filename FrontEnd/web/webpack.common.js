const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackBar = require('webpackbar')
const StylelintPlugin = require('stylelint-webpack-plugin')

module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: '[name].[hash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          failOnError: true,
          emitError: true
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
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
      },
      {
        test: /\.(woff(2)?|ttf|eot|png|jpg|gif)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Dashboard',
      template: path.resolve(__dirname, 'src', 'index.html')
    }),
    new WebpackBar(),
    new StylelintPlugin({ emitError: true, failOnError: true })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  }
}
