const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname); // 项目根目录
const APP_PATH = path.resolve(ROOT_PATH, 'src'); // 项目代码根目录
const APP_FILE = path.resolve(APP_PATH, 'pages/index.jsx'); // 入口文件index.jsx
const BUILD_PATH = path.resolve(ROOT_PATH, './build'); // build生成文件所在目录
const PUBLIC_PATH = path.resolve(APP_PATH, 'public'); // 项目公共资源目录，主要是模版中引入的css和js
const TEMPLATE_PATH = path.resolve(APP_PATH, 'template'); // 项目模版目录，目前主要包括index.html和test.html

const isProduction = process.env.NODE_ENV === 'production';
const isOnline = process.env.MODE === 'online' || process.env.mode === 'online';
const isOffline = process.env.MODE === 'offline' || process.env.mode === 'offline';
const isAuth = !(process.env.MODE === 'noauth' || process.env.mode === 'noauth');

module.exports = {
    entry: {
        app: APP_FILE,
        live: path.resolve(APP_PATH, 'pages/live.jsx'),
        question: path.resolve(APP_PATH, 'pages/question.jsx'),
        rank: path.resolve(APP_PATH, 'pages/rank.jsx'),
    },
    output: {
        path: BUILD_PATH, // build生成文件所在目录
        filename: '[name].js', // 打包的js文件名
    },
    module: {
        rules: [{
            test: /\.(jsx|js)?$/,
            include: [APP_PATH],
            exclude: /node_modules/,
            loader: 'babel-loader',
        }, {
            test: /\.less$/,
            // include: [APP_PATH],
            // exclude: /node_modules/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'postcss-loader', 'less-loader'],
            }),
        }, {
            test: /\.css$/,
            // include: [APP_PATH],
            // exclude: /node_modules/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader',
            }),
        }, {
            test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
            exclude: /^node_modules$/,
            loader: 'file-loader?name=[name].[ext]',
            include: [APP_PATH],
        }],
    },
    plugins: [
        // 定义环境变量为开发环境
        new webpack.DefinePlugin({
            IS_PRODUCTION: isProduction,
            IS_DEVELOPMENT: !isProduction,
            IS_ONLINE: isOnline,
            IS_OFFLINE: isOffline,
            IS_AUTH: isAuth,
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'common.js', //
        }),
        new ExtractTextPlugin('[name].css'),
        new HtmlWebpackPlugin({
            filename: path.resolve(BUILD_PATH, 'index.html'),
            template: path.resolve(TEMPLATE_PATH, 'index.html'), // html模板路径
            chunks: ['common', 'app'],
            hash: true,
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve(BUILD_PATH, 'live.html'),
            template: path.resolve(TEMPLATE_PATH, 'index.html'), // html模板路径
            chunks: ['common', 'live'],
            hash: true,
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve(BUILD_PATH, 'question.html'),
            template: path.resolve(TEMPLATE_PATH, 'index.html'), // html模板路径
            chunks: ['common', 'question'],
            hash: true,
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve(BUILD_PATH, 'rank.html'),
            template: path.resolve(TEMPLATE_PATH, 'index.html'), // html模板路径
            chunks: ['common', 'rank'],
            hash: true,
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve(BUILD_PATH, 'app.debug.html'),
            template: path.resolve(TEMPLATE_PATH, 'debug.html'), // html模板路径
            chunks: ['common', 'app'],
            hash: true,
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve(BUILD_PATH, 'live.debug.html'),
            template: path.resolve(TEMPLATE_PATH, 'debug.html'), // html模板路径
            chunks: ['common', 'live'],
            hash: true,
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve(BUILD_PATH, 'question.debug.html'),
            template: path.resolve(TEMPLATE_PATH, 'debug.html'), // html模板路径
            chunks: ['common', 'question'],
            hash: true,
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve(BUILD_PATH, 'rank.debug.html'),
            template: path.resolve(TEMPLATE_PATH, 'debug.html'), // html模板路径
            chunks: ['common', 'rank'],
            hash: true,
        }),
        new CopyWebpackPlugin([{ // 将文件一个目录复制到另一个目录
            from: PUBLIC_PATH,
            to: BUILD_PATH,
        }]),
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.less', '.css'], // import引入文件，后缀名自动补全
        alias: {
            webim: path.resolve(__dirname, './src/util/webim/'),
        },
    },
};
