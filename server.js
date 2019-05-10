const express = require('express');
const bodyParser = require('body-parser');

// Create express app
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Enable CORS for all HTTP methods
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Configuring the database
const config = require('./config/config.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Connecting to database
mongoose.connect(config.databaseURL, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// Routes
require('./app/routes/webinar-routes.js')(app);
// Default route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to application."});
});

// Listen for requests
app.listen(config.port, () => {
    console.log("App is running on port " + config.port);
});