//webpack.config.js
var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry:'./example/index.js',
    output:{
        path:path.resolve(__dirname, './dist/'),
        filename:'build.js'
    },
    //设置开发者工具的端口号,不设置则默认为8080端口
    devServer: {
        inline: true,
        port: 8181,
    },
    module:{
        loaders:[
            {
                test:/\.js?$/,
                exclude:/node_modules/,
                loader:'babel-loader',
                query:{
                    presets:['es2015']
                }
            },
            {
                test:/\.css$/,
                loader:'style-loader!css-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
          filename: 'index.html',
          template: './example/index.html',
          inject: true
        }),
    ]
};