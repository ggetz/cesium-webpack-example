# cesium-webpack-example

The minimal recommended setup for an application using [Cesium](https://cesiumjs.org/) with [Webpack](https://webpack.js.org/concepts/).

## Running this app

```
npm install
npm start
```

## Creating an app

Setup 
```
npm init -y
```

Install cesium and webpack
```
npm install --save-dev cesium webpack webpack-dev-server
```

Install webpack plugins
```
npm install --save-dev html-webpack-plugin
```

Install webpack loaders
```
npm install --save-dev style-loader css-loader file-loader worker-loader
```

### Configuration 

#### For Development

Targeting fast rebuilds and easier debugging.

##### Source Maps

#### For Production

Targeting performance.

##### Removing pragmas

##### Minify and Uglify