/**
 * Main Configuration Module
 * Combines environment and credentials configuration
 */

const environments = require('./environments');
const credentials = require('./credentials');

/**
 * Configuration manager class
 */
class Config {
  constructor() {
    this.currentEnv = environments.getCurrentEnvironment();
    this.currentMarket = process.env.TEST_MARKET || 'USA';
    this.currentPersona = process.env.TEST_PERSONA || 'private';
  }

  /**
   * Get current environment name
   * @returns {string} Current environment
   */
  getEnvironment() {
    return this.currentEnv;
  }

  /**
   * Get current market
   * @returns {string} Current market
   */
  getMarket() {
    return this.currentMarket;
  }

  /**
   * Get current persona
   * @returns {string} Current persona
   */
  getPersona() {
    return this.currentPersona;
  }

  /**
   * Set current environment
   * @param {string} env - Environment name (dev, test, prod)
   */
  setEnvironment(env) {
    this.currentEnv = env;
  }

  /**
   * Set current market
   * @param {string} market - Market name (USA, UAE)
   */
  setMarket(market) {
    this.currentMarket = market.toUpperCase();
  }

  /**
   * Set current persona
   * @param {string} persona - Persona name (private, business, gmail)
   */
  setPersona(persona) {
    this.currentPersona = persona.toLowerCase();
  }

  /**
   * Set current configuration (environment, market, persona)
   * @param {string} env - Environment name (dev, test, prod)
   * @param {string} market - Market name (USA, UAE)
   * @param {string} persona - Persona name (private, business, gmail)
   */
  setConfig(env, market, persona) {
    this.setEnvironment(env);
    this.setMarket(market);
    this.setPersona(persona);
  }

  /**
   * Get base URL for current or specified configuration
   * @param {string} env - Environment name (optional, uses current if not specified)
   * @param {string} market - Market name (optional, uses current if not specified)
   * @returns {string} Base URL
   */
  getBaseUrl(env, market) {
    const effectiveEnv = (env === undefined || env === null || env === '') ? this.currentEnv : env;
    const effectiveMarket = (market === undefined || market === null || market === '') ? this.currentMarket : market;
    return environments.getBaseUrl(effectiveEnv, effectiveMarket);
  }

  /**
   * Get environment configuration for current or specified configuration
   * @param {string} env - Environment name (optional, uses current if not specified)
   * @param {string} market - Market name (optional, uses current if not specified)
   * @returns {object} Environment configuration
   */
  getEnvironmentConfig(env, market) {
    const effectiveEnv = (env === undefined || env === null || env === '') ? this.currentEnv : env;
    const effectiveMarket = (market === undefined || market === null || market === '') ? this.currentMarket : market;
    return environments.getEnvironment(effectiveEnv, effectiveMarket);
  }

  /**
   * Get credentials for current or specified configuration
   * @param {string} env - Environment name (optional, uses current if not specified)
   * @param {string} market - Market name (optional, uses current if not specified)
   * @param {string} persona - Persona name (optional, uses current if not specified)
   * @returns {object} User credentials
   */
  getCredentials(env, market, persona) {
    const effectiveEnv = (env === undefined || env === null || env === '') ? this.currentEnv : env;
    const effectiveMarket = (market === undefined || market === null || market === '') ? this.currentMarket : market;
    const effectivePersona = (persona === undefined || persona === null || persona === '') ? this.currentPersona : persona;
    return credentials.getCredentials(effectiveEnv, effectiveMarket, effectivePersona);
  }

  /**
   * Get username for current or specified configuration
   * @param {string} env - Environment name (optional, uses current if not specified)
   * @param {string} market - Market name (optional, uses current if not specified)
   * @param {string} persona - Persona name (optional, uses current if not specified)
   * @returns {string} Username
   */
  getUsername(env, market, persona) {
    const effectiveEnv = (env === undefined || env === null || env === '') ? this.currentEnv : env;
    const effectiveMarket = (market === undefined || market === null || market === '') ? this.currentMarket : market;
    const effectivePersona = (persona === undefined || persona === null || persona === '') ? this.currentPersona : persona;
    return credentials.getUsername(effectiveEnv, effectiveMarket, effectivePersona);
  }

  /**
   * Get password for current or specified configuration
   * @param {string} env - Environment name (optional, uses current if not specified)
   * @param {string} market - Market name (optional, uses current if not specified)
   * @param {string} persona - Persona name (optional, uses current if not specified)
   * @returns {string} Password
   */
  getPassword(env, market, persona) {
    const effectiveEnv = (env === undefined || env === null || env === '') ? this.currentEnv : env;
    const effectiveMarket = (market === undefined || market === null || market === '') ? this.currentMarket : market;
    const effectivePersona = (persona === undefined || persona === null || persona === '') ? this.currentPersona : persona;
    return credentials.getPassword(effectiveEnv, effectiveMarket, effectivePersona);
  }

  /**
   * Get all available environments
   * @returns {string[]} Array of environment names
   */
  getAvailableEnvironments() {
    return environments.getAvailableEnvironments();
  }

  /**
   * Get all available markets for current or specified environment
   * @param {string} env - Environment name (optional, uses current if not specified)
   * @returns {string[]} Array of market names
   */
  getAvailableMarkets(env) {
    const effectiveEnv = (env === undefined || env === null || env === '') ? this.currentEnv : env;
    return environments.getAvailableMarkets(effectiveEnv);
  }

  /**
   * Get all available personas for current or specified configuration
   * @param {string} env - Environment name (optional, uses current if not specified)
   * @param {string} market - Market name (optional, uses current if not specified)
   * @returns {string[]} Array of persona names
   */
  getAvailablePersonas(env, market) {
    const effectiveEnv = (env === undefined || env === null || env === '') ? this.currentEnv : env;
    const effectiveMarket = (market === undefined || market === null || market === '') ? this.currentMarket : market;
    return credentials.getAvailablePersonas(effectiveEnv, effectiveMarket);
  }

  /**
   * Get complete current configuration
   * @returns {object} Complete configuration
   */
  getCurrentConfig() {
    return {
      environment: this.currentEnv,
      market: this.currentMarket,
      persona: this.currentPersona,
      baseUrl: this.getBaseUrl(),
      credentials: this.getCredentials()
    };
  }

  /**
   * Print current configuration (for debugging)
   */
  printConfig() {
    console.log('=== Current Configuration ===');
    console.log(`Environment: ${this.getEnvironment()}`);
    console.log(`Market: ${this.getMarket()}`);
    console.log(`Persona: ${this.getPersona()}`);
    console.log(`Base URL: ${this.getBaseUrl()}`);
    console.log(`Username: ${this.getUsername()}`);
    console.log('--- Available Options ---');
    console.log(`Available Environments: ${this.getAvailableEnvironments().join(', ')}`);
    console.log(`Available Markets: ${this.getAvailableMarkets().join(', ')}`);
    console.log(`Available Personas: ${this.getAvailablePersonas().join(', ')}`);
  }

  /**
   * Validate if current configuration is valid
   * @returns {boolean} True if configuration is valid
   */
  isValidConfig() {
    try {
      this.getBaseUrl();
      this.getCredentials();
      return true;
    } catch (error) {
      console.error('Invalid configuration:', error.message);
      return false;
    }
  }
}

// Export singleton instance
module.exports = new Config();
