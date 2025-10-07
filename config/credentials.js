/**
 * User Credentials Configuration
 * Contains test user credentials for different user types, environments, and markets
 */

const credentials = {
  dev: {
    USA: {
      private: {
        username: 'testpvtuser.usa.dev@sharklasers.com',
        role: 'Private User',
        firstName: 'John',
        lastName: 'Doe'
      },
      business: {
        username: 'testbususer.usa.dev@sharklasers.com',
        role: 'Business User',
        firstName: 'Jane',
        lastName: 'Smith',
        companyName: 'Dev Corp USA'
      },
      gmail: {
        username: 'testgmailuser.usa.dev@gmail.com',
        role: 'Gmail User',
        firstName: 'Mike',
        lastName: 'Johnson'
      }
    },
    UAE: {
      private: {
        username: 'testpvtuser.uae.dev@sharklasers.com',
        role: 'Private User',
        firstName: 'Ahmed',
        lastName: 'Al-Rashid'
      },
      business: {
        username: 'testbususer.uae.dev@sharklasers.com',
        role: 'Business User',
        firstName: 'Fatima',
        lastName: 'Al-Zahra',
        companyName: 'Dev Corp UAE'
      },
      gmail: {
        username: 'testgmailuser.uae.dev@gmail.com',
        role: 'Gmail User',
        firstName: 'Omar',
        lastName: 'Hassan'
      }
    }
  },
  test: {
    USA: {
      private: {
        username: 'testpvtuser.usa.test@sharklasers.com',
        role: 'Private User',
        firstName: 'Robert',
        lastName: 'Wilson'
      },
      business: {
        username: 'testbususer.usa.test@sharklasers.com',
        role: 'Business User',
        firstName: 'Sarah',
        lastName: 'Davis',
        companyName: 'Test Corp USA'
      },
      gmail: {
        username: 'testgmailuser.usa.test@gmail.com',
        role: 'Gmail User',
        firstName: 'David',
        lastName: 'Brown'
      }
    },
    UAE: {
      private: {
        username: 'testpvtuser.uae.test@sharklasers.com',
        role: 'Private User',
        firstName: 'Ali',
        lastName: 'Al-Mahmoud'
      },
      business: {
        username: 'testbususer.uae.test@sharklasers.com',
        role: 'Business User',
        firstName: 'Aisha',
        lastName: 'Al-Qasimi',
        companyName: 'Test Corp UAE'
      },
      gmail: {
        username: 'testgmailuser.uae.test@gmail.com',
        role: 'Gmail User',
        firstName: 'Khalid',
        lastName: 'Al-Shamsi'
      }
    }
  },
  prod: {
    USA: {
      private: {
        username: 'testpvtuser.usa.prod@sharklasers.com',
        role: 'Private User',
        firstName: 'Michael',
        lastName: 'Anderson'
      },
      business: {
        username: 'testbususer.usa.prod@sharklasers.com',
        role: 'Business User',
        firstName: 'Lisa',
        lastName: 'Taylor',
        companyName: 'Prod Corp USA'
      },
      gmail: {
        username: 'testgmailuser.usa.prod@gmail.com',
        role: 'Gmail User',
        firstName: 'James',
        lastName: 'Martinez'
      }
    },
    UAE: {
      private: {
        username: 'testpvtuser.uae.prod@sharklasers.com',
        role: 'Private User',
        firstName: 'Hassan',
        lastName: 'Al-Mansoori'
      },
      business: {
        username: 'testbususer.uae.prod@sharklasers.com',
        role: 'Business User',
        firstName: 'Mariam',
        lastName: 'Al-Blooshi',
        companyName: 'Prod Corp UAE'
      },
      gmail: {
        username: 'testgmailuser.uae.prod@gmail.com',
        role: 'Gmail User',
        firstName: 'Saeed',
        lastName: 'Al-Ketbi'
      }
    }
  }
};

/**
 * Get credentials for specific environment, market, and persona
 * @param {string} env - Environment name (dev, test, prod)
 * @param {string} market - Market name (USA, UAE)
 * @param {string} persona - User persona (private, business, gmail)
 * @returns {object} User credentials
 */
