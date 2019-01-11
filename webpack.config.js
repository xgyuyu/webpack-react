let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin')
let webpack = require('webpack')

module.exports = {
    entry: __dirname + '/src/index.js',
    output: {
        // 指明编译好的文件所在目录
        path: path.resolve('./dist'),
        // 加上哈希值 就是[hash:8].
        filename: 'bundle.js'
    },
    // 模块配置
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            use: {
                loader: 'babel-loader'
            },
            exclude: /node_modules/
        }]
    },
    // 插件配置
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // 打包html插件
        // 如果先清空build在进行打包
        // new CleanWebpackPlugin(['./dist']),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './dist/index.html'), // 指定模板
            title: '我是标题', // 设置打包后的html的标题
            hash: true,
            inject: true,
            minify:{
                removeAttributeQuotes:true,// 让html去除双引号
                collapseWhitespace:true // 去除空格html都在一行
            }
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        port: 3000,
        compress: true, // 服务器压缩
        open: true, // 自动打开浏览器
        hot: true // 热更新
    },
    mode: 'development', // 更改生产模式
    resolve: {} // 配置解析
}