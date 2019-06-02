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
const whitelist = ['http://localhost:8080', 'http://localhost:3000', 'http://localhost:8081', ]
app.use(cors({ origin: whitelist, credentials: true }));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    if ('OPTIONS' === req.method) {
        res.send(200);
    } else {
        next();
    }
});

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


const router = express.Router();
const userController = require('./app/controllers/user-controller');
const pollController = require('./app/controllers/poll-controller');
router.get('/', userController.show);
app.use('/api/users/current', router);

module.exports = router;

app.use('/api/webinars/:webinarId/polls/:pollId/answers', require('./routes/answers.js'));
app.use('/api/webinars/:webinarId/polls', require('./routes/polls.js'));
app.use('/api/webinars', require('./routes/webinars.js'));



/* SOCKETS */
const server = app.listen(3000, function() {
    console.log('server running on port 3000');
});

const io = require('socket.io')(server);

io.on('connection', function (socket) {
    socket.on('start_poll', function (data) {
        pollController.start(data['pollId'], socket);
    });
});
