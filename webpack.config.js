const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    entry: './src/client/index.js',
    mode: "development",
    module:{
        rules:[
            {
                test: /\.js$|\.jsx$/,
                include: [path.resolve(__dirname,'src')],
                exclude: /node_modules/,
                use:{
                    loader: 'babel-loader'
                }
            },
            {
            test: /\.html$/,use:[
                {loader: 'html-loader'}
            ]},
            {
                test: /\.css$/i, 
                use:[
                    "style-loader", "css-loader"                 ]
            },
            {
                test: /\.(svg|png)$/,
                use:[
                    {
                        loader: 'svg-url-loader',
                        options: {
                            limit: 10000,
                        }
                    }
                ]
            }
        ]
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname,'dist')
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    }
    ,
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: "./index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),
    ],
    devServer: {
        static: {
          directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9000,
        historyApiFallback: true,
      },
}