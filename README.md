# cesium-webpack-example

The minimal recommended setup for an application using [Cesium](https://cesiumjs.org/) with [Webpack](https://webpack.js.org/concepts/).

### Running this example app

	npm install
	npm run build-workers
	npm start

### Requiring Cesium in your application
 
##### CommonJS Require

 	var Cesium = require('cesium/Cesium');
 	var viewer = new Cesium.Viewer('cesiumContainer');

##### ES6 Style Import

 	import Cesium from 'cesium/Cesium';
 	var viewer = new Cesium.Viewer('cesiumContainer');
 
##### Require asset files

 	require('cesium/Widgets/widgets.css');

##### Require specific modules

	var Color = require('cesium/Core/Color');
	var white = new Color.WHITE;

### Using another Cesium location

We set the cesium Source to be the code included with the cesium npm module.

	var cesiumSource = path.resolve(__dirname, './node_modules/cesium/Source');

However, you may want to use a different version of cesium, like if you've cloned the cesium source code directly. Just set the cesium location to the appropriate path.

	var cesiumSource = path.resolve(__dirname, '../path/to/cesium/Source');

### Optional Performance Configurations 

The following optimizations are recommended for building for production and will increase performance and result in smaller bundle sizes.

##### Ignore

Since Cesium is such a large library, it's recommended to ignore unused parts of the Cesium library by default by using the [`IgnorePlugin`](https://webpack.js.org/plugins/ignore-plugin/) included with Webpack.

For example, if you are not using default Assets, prevent them from being included in the bundle:

	plugins: [
	    // Ignore default Cesium Assets
	    new webpack.IgnorePlugin(/Assets/, /cesium$/),
  	],

You can still include ignored files in your app explicitly:

	require('cesium/Source/Assets/approximateTerrainHeights.json');

##### Removing pragmas

To remove pragmas like a traditional cesium release build, use the [`webpack-strip-block`](https://www.npmjs.com/package/webpack-strip-block) plugin.

```
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
]
```

##### Uglify and Minify

Compress the final size of the bundle by minifying included JavaScript using UglifyJS with the [`uglifyjs-webpack-plugin`](https://webpack.js.org/plugins/uglifyjs-webpack-plugin/) included with webpack.

```
plugins: [
	new webpack.optimize.UglifyJsPlugin()
]
```

Additionally, minify the CSS files when loaded with the `css-loader`

```
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
	},
}
```