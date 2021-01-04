const path = require('path');

const baseDir = path.join(__dirname, '..', '..');

const srcDir = 'src';
const adminDir = 'admin';
const seedDir = 'seed';
const blogDir = 'blog';

const buildDir = 'dist';

// classic ssr
const ssrBuild = 'ssr/';
const clientBuild = 'ssr/client';
const serverBuild = 'ssr/server';

// serverless ssr
const slsBuild = 'sls/';
const slsServerBuild = 'sls/server';
const slsClientBuild = 'sls/client';

const inApp = path.resolve.bind(path, baseDir);
const inAppSrc = file => inApp(srcDir, file);

module.exports = {
  baseDir,
  main: path.resolve('src/main'),
  server: path.resolve('src/server'),
  serverless: path.resolve('src/server/serverless'),
  publicPath: '/',
  src: {
    app: path.resolve(baseDir, 'src'),
    admin: path.join(baseDir, adminDir, srcDir),
    blog: path.join(baseDir, blogDir, srcDir),
    seed: path.join(baseDir, seedDir, srcDir),
  },
  modules: {
    appModules: path.join(baseDir, 'node_modules'),
    adminModules: path.join(baseDir, adminDir, 'node_modules'),
    blogModules: path.join(baseDir, blogDir, 'node_modules'),
    seedModules: path.join(baseDir, seedDir, 'node_modules'),
  },
  defaultBuild: path.join(baseDir, buildDir),
  // ssr
  ssrBuild: path.resolve(ssrBuild),
  clientBuild: path.resolve(clientBuild),
  serverBuild: path.resolve(serverBuild),
  // serverless
  slsBuild: path.resolve(slsBuild),
  slsServerBuild: path.resolve(slsServerBuild),
  slsClientBuild: path.resolve(slsClientBuild),
  // functions
  inApp,
  inAppSrc,
};
