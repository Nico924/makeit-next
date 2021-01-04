/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // installed via npm
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
// const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

const CompressionPlugin = require('compression-webpack-plugin');
const zlib = require('zlib');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const merge = require('webpack-merge');
// local
const paths = require('../paths');

/*
Need to load the configs here so they can be applied to the external folders as wells
*/
const babelConfig = require('../../babel.config');
// Need required in the file for parent files
const postcssConfig = require('../../postcss.config');

/**
 * Resolve paths
 */
exports.modulePathResolve = (srcList, modulesList) => ({
  resolve: {
    modules: [...srcList, ...modulesList],
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx', '.json', '.mjs', '.gql', '.graphql'],
  },
  resolveLoader: {
    modules: modulesList,
  },
});
/**
 * Clean
 */
exports.clean = (path, root) => ({
  plugins: [new CleanWebpackPlugin()],
});

/**
 * JS (see also .babelrc)
 */
exports.loadJavaScript = ({ include, exclude, prod } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include,
        // node_modules(?!([\\/](attr-accept|moment)))
        exclude: exclude || /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: babelConfig.presets,
              plugins: prod
                ? babelConfig.plugins.concat('transform-remove-console')
                : babelConfig.plugins,
            },
            // */
          },
        ],
      },
    ],
  },
});

/**
 * Default output path
 */
exports.outputPath = ({
  path = paths.defaultBuild,
  filename = '[name].js',
  chunkFilename = '[name].[contenthash].js',
  publicPath = paths.publicPath,
} = {}) => ({
  output: {
    path,
    filename,
    chunkFilename,
    // This option specifies the public URL of the output directory when referenced in a browser. A relative URL is resolved relative to the HTML page (or <base> tag).
    publicPath,
    // https://github.com/webpack/webpack/issues/11660
    // addition for webpack 5
    // chunkLoading: false,
    // wasmLoading: false,
  },
});

/**
 * (S)CSS
 */
exports.loadCSS = ({
  include,
  exclude,
  prod = false,
  styleLoader = false,
  server = false,
} = {}) => {
  const fileName = prod ? '[name].[contenthash].css' : '[name].css';

  // If using MiniExtractPlugin in ssr, it works but it is then very slow to inject the css change.
  // Another alternative could be to use a ssr compatible style-loader
  const useExtractCssChunks = false; // ssr && !prod;

  // use style loader in dev (no ssr)
  const useStyleLoader = styleLoader;

  const CssPlugin = useExtractCssChunks ? ExtractCssChunks : MiniCssExtractPlugin;

  const plugin = new CssPlugin({
    filename: fileName,
  });

  const pluginOptions = useExtractCssChunks ? { hmr: !prod } : {};

  const usages = [
    {
      loader: 'css-loader',
      options: {
        sourceMap: true,
        // to use with localIdentName
        modules: true,
        localIdentName: '[local]--[hash:base64:5]',
        // The option importLoaders allows you to configure how many loaders before css-loader should be applied to @imported resources.
        importLoaders: 2,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: postcssConfig,
      },
    },
    {
      loader: 'sass-loader',
    },
  ];

  if (!server) {
    // if not loaded on server part, module styleIdentifiers will not be usable in the server
    usages.unshift({
      loader: useStyleLoader ? 'style-loader' : CssPlugin.loader,
      options: pluginOptions,
    });
  }
  return {
    module: {
      rules: [
        {
          test: /\.(css|sass|scss)$/,
          include,
          exclude,
          use: usages,
        },
      ],
    },
    plugins: [plugin],
  };
};

exports.setVariables = obj => {
  const env = {};
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    const value = obj[key];
    env[key] = JSON.stringify(value);
  }
  return {
    plugins: [new webpack.DefinePlugin(env)],
  };
};

/**
 * FONTS
 */
const FONTLIST = [
  ['woff', 'application/font-woff'],
  ['woff2', 'application/font-woff2'],
  ['otf', 'font/opentype'],
  ['ttf', 'application/octet-stream'],
  ['eot', 'application/vnd.ms-fontobject'],
  ['svg', 'image/svg+xml'],
];

exports.loadFonts = () => {
  let rsltConf = {
    module: {
      rules: [],
    },
  };

  FONTLIST.forEach(font => {
    const extension = font[0];
    const mimetype = font[1];

    const rule = {
      module: {
        rules: [
          {
            test: new RegExp(`\\.${extension}$`),
            loader: 'file-loader',
            include: [/fonts?/],
            options: {
              name: 'fonts/[name].[ext]',
              // limit: 10000,
              mimetype,
            },
          },
        ],
      },
    };
    rsltConf = merge(rsltConf, rule);
  });

  return rsltConf;
};

/**
 * Images
 */
exports.loadImages = () => ({
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/,
        loader: 'file-loader',
        exclude: [/fonts?/],
        options: {
          name: 'images/[name].[contenthash].[ext]',
          // for url loader
          // limit: 8192,
        },
      },
    ],
  },
});

/**
 * Images
 */
exports.loadVideos = () => ({
  module: {
    rules: [
      {
        test: /\.(mp4|mov)$/,
        loader: 'file-loader',
        options: {
          name: 'videos/[name].[contenthash].[ext]',
        },
      },
    ],
  },
});

// Idea of splitting vendors
exports.optimize = () => ({
  // https://webpack.js.org/plugins/compression-webpack-plugin/
  plugins: [
    // new CompressionPlugin({
    //   filename: '[path][base].br',
    //   algorithm: 'brotliCompress',
    //   test: /\.(js|css|html|svg)$/,
    //   compressionOptions: {
    //     params: {
    //       [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
    //     },
    //   },
    //   threshold: 10240,
    //   minRatio: 0.8,
    //   deleteOriginalAssets: false,
    // }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          safari10: true,
        },
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
    // use default splitChunks config with chnks all
    // https://webpack.js.org/plugins/split-chunks-plugin/#optimizationsplitchunks
    splitChunks: {
      chunks: 'all',
      // cacheGroups: {
      //   vendor: {
      //     // test with exclusion : /[\\/]node_modules[\\/](?!(attr-accept|moment))/
      //     test: /[\\/]node_modules[\\/]/,
      //     name: 'vendor',
      //   },
      // },
    },
    // Keep the runtime chunk separated to enable long term caching
    // https://twitter.com/wSokra/status/969679223278505985
    // https://github.com/facebook/create-react-app/issues/5358
    // runtimeChunk: {
    //   name: 'runtime',
    // },
  },
});

// Text loader
exports.loadTxts = () => ({
  module: {
    rules: [
      {
        test: /\.txt$/i,
        use: 'raw-loader',
      },
    ],
  },
});

// GraphQL loader
exports.loadGQL = () => ({
  module: {
    rules: [
      // fixes https://github.com/graphql/graphql-js/issues/1272
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
    ],
  },
});

exports.imageOptimization = () => ({
  plugins: [new ImageminPlugin({ test: /\.(jpe?g|png|gif)$/i })],
});

// Add stats
exports.stats = () => ({
  // To discover
  stats: {
    cached: false,
    cachedAssets: false,
    chunks: false,
    chunkModules: false,
    colors: true,
    hash: false,
    modules: false,
    reasons: false,
    timings: true,
    version: false,
  },
});
