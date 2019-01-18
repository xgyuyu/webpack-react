let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
// let CleanWebpackPlugin = require('clean-webpack-plugin')
let webpack = require('webpack')
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
// extract-text-webpack-plugin目前版本不支持webpack4。下载测试版
// 如果分开抽离
let lessExtract = new ExtractTextWebpackPlugin('css/less.css')
let cssExtract = new ExtractTextWebpackPlugin('css/css.css')


// 公用方法配置文件目录
function resolve(dir) {
    // join方法用于将多个字符串结合成一个路径字符串
    // __dirname：获取当前文件所在目录的完整绝对路径
    return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: __dirname + '/src/index.js',
    output: {
        // 指明编译好的文件所在目录
        path: path.resolve('./dist'),
        // 加上哈希值 就是[hash:8].
        filename: 'bundle.js'
    },
    // 文件解析
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.less', '.css'], // 自动解析确定的拓展名,使导入模块时不带拓展名
        alias: { // 创建import或require的别名,让其自动解析确定的扩展,在引入模块时不带扩展名
            '@': resolve('src')
        }
    },
    // 模块配置
    module: {
        rules: [{
                test: /\.js$/,
                use: {
                    loader: 'eslint-loader',
                    options: {
                        formatter: require('eslint-friendly-formatter') // 默认的错误提示方式
                    }
                },
                enforce: 'pre', // 编译前检查
                exclude: /node_modules/, // 不检测的文件
                include: [__dirname + '/src'], // 要检查的目录
            },
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader'
                },
                exclude: /node_modules/, // 不检测的文件
            },
            // 从右往左写
            {
                test: /\.css$/,
                // use用数组写方便传参数
                // 例如:{loader:'style-loader',options:'a'},
                // 用插件抽离样式(不需要用style-loader)
                use: cssExtract.extract({
                    use: [{
                        loader: 'css-loader'
                    }]
                })
                /* use:[
                    {loader:'style-loader'},
                    {loader:'css-loader'}
                ] */
            },
            {
                test: /\.less$/,
                // use用数组写方便传参数
                // 例如:{loader:'style-loader',options:'a'},
                use: lessExtract.extract({
                    use: [{
                            loader: 'css-loader'
                        },
                        {
                            loader: 'less-loader'
                        }
                    ]
                })
                /* use:[
                    {loader:'style-loader'},
                    {loader:'css-loader'},
                    {loader:'less-loader'}
                ] */
            }
        ]
    },
    // 插件配置
    plugins: [
        /* // 抽离为一个css 
        new ExtractTextWebpackPlugin({
            filename: 'css/index.css'
        }), */
        // 分开抽离
        lessExtract,
        cssExtract,
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(), // 跳过编译时出错的代码并记录，使编译后运行时的包不会发生错误
        /* new webpack.DefinePlugin({
            '_ABC_': false // 定义全局常量!常量!常量!
        }) */
        // 打包html插件
        // 如果先清空build在进行打包
        // new CleanWebpackPlugin(['./dist']),
        new HtmlWebpackPlugin({
            template: './index.html', // 指定模板
            title: '我是标题', // 设置打包后的html的标题
            // hash: true,
            inject: true,
            minify: {
                removeAttributeQuotes: true, // 让html去除双引号
                collapseWhitespace: true // 去除空格html都在一行
            }
        })
    ],
    /* devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        port: 3003,
        overlay: true,
        compress: true, // 服务器压缩
        open: true, // 自动打开浏览器
        hot: true // 热更新
    },
    mode: 'development' // 更改生产模式 */
}