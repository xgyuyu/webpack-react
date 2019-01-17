let path = require('path')
let config = require('./webpack.base.config')

module.exports = Object.assign({}, config, {
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        port: 3003,
        overlay: true,
        compress: true, // 服务器压缩
        open: true, // 自动打开浏览器
        hot: true // 热更新
    },
    mode: 'development'
})