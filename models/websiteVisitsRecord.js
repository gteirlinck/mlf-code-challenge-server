const mongoose = require('mongoose');

const websiteVisitsRecordSchema = mongoose.Schema({
    date: Date,
    website: String,
    visitsCount: Number
});

const WebsiteVisitsRecord = mongoose.model('websiteVisitsRecord', websiteVisitsRecordSchema, 'websiteVisits');

module.exports = WebsiteVisitsRecord;