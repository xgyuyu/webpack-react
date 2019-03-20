const path = require('path')
const webpack = require('webpack')
const config = require('./webpack.base.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

module.exports = Object.assign({}, config, {
    output: {
        /* path: path.resolve('./dist'),
        // 加上哈希值 就是[hash:8].
        filename: 'bundle.js' */
        path: path.resolve(__dirname, 'bundle'),
        filename: '[name][hash:8].js',
        chunkFilename: '[name][hash:8].js',
        publicPath: '/'
    },
    plugins: [
        new FriendlyErrorsPlugin(),
        ...config.plugins,
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
                BASE_URI: JSON.stringify('/'),
            }
        }),
        new HtmlWebpackPlugin({
            template: './index.ejs',
            filename: './index.html',
            cache: true
          })
      
    ],
    devServer: {
        host: '0.0.0.0',
        contentBase: [path.join(__dirname, './')],
        port: 8081,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        proxy: {
            '/': {
                target: 'http://www.lingtianadmin.org/',
                // pathRewrite: { '^/mpphp': '' },
                secure: false,
                changeOrigin: true
            }
        },
    },
    mode: 'development'
})