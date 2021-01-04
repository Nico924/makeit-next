/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge');
const LoadablePlugin = require('@loadable/webpack-plugin');
const paths = require('../paths');
const parts = require('./parts');
// const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = merge([
  parts.modulePathResolve(Object.values(paths.src), Object.values(paths.modules)),
  parts.loadFonts(),
  parts.loadImages(),
  parts.loadVideos(),
  parts.loadTxts(),
  parts.loadGQL(),
  {
    plugins: [new LoadablePlugin()],
  },
]);
