const express = require('express');
const app = express();
const PORT = 3000;
const { createTodo } = require('./types');
const { Todo } = require('./db');
const cors = require('cors');

// adding JSON middleware
app.use(express.json());
app.use(cors());

// create todo
app.post('/todo', async function (req, res) {
  const todoTitle = req.body.title;
  const todoDescription = req.body.description;
  console.log(todoTitle);
  console.log(todoDescription);

  const isValidTodo = createTodo.safeParse({
    todoTitle,
    todoDescription,
  });

  if (!isValidTodo.success) {
    res.status(411).json({
      err: 'Enter valid data',
    });
    return;
  }
  try {
    await Todo.create({
      todoTitle,
      todoDescription,
      completed: false,
    });
    res.status(200).json({
      msg: 'Todo created sucessfully',
    });
  } catch (err) {
    res.status(404).json({
      err: 'Could not create Todo',
    });
  }
});

// get all todos
app.get('/todos', async function (req, res) {
  try {
    const todos = await Todo.find({});
    res.status(200).json({ todos });
  } catch (err) {
    res.status(404).json({
      err: 'Todos not found',
    });
  }
});

// update todo to completed
app.put('/completed', async function (req, res) {
  const id = req.body.id;
  const filter = { _id: id };
  const update = { completed: true };
  await Todo.findOneAndUpdate(filter, update);

  res.status(200).json({
    msg: 'Updated successfully',
  });
});

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
