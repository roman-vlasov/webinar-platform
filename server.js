const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();

/** Configs **/
require('./config/passport')(passport);               // Passport
const databaseConfig = require('./config/database');  // MongoDB

/** Connecting to Database **/
mongoose.connect(databaseConfig.URL, {
    useCreateIndex: true,
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database.");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

/** Application settings **/
app.use(cors());

// Укажем пусть к папке "views"
app.set('views', path.join(__dirname, '/app/views'));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Express session
app.use(session({secret: 'secret', resave: true, saveUninitialized: true}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));
app.use('/webinars', require('./routes/webinars.js'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
