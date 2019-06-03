const env = process.env.NODE_ENV || 'dev';
let URL = 'mongodb://localhost:27017/webinarplatform'
if (env !== 'dev') {
    URL = process.env.MONGODB_URI
}

module.exports = {
    URL
};
