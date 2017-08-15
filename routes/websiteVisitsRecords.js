const express = require('express');
const router = express.Router();

const authCheck = require('./authCheck');

const mongoose = require('mongoose');
const model = require('../models/websiteVisitsRecord');

router.get('/', authCheck, (req, res) => {
    model.find((err, records) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: err });
        } else {
            res.json(records);
        }
      });
});

module.exports = router;