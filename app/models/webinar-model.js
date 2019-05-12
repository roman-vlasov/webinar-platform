const mongoose = require('mongoose');

/* Схема БД. */
const WebinarSchema = mongoose.Schema({
        // Название
        title: {type: String, required: true, default: 'My Webinar'},
        // Описание
        description: {type: String, default: ''},
        // Картинка (превью)
        image: {type: String, default: ''},
        // URL венинара
        url: {type: String, default: ''},
        // Состояние вебинара
        state: {type: String, enum : ['NOT_STARTED', 'ONLINE', 'COMPLETED'], default: 'NOT_STARTED'},
    }, {timestamps: true}
);

module.exports = mongoose.model('Webinars', WebinarSchema);
