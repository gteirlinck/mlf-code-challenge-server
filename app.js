const express = require('express');
const app = express();

const config = require('./config');

// Dependencies
const path = require('path');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
  origin: config.corsAllowedOrigin || process.env.CORS_ALLOWED_ORIGIN,
  optionsSuccessStatus: 200
}));

// Mongoose
const connectionString = config.mongoDbConnectionString || process.env.DB_CON;
mongoose.connect(connectionString, { useMongoClient: true }, err => {
  if (err) {
    console.error(`Failed to connect to MongoDB: ${err.message}`);
  } else {
    console.log('MongoDB connection established');
  }
});

const WebsiteVisitsRecord = require('./models/websiteVisitsRecord');
const ExclusionItem = require('./models/exclusionItem');

// Routing
const websiteVisitsRecordsRoute = require('./routes/websiteVisitsRecords');
app.use('/api/records', websiteVisitsRecordsRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json(err);
});

module.exports = app;
