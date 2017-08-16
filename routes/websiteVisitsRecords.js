const express = require('express');
const router = express.Router();

const authCheck = require('./authCheck');

const mongoose = require('mongoose');
const model = require('../models/websiteVisitsRecord');
const exclusionsListModel = require('../models/exclusionItem');

function isWebsiteExcluded(website, date, exclusionsList) {
    return exclusionsList.findIndex(item => {
        // Filter host name
        if (!website.toLowerCase().endsWith(item.host.toLowerCase())) {
        return false;
        }

        // Filter excluded date range lower bound
        if (date < item.excludedSince) {
        return false;
        }

        // Filter excluded date range upper bound (id any)
        if (item.excludedTill && date > item.excludedTill) {
        return false;
        }

        return true;
    }) > -1;
}

router.get('/', authCheck, (req, res) => {
    const filter = { };
    
    if (req.query.date) {
        const date = new Date(req.query.date);
        filter['date'] = {'$eq': date }
    }

    const maxRecordsCount = Number(req.query.maxResultsCount);

    model.find(filter)
    .sort({ 'visitsCount': -1 })
    .exec((err, records) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: err });
        } else {
            // Load and filter out records that are in the exclusions list
            exclusionsListModel.find((exclusionsListErr, exclusionsList) => {
                if (exclusionsListErr) {
                    console.log(`Failed to load exclusions list: ${err}`);
                    res.json(records.slice(0, maxRecordsCount));
                } else {
                    // Filter out excluded items
                    if (exclusionsList.length > 0) {
                        records = records.filter(record => !isWebsiteExcluded(record.website, record.date, exclusionsList));
                    }

                    res.json(records.slice(0, maxRecordsCount))
                }
            });
        }
      });
});

// This function will extract a list of unique dates present in the database (used to populate the datepicker in the frontend)
router.get('/dates', authCheck, (req, res) => {
    model.find('date', { '_id': 0, 'date': 1}, { 'sort': { 'date': -1} }, (err, records) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: err });
        } else {
            // Extract the date part in a string and use ES2015 spread operator to remove duplicates
            res.json([...new Set(records.map(r => r.date.toISOString().substr(0, 10)))]);
        }
    });
});

module.exports = router;