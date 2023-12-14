const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to basic Todo App');
});

// GET ALL TODOS FROM FILE
app.get('/todos', (req, res) => {
  fs.readFile('./utils/main.txt', 'utf-8', (err, data) => {
    res.send(data);
  });
});

// ADD TODOS IN THE FILE
app.post('/addTodo', (req, res) => {
  fs.readFile('./utils/main.txt', 'utf-8', (err, data) => {
    let { text } = req.body;
    let newData = data + '\n' + text;

    fs.writeFile('./utils/main.txt', newData, (err) => {
      res.send('Successfully Added a Todo');
    });
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
