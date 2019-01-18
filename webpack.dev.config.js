let path = require('path')
let config = require('./webpack.base.config')
let FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

module.exports = Object.assign({}, config, {
    plugins: [
        new FriendlyErrorsPlugin(),
        ...config.plugins
    ],
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        port: 3003,
        overlay: true, // 编译出现错误时，将错误直接显示在页面上
        compress: true, // 服务器压缩
        open: true, // 自动打开浏览器
        hot: true, // 热更新
        quiet: true // 终端输出的只有初始启动信息。 webpack 的警告和错误是不输出到终端的,配合FriendlyErrorsPlugin
        // proxy:{} // url代理
    },
    mode: 'development'
})