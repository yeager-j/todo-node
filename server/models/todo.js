var mongoose = require('mongoose');

var todoSchema = new mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean,
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Todo', todoSchema);
