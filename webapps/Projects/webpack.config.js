'use strict';

const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

process.env.NODE_ENV = 'production';

const basePlugins = [
    new webpack.DefinePlugin({
        __DEV__: process.env.NODE_ENV !== 'production',
        __PRODUCTION__: process.env.NODE_ENV === 'production',
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    /*new HtmlWebpackPlugin({
        template: './src/index.html',
        inject: 'body',
        minify: false
    }),*/
    new webpack.NoErrorsPlugin()
];

const devPlugins = [];

const prodPlugins = [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        mangle: false,
        comments: false,
        compress: {
            warnings: false
        }
    }),
    // new CompressionPlugin({
    //     asset: 'vendor.js.gz',
    //     algorithm: 'gzip',
    //     regExp: /\.js$|\.html|\.css|.map$/,
    //     threshold: 10240,
    //     minRatio: 0.8
    // })
];

const plugins = basePlugins
    .concat(process.env.NODE_ENV === 'production' ? prodPlugins : [])
    .concat(process.env.NODE_ENV !== 'production' ? devPlugins : []);

module.exports = {

    devtool: process.env.NODE_ENV !== 'production' ? 'inline-source-map' : '',

    entry: {
        app: './app/main.ts',
        vendor: [
            'es6-shim',
            'reflect-metadata',

            '@angular/common',
            '@angular/compiler',
            '@angular/core',
            '@angular/http',
            '@angular/platform-browser',
            '@angular/platform-browser-dynamic',
            '@angular/router',
            '@angular/upgrade',

            'zone.js',
            'moment',
            'ng2-translate'
        ]
    },

    output: {
        path: path.resolve(__dirname, 'js'),
        filename: 'bundle.js',
        publicPath: '/js/'
    },

    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },

    plugins: plugins,

    module: {
        loaders: [{
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            }, {
                test: /\.html$/,
                loader: 'raw'
            },
            /*{ test: /\.css$/, loader: 'style-loader!css-loader?sourceMap' },
            { test: /\.svg/, loader: 'url' },
            { test: /\.eot/, loader: 'url' },
            { test: /\.woff/, loader: 'url' },
            { test: /\.woff2/, loader: 'url' },
            { test: /\.ttf/, loader: 'url' },*/
        ],
        noParse: [/zone\.js\/dist\/.+/]
    }
}
