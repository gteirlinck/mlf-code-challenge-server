const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.json(req.user);
});

router.get('/logout', (req, res) => {
    req.logout();
    res.json(true);
});

module.exports = router;