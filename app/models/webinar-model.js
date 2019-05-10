const mongoose = require('mongoose');

const WebinarSchema = mongoose.Schema({
    title: String,
    description: String,
    image: String,
    url: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Webinars', WebinarSchema);
