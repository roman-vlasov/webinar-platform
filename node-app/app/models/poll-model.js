const mongoose = require('mongoose');
const Answer = require('../models/answer-model');

/* Схема БД. */
const PollSchema = mongoose.Schema({
        // Вебинар
        pollId: {type: String, required: true},
        // Текст вопроса
        question: {type: String, required: true},
        // Ответы
        answers: {type: [String], required: true},
        // Индекс правильного ответа
        rightAnswerIndex: {type: Number},
    }, {timestamps: true}
);

/* Методы класса. */
PollSchema.methods = {
    /**
     * Удаляет все ответы на опрос.
     */
    deleteAllAnswer: function () {
        Answer.remove({questionId: this.id.str});
    }
};

module.exports = mongoose.model('Polls', PollSchema);
