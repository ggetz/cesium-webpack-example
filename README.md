# cesium-webpack-example

The minimal recommended setup for an application using [Cesium](https://cesiumjs.org/) with [Webpack](https://webpack.js.org/concepts/).

### Running this example app

	npm install
	npm start

### Creating an new app with Webpack and Cesium

1. Initialize an app

	npm init -y

2. Install cesium, webpack, and the webpack dev server

	npm install --save-dev cesium webpack webpack-dev-server

3. Install the necessary webpack loaders

	npm install --save-dev style-loader css-loader file-loader worker-loader

4. Install webpack plugins

	npm install --save-dev html-webpack-plugin

5. Add `webpack.config.js` with your configuration

6. Require Cesium in your application
 
 * CommonJS Require

 	var Cesium = require('cesium/Cesium');
 	var viewer = new Cesium.Viewer('cesiumContainer');

 * ES6 Style Import

 	import Cesium from 'cesium/Cesium';
 	var viewer = new Cesium.Viewer('cesiumContainer');
 
 * Require asset files

 	require('cesium/Widgets/widgets.css');

7. Build or run the app
 
 * Build a bundle with webpack

 	webpack --config webpack.config.js

 * Run the app using the development server

    webpack-dev-server --config webpack.config.js --open

### Use another cesium

We set the cesium Source to be the code included with the cesium npm module.

	var cesiumSource = path.resolve(__dirname, '/node_modules/cesium/Source');

However, you may want to use a different version of cesium, like if you've cloned the cesium source code directly. Just set the cesium location to the appropriate path.

	var cesiumSource = path.resolve(__dirname, '../path/to/cesium/Source');

### Analyze bundle and ignore unused modules

To look at the contents of your bundle, you can visualize it with the [`webpack-bundle-analyzer`](https://www.npmjs.com/package/webpack-bundle-analyzer) plugin and ignore unused code using the [`IgnorePlugin`](https://webpack.js.org/plugins/ignore-plugin/).

#### Analyze bundle

Install [`webpack-bundle-analyzer`](https://www.npmjs.com/package/webpack-bundle-analyzer) and add it to your `package.json`.

	npm install --save-dev webpack-bundle-analyzer

Include the plugin in your `webpack.config.js`.

	var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

Add the plugin to the `plugins` list.

	plugins: [
		new BundleAnalyzerPlugin()
	],

#### Ignore

Since Cesium is such a large library, it's recommended to ignore unused parts of the Cesium library by default by using the [`IgnorePlugin`](https://webpack.js.org/plugins/ignore-plugin/) included with Webpack.

For example, if you are not using default Assets, prevent them from being included in the bundle:

	plugins: [
	    // Ignore default Cesium Assets
	    new webpack.IgnorePlugin(/^\.\/Assets$/, /cesium$/),
  	],

You can still include ignored files in your app explicitly:

	require('cesium/Source/Assets/approximateTerrainHeights.json');

### Optional Configurations 

##### Removing pragmas

To remove pragmas like a traditional cesium release build, use the `webpack-strip-block` plugin.

	rules: [
	    {
	      test: /\.js$/,
	      enforce: 'pre',
	      include: cesiumSource,
	      use: [
	        {
	          loader: 'webpack-strip-block',
	          options: {
	            start: '>>includeStart(\'debug\', pragmas.debug);',
	            end: '>>includeEnd(\'debug\')'
	        }
	      ]
	    }

##### Uglify and Minify

Compress the final size of the bundle by minifying included JavaScript using UglifyJS.

	plugins: [
		new webpack.optimize.UglifyJsPlugin()
	]

Additionally, minify the CSS files when loaded with the `css-loader`

	module: {
		rules: [
		{
			test: /\.css$/,
			use: [ 
				'style-loader', 
				{
					loader: 'css-loader',
					options: {
						minimize: true
					}
				}
			]
		}, ...
	}