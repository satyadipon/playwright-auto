# Configuration Usage Guide

This guide explains how to use the updated configuration system that supports multiple environments, markets, and user personas.

## Configuration Structure

### Environments
- **dev**: Development environment
- **test**: Testing environment  
- **prod**: Production environment

### Markets
- **USA**: United States market
- **UAE**: United Arab Emirates market

### User Personas
- **private**: Private user accounts
- **business**: Business user accounts
- **gmail**: Gmail-based user accounts

## Basic Usage

### 1. Import Configuration
```javascript
const config = require('./config');
```

### 2. Using Default Configuration
```javascript
// Default (when no env vars set): test environment, USA market, private persona
console.log('Base URL:', config.getBaseUrl());
console.log('Username:', config.getUsername());
console.log('Password:', config.getPassword());
```

### 3. Switching Configuration
Configuration is now IMMUTABLE at runtime to guarantee test isolation & reproducibility.

Set values ONLY via environment variables before you invoke Playwright:
```bash
export NODE_ENV=prod       # or TEST_ENV
export TEST_MARKET=USA
export TEST_PERSONA=business
npx playwright test
```

All former mutation methods (setEnvironment / setMarket / setPersona / setConfig) now throw errors if called.

### 4. Per-call Overrides Disabled
Previously you could pass env/market/persona into getters. This is now disabled to prevent mixing contexts inside a single run.

Do NOT call:
```javascript
config.getBaseUrl('dev', 'USA'); // ❌ throws
```

Instead rely on the single runtime context:
```javascript
config.getBaseUrl(); // ✅
```

### 5. Environment Variables
Set these environment variables for automatic configuration:
```bash
export NODE_ENV=prod          # Environment (dev/test/prod)
export TEST_MARKET=USA        # Market (USA/UAE)
export TEST_PERSONA=business  # Persona (private/business/gmail)
```

## Complete Configuration Examples

### Example 1: USA Production Business User
```bash
export NODE_ENV=prod TEST_MARKET=USA TEST_PERSONA=business
npx playwright test
```
```javascript
console.log('URL:', config.getBaseUrl());
console.log('Credentials:', config.getCredentials());
```

### Example 2: UAE Development Private User
```bash
export NODE_ENV=dev TEST_MARKET=UAE TEST_PERSONA=private
npx playwright test
```
```javascript
console.log('URL:', config.getBaseUrl());
console.log('Username:', config.getUsername());
```

### Example 3: Test Environment Gmail User
Run separate processes for each market if needed:
```bash
export NODE_ENV=test TEST_MARKET=USA TEST_PERSONA=gmail && npx playwright test
export NODE_ENV=test TEST_MARKET=UAE TEST_PERSONA=gmail && npx playwright test
```

## Utility Methods

### Get Available Options (Current Context Only)
```javascript
console.log('Environments:', config.getAvailableEnvironments());
console.log('Markets (current env):', config.getAvailableMarkets());
console.log('Personas (current env+market):', config.getAvailablePersonas());
```

### Get Current Configuration
```javascript
const currentConfig = config.getCurrentConfig();
console.log(currentConfig);
// Output: { environment: 'dev', market: 'UAE', persona: 'private', baseUrl: '...', credentials: {...} }
```

### Validate Configuration
```javascript
if (config.isValidConfig()) {
  console.log('Configuration is valid');
} else {
  console.log('Configuration has errors');
}
```

### Debug Configuration
```javascript
config.printConfig();
```

## Rationale for Immutability

1. Prevent tests from silently changing global state mid-run.
2. Ensure a single coherent logical test context per execution.
3. Enable parallelization where each worker uses its own process-level env vars.
4. Avoid cross-contamination of credentials / sessions.

If you need to test multiple personas or markets, invoke multiple Playwright commands (or define multiple CI jobs) each with its own environment variables.

## Legacy Methods Removed

The following now throw errors if called:
- setEnvironment
- setMarket
- setPersona
- setConfig
- Passing arguments to: getBaseUrl, getEnvironmentConfig, getCredentials, getUsername, getPassword, getAvailableMarkets, getAvailablePersonas

Refactor any existing test code to remove such calls.

## Integration in Test Files

### Playwright Test Example
```javascript
const { test, expect } = require('@playwright/test');
const config = require('../config');

test.describe('Login Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Set configuration for this test
    config.setConfig('test', 'USA', 'business');
    
    // Navigate to the correct URL
    await page.goto(config.getBaseUrl());
  });

  test('should login with business user', async ({ page }) => {
    const credentials = config.getCredentials();
    
    await page.fill('#username', credentials.username);
    await page.fill('#password', credentials.password);
    await page.click('#login-button');
    
    await expect(page.locator('.welcome-message')).toContain(credentials.firstName);
  });
});
```

### BrowserStack Configuration Example
```javascript
const config = require('../config');

// Configure for production UAE private user
config.setConfig('prod', 'UAE', 'private');

const capabilities = {
  'bstack:options': {
    projectName: `HorecaStore Tests - ${config.getEnvironment().toUpperCase()}`,
    buildName: `${config.getMarket()} ${config.getPersona()} Tests`,
    // ... other BrowserStack options
  }
};

const testUrl = config.getBaseUrl();
const testCredentials = config.getCredentials();
```

## URL Structure

The configuration automatically generates URLs based on the environment and market:

| Environment | Market | URL Format |
|-------------|--------|------------|
| dev | USA | https://www.usa-dev.thehorecastore.com |
| dev | UAE | https://www.uae-dev.thehorecastore.co |
| test | USA | https://www.usa-test.thehorecastore.com |
| test | UAE | https://www.uae-test.thehorecastore.co |
| prod | USA | https://www.usa.thehorecastore.com |
| prod | UAE | https://www.uae.thehorecastore.co |

## Credentials Structure

Each combination of environment, market, and persona has unique credentials:
- Username follows pattern: `test{persona}user.{market}.{env}@{domain}`
- Passwords are environment-specific
- Business users include company names
- Each user has appropriate first/last names for the market

## Error Handling

The configuration system provides detailed error messages for invalid combinations:
```javascript
try {
  config.setConfig('invalid', 'USA', 'private');
} catch (error) {
  console.error(error.message);
  // Output: Environment 'invalid' not found. Available environments: dev, test, prod
}
```