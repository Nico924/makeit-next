module.exports = {
  target: 'serverless',
  images: {
    domains: ['makeit-website-uploads-production.s3.amazonaws.com'],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  /* config options here */
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    config.plugins.push(
      new webpack.DefinePlugin({
        __DEV__: dev,
        __STAGING__: false,
        __BROWSER__: false,
        __SSR__: isServer,
        __TEST__: false,
      }),
    );

    // Important: return the modified config
    return config;
  },
};
