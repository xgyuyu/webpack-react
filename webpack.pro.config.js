const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const config = require('./webpack.base.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = Object.assign({}, config, {
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash:8].js',
        chunkFilename: '[name].[hash:8].js',
        publicPath: 'dist/',
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        ...config.plugins,
        new HtmlWebpackPlugin({
            template: './index.ejs',
            filename: '../index.html',
            publicPath: 'dist/'
        }),
    ],
    mode: 'production'
})