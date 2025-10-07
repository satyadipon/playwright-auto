/**
 * Environment Configuration
 * Contains base URLs for different environments and markets
 */

const environments = {
  dev: {
    name: 'Development',
    markets: {
      USA: {
        baseUrl: 'https://www.usa-dev.thehorecastore.com',
        currency: 'USD',
        region: 'US'
      },
      UAE: {
        baseUrl: 'https://www.uae-dev.thehorecastore.co',
        currency: 'AED',
        region: 'AE'
      }
    }
  },
  test: {
    name: 'Testing',
    markets: {
      USA: {
        baseUrl: 'https://development.d28qosi1cuigvb.amplifyapp.com',
        currency: 'USD',
        region: 'US'
      },
      UAE: {
        baseUrl: 'https://uae.thehorecastore.co/',
        currency: 'AED',
        region: 'AE'
      }
    }
  },
  prod: {
    name: 'Production',
    markets: {
      USA: {
        baseUrl: 'https://www.thehorecastore.com',
        currency: 'USD',
        region: 'US'
      },
      UAE: {
        baseUrl: 'https://horecastore.ae',
        currency: 'AED',
        region: 'AE'
      }
    }
  }
};

/**
 * Get configuration for specific environment and market
 * @param {string} env - Environment name (dev, test, prod)
 * @param {string} market - Market name (USA, UAE) 
 * @returns {object} Environment configuration
 */
function getEnvironment(env = 'test', market = 'USA') {
  const environment = environments[env.toLowerCase()];
  if (!environment) {
    throw new Error(`Environment '${env}' not found. Available environments: ${Object.keys(environments).join(', ')}`);
  }
  
  const marketConfig = environment.markets[market.toUpperCase()];
  if (!marketConfig) {
    throw new Error(`Market '${market}' not found for environment '${env}'. Available markets: ${Object.keys(environment.markets).join(', ')}`);
  }
  
  return {
    ...environment,
    currentMarket: market.toUpperCase(),
    ...marketConfig
  };
}

/**
 * Get base URL for specific environment and market
 * @param {string} env - Environment name (dev, test, prod)
 * @param {string} market - Market name (USA, UAE)
 * @returns {string} Base URL
 */
function getBaseUrl(env = 'test', market = 'USA') {
  return getEnvironment(env, market).baseUrl;
}

/**
 * Get all available environments
 * @returns {string[]} Array of environment names
 */
function getAvailableEnvironments() {
  return Object.keys(environments);
}

/**
 * Get all available markets for a specific environment
 * @param {string} env - Environment name (dev, test, prod)
 * @returns {string[]} Array of market names
 */
function getAvailableMarkets(env = 'test') {
  const environment = environments[env.toLowerCase()];
  if (!environment) {
    throw new Error(`Environment '${env}' not found. Available environments: ${Object.keys(environments).join(', ')}`);
  }
  return Object.keys(environment.markets);
}

/**
 * Get current environment from NODE_ENV or default to 'dev'
 * @returns {string} Current environment
 */
function getCurrentEnvironment() {
  return process.env.NODE_ENV || process.env.TEST_ENV || 'test';
}

module.exports = {
  environments,
  getEnvironment,
  getBaseUrl,
  getCurrentEnvironment,
  getAvailableEnvironments,
  getAvailableMarkets
};
