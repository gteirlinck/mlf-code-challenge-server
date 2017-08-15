const express = require('express');
const router = express.Router();

const authCheck = require('./authCheck');

const mongoose = require('mongoose');
const model = require('../models/exclusionItem');

router.get('/', authCheck, (req, res) => {
    model.find((err, exclusions) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: err });
        } else {
            res.json(exclusions);
        }
      });
});

module.exports = router;