var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var config = require('../config/config');
var auth = jwt({
    secret: config.secretKey,
    userProperty: 'payload'
});

var authentication = require('../controllers/auth');
var users = require('../controllers/user');
var todo = require('../controllers/todo');

router.post('/register', authentication.register);
router.post('/login', authentication.login);
router.post('/edit', auth, authentication.edit);
router.post('/change_password', auth, authentication.changePassword);
router.post('/create_todo', auth, todo.createTodo);
router.post('/edit_todo/:id', auth, todo.editTodo);
router.post('/delete_todo/:id', auth, todo.deleteTodo);

router.get('/get_user/:id', users.getUser);
router.get('/get_users', users.getUsers);
router.get('/todo_list', auth, todo.getTodoList);
router.get('/todo/:id', auth, todo.getTodo);

router.post('/validate', auth, authentication.validateToken);

module.exports = router;
