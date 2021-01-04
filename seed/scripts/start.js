const webpack = require('webpack');
const nodemon = require('nodemon');
const rimraf = require('rimraf');
// webpack-dev-middleware is a wrapper that will emit files processed by webpack to a server. This is used in webpack-dev-server internally, however it's available as a separate package to allow more custom setups if desired.
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const express = require('express');

const clientConfig = require('../config/webpack/ssr/client.js')();
const serverConfig = require('../config/webpack/ssr/server.js')();

const paths = require('../config/paths');
const { logMessage, compilerPromise } = require('./utils');

const app = express();

// Example commands :
// cross-env NODE_ENV=development PORT=5000 node scripts/start.js

const WEBPACK_PORT =
  process.env.WEBPACK_PORT ||
  (!isNaN(Number(process.env.PORT)) ? Number(process.env.PORT) + 1 : 8501);

const start = async () => {
  // Remove folders
  rimraf.sync(paths.clientBuild);
  rimraf.sync(paths.serverBuild);

  // Add the client which connects to our middleware
  // You can use full urls like 'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr'
  // useful if you run your app from another point like django
  clientConfig.entry.bundle = [
    `webpack-hot-middleware/client?path=http://localhost:${WEBPACK_PORT}/__webpack_hmr`,
    ...clientConfig.entry.bundle,
  ];

  // Customize the main hot update filename. create an history in the client output folder
  clientConfig.output.hotUpdateMainFilename = 'updates/[hash].hot-update.json';
  clientConfig.output.hotUpdateChunkFilename = 'updates/[id].[hash].hot-update.js';

  // Allow hot reload (if path was relative, no need to add those)
  const publicPath = clientConfig.output.publicPath;

  clientConfig.output.publicPath = [`http://localhost:${WEBPACK_PORT}`, publicPath]
    .join('/')
    .replace(/([^:+])\/+/g, '$1/');

  serverConfig.output.publicPath = [`http://localhost:${WEBPACK_PORT}`, publicPath]
    .join('/')
    .replace(/([^:+])\/+/g, '$1/');

  // Combine compilers
  const multiCompiler = webpack([clientConfig, serverConfig]);

  const clientCompiler = multiCompiler.compilers.find(compiler => compiler.name === 'client');
  const serverCompiler = multiCompiler.compilers.find(compiler => compiler.name === 'server');

  // Make sure to know when the compilation is done
  const clientPromise = compilerPromise('client', clientCompiler);
  const serverPromise = compilerPromise('server', serverCompiler);

  // Stats need be to explored
  const watchOptions = {
    // poll: true,
    ignored: /node_modules/,
    stats: clientConfig.stats,
  };

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    return next();
  });

  app.use(
    // Tell express to use the webpack-dev-middleware and use the webpack.config.js
    // configuration file as a base.
    webpackDevMiddleware(clientCompiler, {
      publicPath: clientConfig.output.publicPath,
      stats: clientConfig.stats,
      watchOptions,
    }),
  );

  app.use(webpackHotMiddleware(clientCompiler));

  app.listen(WEBPACK_PORT);

  // Here we use simply the watch of webpack
  serverCompiler.watch(watchOptions, (error, stats) => {
    if (!error && !stats.hasErrors()) {
      console.log(stats.toString(serverConfig.stats));
      return;
    }

    if (error) {
      logMessage(error, 'error');
    }

    if (stats.hasErrors()) {
      const info = stats.toJson();
      const errors = info.errors[0].split('\n');
      logMessage(errors[0], 'error');
      logMessage(errors[1], 'error');
      logMessage(errors[2], 'error');
    }
  });

  // wait until client and server is compiled
  try {
    await serverPromise;
    await clientPromise;
  } catch (error) {
    logMessage(error, 'error');
  }

  const script = nodemon({
    script: `${paths.serverBuild}/server.js`,
    ignore: ['src', 'scripts', 'config', './*.*', 'build/client'],
  });

  script.on('restart', () => {
    logMessage('Server side app has been restarted.', 'warning');
  });

  script.on('quit', () => {
    console.log('Process ended');
    process.exit();
  });

  script.on('error', () => {
    logMessage('An error occured. Exiting', 'error');
    process.exit(1);
  });
};

start();
