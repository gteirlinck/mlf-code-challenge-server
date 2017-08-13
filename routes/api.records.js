const express = require('express');
const router = express.Router();

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

router.get('/', (req, res) => {
    const metadata = { total_count: records.length };
    res.json({ _metadata: metadata, records: records });
});

module.exports = router;