module.exports = {
  setupFilesAfterEnv: ['<rootDir>/seed/config/jest/setup.js'],
  testURL: 'http://localhost/',
  testEnvironment: 'node',
  verbose: true,
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/seed/config/jest/fileMock.js',
    '\\.(css|scss)$': '<rootDir>/seed/config/jest/styleMock.js',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  rootDir: '../',
  moduleDirectories: [
    'src',
    'admin/src',
    'blog/src',
    'seed/src',
    'node_modules',
    'admin/node_modules',
    'blog/node_modules',
    'seed/node_modules',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  globals: {
    __DEV__: false,
    __STAGING__: true,
    __BROWSER__: true,
    __TEST__: true,
  },
};
