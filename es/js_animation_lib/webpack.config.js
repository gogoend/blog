const path = require('path');

module.exports = {
    entry: './src/anikyu.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'anikyu.js',
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
        ],
    },
    devtool: 'source-map',
};