module.exports = {
  presets: [
    '@babel/preset-typescript',
    [
      '@babel/preset-env',
      {
        // add debug information for babel
        // debug: true,
        // Because of this, preset-env's behavior is different than browserslist: it does not use the defaults query when there are no targets are found in your Babel or browserslist config(s). If you want to use the defaults query, you will need to explicitly pass it as a target:
        targets: 'defaults',
      },
    ],
    '@babel/preset-react',
    '@babel/preset-flow',
  ],
  plugins: [
    '@loadable/babel-plugin',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-runtime',
  ],
};
