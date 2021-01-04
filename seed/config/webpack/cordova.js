const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const WebpackBar = require('webpackbar');
const Dotenv = require('dotenv-webpack');

const merge = require('webpack-merge');
const webpack = require('webpack');
// local
const parts = require('./parts');
const commonConfig = require('./common');
const paths = require('../paths');

const createConfig = config =>
  merge([
    // clean in prod
    parts.clean(paths.defaultBuild, paths.baseDir),
    {
      name: 'app',
      // Entries configuration
      entry: {
        main: [paths.main],
      },
      // Source mapping or not
      devtool: config.prod ? 'none' : 'eval-source-map',
      output: {
        path: paths.defaultBuild,
        filename: 'main.js',
        publicPath: './',
      },
    },
    parts.loadJavaScript({
      prod: config.prod,
    }),
    parts.loadCSS({
      prod: config.prod,
    }),
    parts.setVariables({
      __DEV__: !config.prod,
      __STAGING__: config.staging || false,
      __BROWSER__: true,
      __SSR__: false,
      __TEST__: false,
    }),
    {
      plugins: [
        new HTMLWebpackPlugin({
          template: paths.inAppSrc('index.html'),
        }),
        new WebpackBar(),
      ],
    },
  ]);

module.exports = env => {
  const mode = env && env.prod ? 'production' : 'development';

  const config = createConfig({
    ...env,
  });
  // mode : Possible values for mode are: none, development or production(default).
  return merge({ mode }, commonConfig, config);
};
