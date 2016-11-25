var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Todo = mongoose.model('Todo');
var validate = require('../utilities/validate');
var authenticate = require('../utilities/authenticate');

var sendJSONResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.getTodoList = function (req, res) {
    authenticate.checkToken(req, res, function (user) {
        Todo.find({userID: req.payload._id}, function (err, todos) {
            if (err) {
                sendJSONResponse(res, 500, {
                    message: 'Unexpected server error.'
                })
            }

            if (todos) {
                sendJSONResponse(res, 200, todos);
            } else {
                sendJSONResponse(res, 404, {
                    message: 'Cannot find any todos.'
                })
            }
        })
    })
};

module.exports.getTodo = function (req, res) {
    Todo.findById(req.params.id, function (err, todo) {
        if (todo) {
            if (String(todo.userID) === String(req.payload._id)) {
                sendJSONResponse(res, 200, todo);
            } else {
                sendJSONResponse(res, 401, {
                    message: 'You cannot view this todo item.'
                })
            }
        } else {
            sendJSONResponse(res, 404, {
                message: 'Cannot find todo with that ID'
            })
        }
    })
};

module.exports.createTodo = function (req, res) {
    var validation = validate.validate([
        {
            value: req.body.title,
            checks: {
                required: true,
                maxlength: 100
            }
        },
        {
            value: req.body.description,
            checks: {
                required: true,
                maxlength: 1000
            }
        }
    ]);

    if (validation.passed) {
        authenticate.checkToken(req, res, function (user) {
            var todo = new Todo();
            todo.title = req.body.title;
            todo.description = req.body.description;
            todo.userID = user._id;

            todo.save(function (err) {
                if (err) {
                    sendJSONResponse(res, 500, {
                        message: 'Unexpected server error.'
                    })
                } else {
                    sendJSONResponse(res, 200, {
                        message: 'Successfully created todo item.'
                    })
                }
            });
        })
    } else {
        sendJSONResponse(res, 400, {
            message: 'Input invalid. Try again.'
        })
    }
};

module.exports.editTodo = function (req, res) {
    var validation = validate.validate([
        {
            value: req.body.title,
            checks: {
                required: true,
                maxlength: 100
            }
        },
        {
            value: req.body.description,
            checks: {
                required: true,
                maxlength: 1000
            }
        }
    ]);

    if (validation.passed) {
        authenticate.checkToken(req, res, function (user) {
            Todo.findById(req.params.id, function (err, todo) {
                if (String(todo.userID) === String(user._id)) {
                    todo.title = req.body.title;
                    todo.description = req.body.description;
                    todo.userID = req.payload._id;

                    todo.save(function (err) {
                        if (err) {
                            sendJSONResponse(res, 500, {
                                message: 'Unexpected server error.'
                            })
                        } else {
                            sendJSONResponse(res, 200, {
                                message: 'Successfully edited todo item.'
                            })
                        }
                    });
                } else {
                    sendJSONResponse(res, 401, {
                        message: 'You cannot edit that todo item'
                    })
                }
            });
        })
    } else {
        sendJSONResponse(res, 400, {
            message: 'Input invalid. Try again.'
        })
    }
};

module.exports.deleteTodo = function (req, res) {
    authenticate.checkToken(req, res, function (user) {
        Todo.findById(req.params.id, function (err, todo) {
            if (todo) {
                if (String(todo.userID) === String(user._id)) {
                    Todo.findByIdAndRemove(req.params.id, function (err, todo) {
                        if (err) {
                            sendJSONResponse(res, 500, {
                                message: 'Unexpected server error.'
                            })
                        } else {
                            sendJSONResponse(res, 200, {
                                message: 'Todo successfully deleted.'
                            })
                        }
                    });
                }
            } else {
                sendJSONResponse(res, 404, {
                    message: 'Cannot find todo with that ID'
                })
            }
        })
    })
};
