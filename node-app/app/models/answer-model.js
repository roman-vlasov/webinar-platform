const mongoose = require('mongoose');

/* Схема БД. */
const AnswerSchema = mongoose.Schema({
        // Идентификатор опроса
        questionId: {type: String, required: true},
        // Идентификатор пользователя
        userId: {type: String, required: true},
        // Индекс ответа
        answerIndex: {type: Number, required: true},
        // Правильный ли ответ
        right: {type: Boolean},
    }, {timestamps: true}
);

module.exports = mongoose.model('Answers', AnswerSchema);
