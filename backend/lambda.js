const serverless = require('serverless-http');
const app = require('./src/app');

// Wrap the Express app so AWS Lambda can understand it
module.exports.handler = serverless(app);
