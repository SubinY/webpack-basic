// webpack.production.config.js
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: __dirname + "/app/src/index.js",//已多次提及的唯一入口文件
    output: {
        path: path.resolve(__dirname + "/build"),//打包后的文件存放的地方
        filename: "[name].js"//打包后输出文件的文件名
    },
    devtool: 'null', //注意修改了这里，这能大大压缩我们的打包代码
    devServer: {
        contentBase: "/", //本地服务器所加载的页面所在的目录
        // historyApiFallback: true, //不跳转
        // inline: true,
        // hot: true
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options: {
                            modules: true, // 指定启用css modules
                        }
                    }, {
                        loader: "postcss-loader"
                    }
                ]
            },
            {
                test: /\.scss$/,
                loader: "style-loader!css-loader!sass-loader"
            },
            {
                // 图片加载器，雷同file-loader，更适合图片，可以将较小的图片转成base64，减少http请求
                // 如下配置，将小于8192byte的图片转成base64码
                test: /\.(png|jpg|gif|ico)$/,
                loader: 'url-loader?name=./static/img/[hash].[ext]',
            }]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    require('autoprefixer') //调用 autoprefixer 插件
                ]
            }
        }),
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            title: "subin webpack",
            template: __dirname + "/app/src/index.template.html"//new 一个这个插件的实例，并传入相关的参数
        }),
        // Split  into a seperate bundle
        new webpack.optimize.CommonsChunkPlugin({
            name: 'subinHu',
            favicon: './favicon.ico',
            minChunks: function (module) {
                return module.context && module.context.indexOf('subinHu') !== -1;
            }
        }),
        new CopyWebpackPlugin([{from: path.join(__dirname, 'app/assets'), to: 'assets'}]), 
        new webpack.HotModuleReplacementPlugin(), //热加载插件
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin("style.css"),
        new CleanWebpackPlugin('build/*.*', {
            root: __dirname,
            verbose: true,
            dry: false
        })
    ],
};
