/* global __dirname, require, module*/

const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const env = require('yargs').argv.env; // use --env with webpack 2
const pkg = require('./package.json');

let libraryName = pkg.name;
let outputFile;

const plugins = [
  new webpack.HotModuleReplacementPlugin()
];

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ }));
  outputFile = libraryName + '.min.js';
} else {
  outputFile = libraryName + '.js';
}

const baseConfig = {
  mode: 'development',
  devtool: 'source-map',
  output: {
    path: __dirname + '/dist',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
      }
    ]
  },
  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./src'), path.resolve('./src/sass')],
    extensions: ['.json', '.js', '.scss']
  },
  plugins: plugins
};

const mainConfig = Object.assign({}, baseConfig, {
  entry: [__dirname + '/src/index.js'],
  devServer: {
    host: '0.0.0.0',
    port: 8383,
    inline: true,
    hot: true
  }
});

const htmlConfig = Object.assign({}, baseConfig, {
  entry: [__dirname + '/src/languages/html.js'],
  output: {
    path: __dirname + '/dist/languages',
    filename: 'html.js',
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  }
});

const cssConfig = Object.assign({}, baseConfig, {
  entry: [__dirname + '/src/languages/css.js'],
  output: {
    path: __dirname + '/dist/languages',
    filename: 'css.js',
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  }
});

const jsonConfig = Object.assign({}, baseConfig, {
  entry: [__dirname + '/src/languages/json.js'],
  output: {
    path: __dirname + '/dist/languages',
    filename: 'json.js',
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  }
});

module.exports = [
  mainConfig,
  htmlConfig,
  cssConfig,
  jsonConfig
];