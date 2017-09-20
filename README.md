# cesium-webpack-example

The minimal recommended setup for an application using [Cesium](https://cesiumjs.org/) with [Webpack](https://webpack.js.org/concepts/).

### Running this app

	npm install
	npm start

### Creating an app

Initialize an app

	npm init -y

Install cesium and webpack

	npm install --save-dev cesium webpack webpack-dev-server

Install webpack loaders

	npm install --save-dev style-loader css-loader file-loader worker-loader

Install webpack plugins

	npm install --save-dev html-webpack-plugin

### Analyze Bundle & Ignore unused

To reduce the total size of your bundle you can visualize it with the [`webpack-bundle-analyzer`](https://www.npmjs.com/package/webpack-bundle-analyzer) plugin and ignore unused code using the `IgnorePlugin`.

#### Analyze Bundle

Install [`webpack-bundle-analyzer`](https://www.npmjs.com/package/webpack-bundle-analyzer) and add it to your `package.json`.

	npm install --save-dev webpack-bundle-analyzer

Include the plugin in your `webpack.config.js`.

	var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

Add the plugin to the `plugins` list.

	plugins: [
	    ...,
		new BundleAnalyzerPlugin()
	],

#### Ignore

Don't include parts of Cesium by default by using `IgnorePlugin`.

	npm install --save-dev webpack-ignore-plugin

For example, if you are not using default Assets, ignore them:

	plugins: [
		...,

	    // Ignore default Cesium Assets
	    new webpack.IgnorePlugin(/^\.\/Assets$/, /cesium$/),
  	],

You can still include them in your project explicitly:

	require('cesium/Assets/');

### Additional Configuration 

##### Source Maps

##### Removing pragmas

To remove pragmas like a traditional cesium [combine build]() use the `webpack-strip-block` plugin.

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
		...,
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
	

