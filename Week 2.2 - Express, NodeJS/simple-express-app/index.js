const express = require('express');
const fs = require('fs');
const PORT = 3000;
const app = express();

// const bodyParser = require('body-parser');

// app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Server Responded Back');
});

// app.get('/todos', (req, res) => {
//   fs.readFile('./utils/main.txt', 'utf-8', (err, data) => {
//     res.send(data);
//   });
// });

// app.post('/addTodo', (req, res) => {
//   fs.readFile('./utils/main.txt', 'utf-8', (err, data) => {
//     let { text } = req.body;
//     let newData = data + '\n' + text;

//     fs.writeFile('./utils/main.txt', newData, (err) => {
//       res.send('Successfully Added a Todo');
//     });
//   });
// });

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
