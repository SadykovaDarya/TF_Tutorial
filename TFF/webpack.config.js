const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CSPWebpackPlugin = require('csp-webpack-plugin');
const webpack = require('webpack');


module.exports = {
    mode: 'development',
    entry: './src/index.js',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist', 
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Development'
        }), 
        new CSPWebpackPlugin({
            'object-src': '\'none\'',
            'base-uri': '\'self\'',
            'script-src': ['\'unsafe-inline\'', '\'self\'', '\'unsafe-eval\'', 'http://ajax.googleapis.com', 'http://www.google.com'],
            'worker-src': ['\'self\'', 'blob:']
        })
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'), 
        publicPath: '/'
    }, 
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: [
               'style-loader',
               'css-loader'
                ]
            }, 
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }, 
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }, 
            {
                test: /\.(csv|tsv)$/,
                use: [
                    'csv-loader'
                ]
            },
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            }
        ]
    }, 
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
};