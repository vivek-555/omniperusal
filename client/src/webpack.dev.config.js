'use strict';

var path = require('path');
var webpack = require('webpack');
var config = require('./webpack.base.config.js');
var update = require('react/lib/update');
var ExportFilesWebpackPlugin = require('export-files-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

if(process.env.NODE_ENV !== 'test') {
    config = update(config, {
        entry: {
            $set: [
                // 'webpack-dist-server/client?http://localhost:3000',
                // 'webpack/hot/dist-server',
                './src/entry'
            ]
        }
    });
}

config = update(config, {
    debug: {
        $set: true
    },
    profile: {
        $set: true
    },
    // devtool: {$set: 'eval-source-map'}, // this is causing warnings in the browser
    devtool: {
        $set: '#cheap-module-eval-source-map'
    },
    output: {
        $set: {
            path: path.join(process.cwd(), '/dist/'),
            pathInfo: true,
            publicPath: 'http://localhost:3000/',
            filename: 'main.js'
        }
    },
    plugins: {
        $push: [
            new webpack.HotModuleReplacementPlugin(),
            new HtmlWebpackPlugin({
                inject: true,
                filename: 'index.html',
                template: 'src/views/index.tpl'
            }),
            new ExportFilesWebpackPlugin('../dist/index.html')
        ]
    },
    module: {
        loaders: {
            $push: [
                {
                    test: /\.less$/,
                    loaders: [
                        'style-loader',
                        'css-loader',
                        'less-loader'
                    ]
                },
                {
                    test: /\.jsx?$/,
                    loaders: ['babel'],
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/,
                    loaders: [
                        'style-loader',
                        'css-loader',
                    ]
                },
                {
                    test: /\.(jpe?g|png|gif)$/i,
                    loaders: [
                        'file?hash=sha512&digest=hex&name=[hash].[ext]',
                        'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                    ]
                }
            ]
        }
    },
    devServer: {
        $set: {
            publicPath: '/',
            port: 3000,
            contentBase: './dist',
            inline: true,
            hot: true,
            stats: {
                colors: true
            },
            historyApiFallback: true,
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:5000',
                'Access-Control-Allow-Headers': 'X-Requested-With'
            },
            proxy: {
                '/api/*': 'http://localhost:8000'
            }
        }
    }
});

module.exports = config;