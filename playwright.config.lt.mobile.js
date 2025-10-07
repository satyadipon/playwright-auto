const { devices } = require('@playwright/test')
const env_config = require('./config');

// Playwright config to run tests on LambdaTest platform and local
const config = {
  testDir: 'tests',
  testMatch: 'tests/mobile/*.spec.js',
  timeout: 300000,
  workers: 1,
  use: {
    // baseURL: env_config.getBaseUrl(),
  },
  projects: [
    // -- LambdaTest Config --
    {
      name: 'Pixel 5:11:android@lambdatest',
      use: {}
    },
    // {
    //   name: 'Galaxy S25 Ultra:15:android@lambdatest',
    //   use: {}
    // },
    // {
    //   name: 'iPhone 16:18:ios@lambdatest',
    //   use: {}
    // },
    // {
    //   name: 'iPhone 14:18:ios@lambdatest',
    //   use: {}
    // }

  ]
}

module.exports = config