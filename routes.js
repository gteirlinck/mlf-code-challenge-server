const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

const exclusions = [
    { host: 'website-c', excludedSince: new Date(2016, 11, 1) },
    { host: 'website-f', excludedSince: new Date(2016, 0, 1), excludedTill: new Date(2016, 2, 14) }    
];

const records = [
    { id: '', date: new Date(2016, 0, 6), website: 'www.website-a', visitsCount: 14065457 },
    { id: '', date: new Date(2016, 0, 6), website: 'www.website-b', visitsCount: 19831166 },
    { id: '', date: new Date(2016, 0, 6), website: 'www.website-c', visitsCount: 104346720 },
    { id: '', date: new Date(2016, 0, 6), website: 'www.website-d', visitsCount: 21536612 },
    { id: '', date: new Date(2016, 0, 6), website: 'www.website-e', visitsCount: 13246531 },
    { id: '', date: new Date(2016, 0, 6), website: 'www.website-f', visitsCount: 29422150 },
    { id: '', date: new Date(2016, 0, 27), website: 'www.website-b', visitsCount: 23154653 },
    { id: '', date: new Date(2016, 0, 27), website: 'www.website-c', visitsCount: 123831275 }
];    

// JWT middleware that will ensure the validity of our token. 
// require each protected route to have a valid access_token sent in the Authorization header
const authCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://gteirlinck.auth0.com/.well-known/jwks.json'
  }),
  audience: 'mlf-app-api',
  issuer: 'https://gteirlinck.auth0.com/',
  algorithms: ['RS256']
});

router.get('/records', authCheck, (req, res) => {
    res.json(records);
});

router.get('/exclusions', authCheck, (req, res) => {
    res.json(exclusions);
});

module.exports = router;