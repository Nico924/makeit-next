const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const WebpackBar = require('webpackbar');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const merge = require('webpack-merge');
const webpack = require('webpack');

// Parent package
const package = require('../../../package.json');

const deploy = package && package.deploy;

// local
const parts = require('./parts');
const commonConfig = require('./common');
const paths = require('../paths');

const createConfig = config => {
  const isProduction = config.mode === 'production';

  return merge([
    // clean in prod
    isProduction && parts.clean(paths.defaultBuild, paths.baseDir),
    {
      mode: config.mode,
      name: 'app',
      // Entries configuration
      entry: {
        main: [paths.main],
      },
      // Source mapping or not
      devtool: isProduction ? 'none' : 'eval-source-map',
    },
    // default
    parts.outputPath({
      publicPath: (isProduction && deploy && deploy.publicPath) || paths.publicPath,
      filename: isProduction ? '[name].[contenthash].js' : undefined,
    }),
    parts.loadJavaScript({
      prod: isProduction,
    }),
    parts.loadCSS({
      prod: isProduction,
    }),
    parts.setVariables({
      __DEV__: !isProduction || config.dev || false,
      __STAGING__: config.staging || false,
      __BROWSER__: true,
      __SSR__: false,
      __TEST__: false,
    }),
    // launch dev server
    !isProduction && {
      devServer: {
        // Enable gzip compression for everything served:
        compress: true,
        port: config.port || 4000,
        // When using the HTML5 History API, the index.html page will likely have to be served in place of any 404 r
        historyApiFallback: true,
        hot: true,
        allowedHosts: ['.lvh.me'],
      },
    },
    config.analyze && {
      plugins: [
        // analyze dependencies sizes
        new BundleAnalyzerPlugin({
          analyzerPort: config.port ? config.port + 1000 : 5000,
        }),
      ],
    },
    // Common plugins
    {
      plugins: [
        new CopyPlugin({
          patterns: [
            {
              from: path.join(paths.baseDir, config.staging ? 'static-staging' : 'static'),
              to: path.join(paths.defaultBuild, paths.publicPath),
              noErrorOnMissing: true,
            },
          ],
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new HTMLWebpackPlugin({
          template: paths.inAppSrc('index.html'),
        }),
        new WebpackBar(),
      ],
    },
    // Prod plugins
    isProduction && parts.imageOptimization(),
    parts.optimize(),
  ]);
};

// env can be given with --env.variable
module.exports = (env, params) => {
  const config = createConfig({
    mode: env ? 'production' : 'development',
    port: params && params.port,
    analyze: params && params.analyze,
    ...env,
  });

  // mode : Possible values for mode are: none, development or production(default).
  return merge(config, commonConfig);
};
