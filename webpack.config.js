var path = require('path');
var html = require('html-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	devServer: {
		port: 4000,
		contentBase: './dist'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index.js'	
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|dist)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react']	
					}
				}
			},
			{
				test: /\.css$/,
				exclude: /(node_modules|dist)/,
				use: ['style-loader', 'css-loader']
			}
		]
	},
	plugins: [new html({
		inject: 'body',
		template: 'src/index.ejs'
	})]
};