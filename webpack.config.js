const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
//var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// The path to the ceisum source code
const cesiumSource = '../cesium/Source';
const cesiumWorkers = '../Build/Cesium/Workers';

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
			cesium: path.resolve(__dirname, cesiumSource)
		}
	},
	amd: {
		toUrlUndefined: true
	},
	module: {
		rules: [{
			test: /\.css$/,
			use: [ 'style-loader', 'css-loader' ]
		}, {
			test: /\.(png|gif|jpg|jpeg|svg|xml|json)$/,
            use: [ 'file-loader' ]
		}]
	},
	plugins: [
	    new HtmlWebpackPlugin({
	        template: 'src/index.html'
    	}),
    	new webpack.DefinePlugin({
  			CESIUM_BASE_URL: JSON.stringify('')
		}),
    	new CopyWebpackPlugin([ { from: path.join(cesiumSource, cesiumWorkers), to: 'Workers' } ]),
    	new CopyWebpackPlugin([ { from: path.join(cesiumSource, 'Assets'), to: 'Assets' } ]),
    	new CopyWebpackPlugin([ { from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' } ])
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