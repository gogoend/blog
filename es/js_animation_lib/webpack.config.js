const path = require('path');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const EsmWebpackPlugin = require("@purtuga/esm-webpack-plugin");

module.exports = [{
    entry: './src/anikyu.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'anikyu.js',
        library: 'Anikyu',
        libraryTarget: 'umd',
        libraryExport: 'default'
    },
    mode: 'production',
    optimization:{
        minimize: false
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
        ],
    },
},{
    entry: './src/anikyu.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'anikyu.min.js',
        library: 'Anikyu',
        libraryTarget: 'umd',
        libraryExport: 'default'
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
        ],
    },
},{
    entry: './src/anikyu.js',
    plugins:[
        new EsmWebpackPlugin()
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'anikyu.esm.js',
        library: 'Anikyu',
        libraryTarget: 'var',
    },
    mode: 'production',
    optimization:{
        minimize: false
    }
},{
    entry: './src/anikyu.js',
    plugins:[
        new EsmWebpackPlugin()
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'anikyu.esm.min.js',
        library: 'Anikyu',
        libraryTarget: 'var',
    },
    mode: 'production'
}];