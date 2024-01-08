const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/todos');

const todoSchema = new mongoose.Schema({
  todoTitle: {
    type: String,
    required: true,
  },
  todoDescription: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Todo = mongoose.model('todo', todoSchema);

module.exports = {
  Todo,
};
