const mongoose = require('mongoose');

const exclusionItemSchema = mongoose.Schema({
    host: String,
    excludedSince: Date,
    excludedTill: Date
});

const ExclusionItem = mongoose.model('exclusionItem', exclusionItemSchema, 'exclusions');

module.exports = ExclusionItem;