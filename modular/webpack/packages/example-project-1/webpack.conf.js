const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const GogoendHelloWorldPlugin = require('@gogoend-demo/hello-world-plugin');

module.exports = [{
	entry: {
		index: './src/index.js'
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
	},
	module: {
		rules: [{
			test: /\.png$/,
			use: [
				// {
				// 	loader: 'raw-loader'
				// },
				{
					loader: 'file-loader',
					options: {
						name(file) {
							if (process.env.NODE_ENV === 'development') {
								return '[path][name].[ext]';
							}

							return '[hash].[ext]';
						},
					},
				},
			],
		}],
	},
	plugins: [
		new CleanWebpackPlugin(),
		// https://github.com/ampedandwired/html-webpack-plugin
		new HtmlWebpackPlugin({
			filename: './index.html',
			template: './src/public/index.template.html',
			inject: true
		}),
		new GogoendHelloWorldPlugin()
	],
}]

