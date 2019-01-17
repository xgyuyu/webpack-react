let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let CleanWebpackPlugin = require('clean-webpack-plugin')
let config = require('./webpack.base.config')

module.exports = Object.assign({}, config, {
    plugins: [
        new CleanWebpackPlugin(['dist']),
        ...config.plugins
    ],
    mode: 'production'
})