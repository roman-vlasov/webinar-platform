const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/* Схема БД. */
const UserSchema = mongoose.Schema({
      // Имя пользователя
      name: {type: String, required: true},
      // Пароль пользователя
      password: {type: String, required: true},
      // Почта пользователя
      email: {type: String, unique: true, required: true},
      // Права пользователя
      role: {type: String, enum: ['ADMIN', 'USER'], default: 'ADMIN'},
    }, {timestamps: true}
);

/* Методы класса. */
UserSchema.methods = {
  /**
   * Проверяет корректность пароля.
   *
   * @param {String} password - Пароль, который нужно проверить.
   * @return {boolean} - Пароль правильный.
   */
  authenticate: function (password) {
    return bcrypt.compareSync(password, this.password);
  }
};

module.exports = mongoose.model('User', UserSchema);
