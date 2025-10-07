// @ts-check
import { defineConfig, devices } from '@playwright/test';
const config = require('./config');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { outputFolder: 'test-output/reports/playwright-report' }],
    ['json', { outputFile: 'test-output/reports/test-results.json' }],
    ['junit', { outputFile: 'test-output/reports/junit-results.xml' }]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL is resolved dynamically in tests via config module to respect runtime env vars */
    // baseURL: config.getBaseUrl(), // Removed - causes early evaluation before env vars are set

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    
    /* Screenshot on failure */
    screenshot: 'only-on-failure',
    
    /* Video on failure */
    video: 'off',
    
    /* Optimized timeouts for faster execution */
    actionTimeout: 15000,
    navigationTimeout: 20000,

    // Add locale/region settings
    // locale: 'en-AE', // English in UAE
    // timezoneId: 'Asia/Dubai', // UAE timezone
    // geolocation: { longitude: 55.2708, latitude: 25.2048 }, // Dubai coordinates
    // permissions: ['geolocation']
  },

  /* Optimized global test timeout */
  timeout: 90000,

  /* Configure projects for major browsers and devices */
  projects: [
    // BrowserStack Desktop Projects
    {
      name: 'desktop-macos-safari',
      testDir: './tests/desktop',
      use: { 
        viewport: null,
        launchOptions: {
          args: ['--start-maximized'],
        },
      },
    },
    // {
    //   name: 'desktop-windows-edge',
    //   testDir: './tests/desktop',
    //   use: { 
    //     viewport: null,
    //     launchOptions: {
    //       args: ['--start-maximized'],
    //     },
    //   },
    // },

    // BrowserStack Mobile Projects
    {
      name: 'mobile-samsung-chrome',
      testDir: './tests/mobile',
      use: { 
        hasTouch: true,
        isMobile: true,
        viewport: { width: 360, height: 740 }, // Samsung Galaxy S22 viewport
      },
    },
    {
      name: 'mobile-iphone-safari',
      testDir: './tests/mobile',
      use: { 
        hasTouch: true,
        isMobile: true,
        viewport: { width: 390, height: 844 }, // iPhone 14 Pro viewport
      },
    },

    // Local testing projects (existing ones for local development)
    // {
    //   name: 'desktop-chromium',
    //   testDir: './tests/desktop',
    //   use: { 
    //     ...devices['Desktop Chrome'],
    //     viewport: null,
    //   },
    // },
    // {
    //   name: 'desktop-firefox',
    //   testDir: './tests/desktop',
    //   use: { 
    //     ...devices['Desktop Firefox'],
    //   },
    // },
    // {
    //   name: 'desktop-webkit',
    //   testDir: './tests/desktop',
    //   use: { 
    //     ...devices['Desktop Safari'],
    //   },
    // },

    // Mobile Projects (local)
    // {
    //   name: 'mobile-android',
    //   testDir: './tests/mobile',
    //   use: { 
    //     ...devices['Pixel 5'],
    //     // Android Chrome specific settings
    //     hasTouch: true,
    //     isMobile: true,
    //   },
    // },
    // {
    //   name: 'mobile-ios',
    //   testDir: './tests/mobile',
    //   use: { 
    //     ...devices['iPhone 12'],
    //     // iOS Safari specific settings
    //     hasTouch: true,
    //     isMobile: true,
    //   },
    // },

    // Additional mobile devices for comprehensive testing (local)
    // {
    //   name: 'mobile-android-tablet',
    //   testDir: './tests/mobile',
    //   use: { 
    //     ...devices['Galaxy Tab S4'],
    //     hasTouch: true,
    //     isMobile: true,
    //   },
    // },
    // {
    //   name: 'mobile-ios-tablet',
    //   testDir: './tests/mobile',
    //   use: { 
    //     ...devices['iPad Pro'],
    //     hasTouch: true,
    //     isMobile: true,
    //   },
    // },

    // Legacy browsers for compatibility testing (local)
  //   {
  //     name: 'desktop-edge',
  //     testDir: './tests/desktop',
  //     use: { 
  //       ...devices['Desktop Edge'], 
  //       channel: 'msedge',
  //     },
  //   },
  //   {
  //     name: 'desktop-chrome',
  //     testDir: './tests/desktop',
  //     use: { 
  //       ...devices['Desktop Chrome'], 
  //       channel: 'chrome',
  //     },
  //   },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

