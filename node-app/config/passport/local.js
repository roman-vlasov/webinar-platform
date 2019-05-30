const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
const User = mongoose.model('User');

module.exports = new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    function (email, password, done) {
        const filter = {email: email};
        User.findOne(filter, function (err, user) {
            if (err) return done(err);
            if (!user) {
                return done(null, false, {message: 'That email is not registered'});
            }
            if (!user.authenticate(password)) {
                return done(null, false, {message: 'Invalid password'});
            }
            return done(null, user);
        });
    }
);
