const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

var cesiumSource = path.resolve(__dirname, '../cesium/Source');

module.exports = {
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
			cesium: cesiumSource,
			Workers: path.resolve(cesiumSource, '/Workers')
		},
		modules: [ 'node_modules' ]
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
			include: [
				path.resolve(cesiumSource, "/Workers/cesiumWorkerBootstrapper.js"),
				path.resolve(cesiumSource, "/Workers/transferTypedArrayTest.js")
			],
			use: [ 'worker-loader' ]
		}
		]
	},
	plugins: [
	    new HtmlWebpackPlugin({
	        template: 'dist/index.html'
    	})
    	//new BundleAnalyzerPlugin()
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
};