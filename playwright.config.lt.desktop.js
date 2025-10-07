const { devices } = require('@playwright/test')
const env_config = require('./config');

// Playwright config to run tests on LambdaTest platform and local
const config = {
  testDir: 'tests',
  testMatch: 'tests/desktop/*.spec.js',
  timeout: 300000,
  workers: 1,
  use: {
    // baseURL: env_config.getBaseUrl(),
  },
  projects: [
    // -- LambdaTest Config --
    {
      name: 'chrome:latest:MacOS Ventura@lambdatest',
      use: {
        viewport: { width: 1920, height: 1080 }
      }
    },
    {
      name: 'pw-webkit:latest:MacOS Ventura@lambdatest',
      use: {
        viewport: { width: 1920, height: 1080 }
      }
    },
    {
      name: 'chrome:latest:Windows 11@lambdatest',
      use: {
        viewport: { width: 1920, height: 1080 }
      }
    },
    {
      name: 'MicrosoftEdge:latest:Windows 11@lambdatest',
      use: {
        viewport: { width: 1920, height: 1080 }
      }
    }
  ]
}

module.exports = config