const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

let config = null;

try {
  config = require('../config').authCheck;
} catch (error) {
  config = {};
  console.log('Config file not present. Will rely on ENV variables');
}

// JWT middleware that will ensure the validity of our token. 
// require each protected route to have a valid access_token sent in the Authorization header
const authCheck = jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: config.jwksUri || process.env.AUTH_CHECK_JWKS_URI
    }),
    audience: config.audience || process.env.AUTH_CHECK_AUDIENCE,
    issuer: config.issuer || process.env.AUTH_CHECK_ISSUER,
    algorithms: ['RS256']
});

module.exports = authCheck;