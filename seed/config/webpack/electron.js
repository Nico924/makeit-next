// const nodeExternals = require('webpack-node-externals');
const merge = require('webpack-merge');
const WebpackBar = require('webpackbar');

// local
const HTMLWebpackPlugin = require('html-webpack-plugin');
const parts = require('./parts');
const commonConfig = require('./common');
const paths = require('.././paths');
// Forces webpack-dev-server program to write bundle files to the file system.

const createConfig = config =>
  merge([
    parts.clean(paths.defaultBuild, paths.baseDir),
    {
      name: 'electron',
      entry: {
        main: [paths.main],
      },
      target: 'electron-main',
      // node: { __dirname: false },
      // in prod we need the packages
      node: {
        // tell webpack that we actually want a working __dirname value
        // (ref: https://webpack.js.org/configuration/node/#node-__dirname)
        __dirname: false,
        __filename: false,
      },
      output: {
        path: paths.defaultBuild,
        filename: 'main.js',
        publicPath: './',
      },
    },
    // investigate why adding prod true destory ssr in prod
    parts.loadJavaScript(),
    // need css loader to not fail building
    parts.loadCSS(),
    parts.setVariables({
      __DEV__: !config.prod,
      __STAGING__: config.staging || false,
      __ELECTRON__: true,
      __TEST__: false,
      __BROWSER__: false,
      __SSR__: false,
    }),
    {
      plugins: [
        new HTMLWebpackPlugin({
          template: paths.inAppSrc('index.html'),
        }),
        new WebpackBar({
          name: 'Electron',
          color: 'orange',
        }),
      ],
    },
  ]);

module.exports = env => {
  const mode = env && env.prod ? 'production' : 'development';

  const config = createConfig({
    ...env,
  });
  // need common (images, font) to not fail the building process
  // mode : Possible values for mode are: none, development or production(default).
  return merge({ mode }, commonConfig, config);
};
