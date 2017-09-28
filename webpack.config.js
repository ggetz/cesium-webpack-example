const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const workerConfig = require('./workers.webpack.config');

module.exports = [{
	context: __dirname,
	entry: {
		app: './src/index.js'
	},
	output: {
		filename: '[name].js',
		chunkFilename : '[name].js',
		path: path.resolve(__dirname, 'dist'),
		sourcePrefix: '' // Needed by Cesium for multiline strings
	},
	resolve: {
		alias: {
			cesium: path.resolve(__dirname, '../cesium/Source'),
			Workers: path.resolve(__dirname, './dist'),
		},
		modules: [ 
			'node_modules'
		]
	},
	module: {
		rules: [
		{
			test: /\.css$/,
			use: [ 'style-loader', 'css-loader' ]
		}, {
			test: /\.(png|gif|jpg|jpeg|svg|xml|json)$/,
            use: [ 'file-loader' ]
		}, {
			test: /\.js$/,
			include: [
				path.resolve(__dirname, "./dist")
			],
			use: [ 'worker-loader' ]
		}
		]
	},
	plugins: [
	    new HtmlWebpackPlugin({
	        template: 'public/index.html'
    	})
    ],
	// development server options
	devServer: {
		contentBase: './dist'
	},
	devtool: 'eval',

	// Cesium additional configurations
	node: {
       fs: "empty"
    }
}];