function getCredentials(env, market, persona) {
  validateArgs('getCredentials', { env, market, persona });
  const envCredentials = credentials[env.toLowerCase()];
  if (!envCredentials) {
    throw new Error(`Environment '${env}' not found. Available environments: ${Object.keys(credentials).join(', ')}`);
  }

  const marketCredentials = envCredentials[market.toUpperCase()];
  if (!marketCredentials) {
    throw new Error(`Market '${market}' not found for environment '${env}'. Available markets: ${Object.keys(envCredentials).join(', ')}`);
  }

  const personaCredentials = marketCredentials[persona.toLowerCase()];
  if (!personaCredentials) {
    throw new Error(`Persona '${persona}' not found for environment '${env}' and market '${market}'. Available personas: ${Object.keys(marketCredentials).join(', ')}`);
  }
  // Attach password resolved from env vars (no hardcoded secrets)
  const password = resolvePassword(env, market, persona);
  return { ...personaCredentials, password };
}

/**
 * Get username for specific environment, market, and persona
 * @param {string} env - Environment name (dev, test, prod)
 * @param {string} market - Market name (USA, UAE)
 * @param {string} persona - User persona (private, business, gmail)
 * @returns {string} Username
 */
function getUsername(env, market, persona) {
  validateArgs('getUsername', { env, market, persona });
  return getCredentials(env, market, persona).username;
}

/**
 * Get password for specific environment, market, and persona
 * @param {string} env - Environment name (dev, test, prod)
 * @param {string} market - Market name (USA, UAE)
 * @param {string} persona - User persona (private, business, gmail)
 * @returns {string} Password
 */
function getPassword(env, market, persona) {
  validateArgs('getPassword', { env, market, persona });
  return resolvePassword(env, market, persona);
}

/**
 * Resolve password from environment variables using descending specificity.
 * Order:
 *  HORECA_PWD_<ENV>_<MARKET>_<PERSONA>
 *  HORECA_PWD_<ENV>_<PERSONA>
 *  HORECA_PWD_<ENV>_<MARKET>
 *  HORECA_PWD_<ENV>
 *  HORECA_PWD_DEFAULT
 * Throws if none found.
 */
function resolvePassword(env, market, persona) {
  const E = env.toUpperCase();
  const M = market.toUpperCase();
  const P = persona.toUpperCase();
  const candidates = [
    `HORECA_PWD_${E}_${M}_${P}`,
    `HORECA_PWD_${E}_${P}`,
    `HORECA_PWD_${E}_${M}`,
    `HORECA_PWD_${E}`,
    'HORECA_PWD_DEFAULT'
  ];
  for (const key of candidates) {
    if (process.env[key]) return process.env[key];
  }
  throw new Error(`Password not provided. Set one of: ${candidates.join(', ')}`);
}

/**
 * Get all available personas for a specific environment and market
 * @param {string} env - Environment name (dev, test, prod)
 * @param {string} market - Market name (USA, UAE)
 * @returns {string[]} Array of persona names
 */
function getAvailablePersonas(env, market) {
  validateArgs('getAvailablePersonas', { env, market });
  const envCredentials = credentials[env.toLowerCase()];
  if (!envCredentials) {
    throw new Error(`Environment '${env}' not found. Available environments: ${Object.keys(credentials).join(', ')}`);
  }

  const marketCredentials = envCredentials[market.toUpperCase()];
  if (!marketCredentials) {
    throw new Error(`Market '${market}' not found for environment '${env}'. Available markets: ${Object.keys(envCredentials).join(', ')}`);
  }

  return Object.keys(marketCredentials);
}

/**
 * Get all available environments
 * @returns {string[]} Array of environment names
 */
function getAvailableEnvironments() {
  return Object.keys(credentials);
}

/**
 * Get all available markets for a specific environment
 * @param {string} env - Environment name (dev, test, prod)
 * @returns {string[]} Array of market names
 */
function getAvailableMarkets(env) {
  validateArgs('getAvailableMarkets', { env });
  const envCredentials = credentials[env.toLowerCase()];
  if (!envCredentials) {
    throw new Error(`Environment '${env}' not found. Available environments: ${Object.keys(credentials).join(', ')}`);
  }
  return Object.keys(envCredentials);
}

/**
 * Validate required arguments are provided (no silent defaults allowed).
 * @param {string} fn
 * @param {Record<string, any>} args
 */
function validateArgs(fn, args) {
  const missing = Object.entries(args)
    .filter(([_, v]) => v === undefined || v === null || v === '')
    .map(([k]) => k);
  if (missing.length) {
    throw new Error(`${fn} missing required argument(s): ${missing.join(', ')}. ` +
      'All parameters must be explicitly provided. Use the higher-level config module instead of relying on defaults.');
  }
}

module.exports = {
  credentials,
  getCredentials,
  getUsername,
  getPassword,
  getAvailablePersonas,
  getAvailableEnvironments,
  getAvailableMarkets
};
