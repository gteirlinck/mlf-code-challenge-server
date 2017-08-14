const express = require('express');
const router = express.Router();

const exclusions = [
    { host: 'website-c', excludedSince: new Date(2016, 11, 1) },
    { host: 'website-f', excludedSince: new Date(2016, 0, 1), excludedTill: new Date(2016, 2, 14) }    
];

router.get('/', (req, res) => {
    res.json(exclusions);
});

module.exports = router;