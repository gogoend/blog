const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [{
	entry: {
		buildWithCommonjs: path.resolve(__dirname, '../../../commonjs/copy-or-reference/entry.js'),
		buildWithEsm: path.resolve(__dirname, '../../../esm/copy-or-reference/entry.mjs')
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundle.js',
		chunkFilename: '[name].chunk.js' // 指定非入口js文件的名称
	},
	mode: 'production',
	optimization: {
		minimize: false,
		concatenateModules: false,
		splitChunks: {
			chunks: 'all'
		}
	}
}]

