const path = require('path')

module.exports = {
  moduleDirectories: [
    'node_modules',
    path.join(__dirname, 'src'),
    path.join(__dirname, 'server/src'),
    path.join(__dirname, 'test'),
  ],
  moduleNameMapper: {
    '@-ui/react': '<rootDir>/src/index.ts',
  },
  testMatch: ['**/src/**/?(*.)test.tsx'],
  setupFilesAfterEnv: [require.resolve('./test/setup.js')],
  snapshotResolver: require.resolve('./test/resolve-snapshot.js'),
  collectCoverageFrom: ['**/src/**/*.tsx', '!**/src/**/*.d.ts'],
  globals: {
    __DEV__: true,
  },
  verbose: true,
}
