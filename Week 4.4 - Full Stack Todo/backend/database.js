const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/todos');

const todoSchema = mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});

const Todo = mongoose.model('todo', todoSchema);

module.exports = {
  Todo,
};
