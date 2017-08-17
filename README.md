# Code Challenge Server App
This NodeJS/Express application is the backend service used to feed data from the database to the client app. The backend app is hosted on Microsoft Azure

### Structure
The application exposes two routes:
- `/api/records`: this route returns a list of website visits records based on query parameters date and maxResultsCount
- `/api/records/date`: this route returns a list of all valid report dates. This list is used by the frontend to populate the validDates dropdown list

### Data
The application uses MongooseJS to query the MongoDB database holding the data of the application

### Configuration
Configuration settings are provided in a separate file `config.js` (not included in source control) or environment variables.

### Deployment
This application is hosted on Microsoft Azure as a regular web app. We use automated deployment from local git repository. We could also setup automatic deployment from Github.
