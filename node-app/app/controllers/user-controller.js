const userModel = require('../models/user-model');
const passport = require('passport');
const bcrypt = require('bcryptjs');

// Создает пользователя
exports.create = (req, res) => {
    const {name, email, password, confirmPassword} = req.body;
    let errors = [];

    // Заполненны ли все поля
    if (!name || !email || !password || !confirmPassword) {
        errors.push({msg: 'Please enter all fields'});
    }
    // Совпадают ли пароли
    if (password !== confirmPassword) {
        errors.push({msg: 'Passwords do not match'});
    }
    // Слишком короткий пароль
    if (password.length < 6) {
        errors.push({msg: 'Password must be at least 6 characters'});
    }
    // Если есть хоть одна ошибка, то вернемся на страницу регистрации
    if (errors.length > 0) {
        res.render('users/register', {
            errors,
            name,
            email,
            password,
            confirmPassword
        });
    } else {
        // Иначе создадим пользователя
        userModel.findOne({email: email}).then(user => {
            // Если есть пользователь, то вернемся на страницу регистрации и выведем ошибку
            if (user) {
                errors.push({msg: 'Email already exists'});
                res.render('users/register', {
                    errors,
                    name,
                    email,
                    password,
                    confirmPassword
                });
            } else {
                // Иначе создаем пользователя в БД и зашифруем пароль
                const newUser = new userModel({
                    name,
                    email,
                    password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                req.flash('success_msg', 'You are now registered and can log in');
                                res.redirect('/users/login');
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        });
    }
};

// Показывать профиль пользователя
exports.show = (req, res) => {
    if (!req.user) {
        return res.status(400).send({
            message: "Need auth!"
        });
    }
    res.send(req.user);
};

// Редактирует профиль пользователя
exports.update = (req, res) => {
};

// Удаляет профиль пользователя
exports.delete = (req, res) => {
};

// Входит в аккаунт
exports.login = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
};

// Выходит из аккаунта
exports.logout = (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
};
