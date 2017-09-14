const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	context: __dirname,
	entry: [
		'./src/index.js'
	],
	output: {
		filename: 'app.bundle.js',
		path: path.resolve(__dirname, 'dist'),
		sourcePrefix: '' // Needed by Cesium for multiline strings
	},
	resolve: {
		alias: {
			cesium: path.resolve(__dirname, '../cesium/Source')
		}
	},
	module: {
		rules: [
		{
			test: /\.css$/,
			use: [ 'style-loader', 'css-loader' ]
		}, {
			test: /\.(png|gif|jpg|jpeg|svg|xml)$/,
            use: [ 'file-loader' ]
		}, {
			test: /\.glsl$/,
            loader: 'webpack-glsl-loader'
		}, {
			test: /\.js$/,
			include: [
	          path.resolve(__dirname, "../cesium/Source/Workers")
	        ],
	        exclude: [
	          path.resolve(__dirname, "../cesium/Source/Workers/cesiumWorkerBootstrapper.js"),
	          //path.resolve(__dirname, "../cesium/Source/Workers/transferTypedArrayTest.js"),
	          //path.resolve(__dirname, "../cesium/Source/Workers/createTaskProcessorWorker.js")
	        ],
			use: [ 'worker-loader' ]
		}
		]
	},
	plugins: [
	    new HtmlWebpackPlugin({
	        template: 'dist/index.html'
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
};