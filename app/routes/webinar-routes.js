module.exports = (app) => {
    const webinars = require('../controllers/webinar-controller.js');

    // Create a new Webinar
    app.post('/webinars', webinars.create);
    // Retrieve all Webinar
    app.get('/webinars', webinars.findAll);
    // Retrieve a single Webinar with productId
    app.get('/webinars/:webinarId', webinars.findOne);
    // Update a Note with productId
    app.put('/webinars/:webinarId', webinars.update);
    // Delete a Note with productId
    app.delete('/webinars/:webinarId', webinars.delete);
};
