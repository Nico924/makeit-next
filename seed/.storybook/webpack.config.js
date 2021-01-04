// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

// libs
const merge = require('webpack-merge');
const webpack = require('webpack');

const parts = require('../config/webpack/parts');
const paths = require('../config/paths');

module.exports = merge([
  parts.modulePathResolve(Object.values(paths.src), Object.values(paths.modules)),
  parts.loadFonts(),
  parts.loadImages(),
  parts.loadJavaScript(),
  parts.loadCSS({
    styleLoader: true,
  }),
  parts.setVariables({
    __DEV__: true,
    __STAGING__: false,
    __BROWSER__: true,
    __SSR__: false,
    __TEST__: false,
  }),
]);
