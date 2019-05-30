const mongoose = require('mongoose');
const Poll = require('../models/poll-model');

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
        state: {type: String, enum: ['NOT_STARTED', 'ONLINE', 'COMPLETED'], default: 'NOT_STARTED'},
        // Имя автора
        authorName: {type: String, default: null},
    }, {timestamps: true}
);

/* Методы класса. */
WebinarSchema.methods = {
    /**
     * Удаляет все опросы.
     */
    deleteAllPolls: function () {
        Poll.remove({webinarId: this.id.str});
    }
};

module.exports = mongoose.model('Webinars', WebinarSchema);
