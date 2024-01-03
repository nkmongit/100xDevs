const express = require('express');
const { createTodo, updateTodo } = require('./types');
const app = express();
const PORT = 3000;
const { Todo } = require('./database');
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.post('/todo', async function (req, res) {
  const createPayload = req.body;
  const parsedPayload = createTodo.safeParse(createPayload);

  if (!parsedPayload.success) {
    res.status(411).json({
      msg: 'You sent the wrong inputs',
    });
    return;
  }

  await Todo.create({
    title: createPayload.title,
    description: createPayload.description,
    completed: false,
  });

  res.json({
    msg: 'Todo Created',
  });
});

app.get('/todos', async function (req, res) {
  const todos = await Todo.find({});
  res.json({ todos });
});

app.put('/completed', async function (req, res) {
  const updatePayload = req.body;
  console.log(updatePayload);
  const parsedPayload = updateTodo.safeParse(updatePayload);
  if (!parsedPayload.success) {
    res.status(411).json({
      msg: 'You sent the wrong inputs',
    });
    return;
  }

  await Todo.findOneAndUpdate(
    {
      _id: req.body.id,
    },
    {
      completed: true,
    }
  );
  res.json({
    msg: 'Todo marked is completed',
  });
});

app.listen(PORT, () => {
  console.log(`SUCCESSFULLY CONNECTED TO PORT ${PORT}`);
});
