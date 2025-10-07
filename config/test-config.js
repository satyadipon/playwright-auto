/**
 * Test Configuration Setup
 * This file demonstrates how to use the new configuration system
 */

const config = require('./index');

console.log('=== Configuration Testing ===\n');

// Test 1: Default configuration
console.log('1. Default Configuration:');
config.printConfig();
console.log('\n' + '='.repeat(50) + '\n');

// Test 2: Switch to different environments and markets
const testCombinations = [
  { env: 'dev', market: 'USA', persona: 'private' },
  { env: 'dev', market: 'UAE', persona: 'business' },
  { env: 'test', market: 'USA', persona: 'gmail' },
  { env: 'test', market: 'UAE', persona: 'private' },
  { env: 'prod', market: 'USA', persona: 'business' },
  { env: 'prod', market: 'UAE', persona: 'gmail' }
];

testCombinations.forEach((combination, index) => {
  console.log(`${index + 2}. Testing ${combination.env.toUpperCase()} - ${combination.market} - ${combination.persona}:`);
  
  try {
    // Set configuration
    config.setConfig(combination.env, combination.market, combination.persona);
    
    // Get configuration details
    const currentConfig = config.getCurrentConfig();
    
    console.log(`   Environment: ${currentConfig.environment}`);
    console.log(`   Market: ${currentConfig.market}`);
    console.log(`   Persona: ${currentConfig.persona}`);
    console.log(`   Base URL: ${currentConfig.baseUrl}`);
    console.log(`   Username: ${currentConfig.credentials.username}`);
    console.log(`   User Role: ${currentConfig.credentials.role}`);
    
    if (currentConfig.credentials.companyName) {
      console.log(`   Company: ${currentConfig.credentials.companyName}`);
    }
    
    console.log(`   ✅ Configuration Valid: ${config.isValidConfig()}`);
    
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
  }
  
  console.log('\n' + '='.repeat(50) + '\n');
});

// Test 3: Environment variable based configuration
console.log('8. Environment Variable Based Configuration:');
console.log('Set these environment variables to automatically configure:');
console.log('   export NODE_ENV=prod');
console.log('   export TEST_MARKET=USA');
console.log('   export TEST_PERSONA=business');
console.log('\n');

// Test 4: Direct method calls without changing current config
console.log('9. Direct Method Calls (without changing current config):');
try {
  console.log(`   Dev USA Private URL: ${config.getBaseUrl('dev', 'USA')}`);
  console.log(`   Test UAE Business Username: ${config.getUsername('test', 'UAE', 'business')}`);
  console.log(`   Prod USA Gmail Password: ${config.getPassword('prod', 'USA', 'gmail')}`);
} catch (error) {
  console.log(`   ❌ Error: ${error.message}`);
}

console.log('\n' + '='.repeat(50) + '\n');

// Test 5: Available options
console.log('10. Available Options:');
console.log(`   Environments: ${config.getAvailableEnvironments().join(', ')}`);
console.log(`   Markets (for dev): ${config.getAvailableMarkets('dev').join(', ')}`);
console.log(`   Personas (for dev UAE): ${config.getAvailablePersonas('dev', 'UAE').join(', ')}`);

console.log('\n=== Configuration Testing Complete ===');