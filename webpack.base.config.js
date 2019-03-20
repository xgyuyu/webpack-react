let path = require('path')
let webpack = require('webpack')
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
let lessExtract = new ExtractTextWebpackPlugin('css/less.css')
let cssExtract = new ExtractTextWebpackPlugin('css/css.css')
const HappyPack = require('happypack')
const cpuCount = require('os').cpus().length
const happyPackPool = HappyPack.ThreadPool({
    size: cpuCount - 1
})

module.exports = {
    entry: {
        index: ['./src/entry.jsx'],
    },
    /* output: {
        path: path.resolve('./dist'),
        // 加上哈希值 就是[hash:8].
        filename: 'bundle.js'
    }, */
    resolve: {
        // modules: ['node_modules', 'lib'],
        alias: {
            'rrc-loader-helper/lib/reducer-decorate': path.join(__dirname, 'src', 'decorate')
        },
        extensions: ['.js', '.jsx', 'css', '.json'],
    },
    externals: {
        lodash: 'window._',
        react: 'window.React',
        'react-dom': 'window.ReactDOM',
        antd: 'window.antd',
        moment: 'window.moment',
        'babel-polyfill': 'undefined',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'eslint-loader',
                    options: {
                        formatter: require('eslint-friendly-formatter')
                    }
                },
                enforce: 'pre',
                exclude: /node_modules/,
                include: [__dirname + '/src'],
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: [
                    'happypack/loader?id=js',
                    {
                        loader: 'react-redux-component-loader',
                        options: {
                            externals: ['navigation', 'user/login'],
                            lazy: true,
                            loading: 'Loading',
                            reducerName: 'reducers',
                            componentDir: 'components',
                            reducerDecorator: 'reducerDecorator',
                          },
                    }
                ],
              },
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                },
                exclude: /node_modules/,
                include: /node_modules\/rrc-loader-helper\/src/,
            },
            {
                test: /component\/([^/]+\/)*type[s]?.js$/,
                exclude: /node_modules/,
                loaders: ['react-redux-types-loader'],
            },
            {
                test: /\/me\.json$/,
                use: [
                    'babel-loader',
                    {
                        loader: 'react-redux-component-loader',
                        options: {
                            bundle: true,
                            reducerName: 'reducers',
                        },
                    }
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.ejs$/,
                use: ['ejs-loader'],
            },
            {
                test: /\.css$/,
                use: cssExtract.extract({
                    use: [{
                        loader: 'css-loader'
                    }]
                })
            },
            {
                test: /\.less$/,
                use: lessExtract.extract({
                    use: [{
                            loader: 'css-loader'
                        },
                        {
                            loader: 'less-loader'
                        }
                    ]
                })
            },
            {
              test: /\.(png|jpg|jpeg|gif|eot|svg|ttf|woff)$/,
              use: ['file-loader?name=[hash:base64:7].[ext]'],
            }
        ]
    },
    plugins: [
        lessExtract,
        cssExtract,
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HappyPack({
            id: 'js',
            threadPool: happyPackPool,
            loaders: ['babel-loader?cacheDirectory=true'],
        }),
        new HappyPack({
            id: 'styles',
            threadPool: happyPackPool,
            loaders: ['style-loader',
                'css-loader?modules&importLoaders=1&localIdentName=[path]__[local]-[hash:base64:5]',
                'postcss-loader',
            ],
        }),

    ],
}