const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;
const randomString = require('randomstring');
const { uid } = require('uid');

app.use(express.json());
app.use(cors());

app.get('/todos', (req, res) => {
  let toBeGenerated = Math.floor(Math.random() * 10) + 1;
  console.log(toBeGenerated);
  const todos = [];

  for (let i = 0; i < toBeGenerated; i++) {
    todos[i] = {
      id: uid(),
      title: randomString.generate(6),
      description: randomString.generate({
        length: 12,
        charset: 'alphabetic',
      }),
    };
  }
  res.status(200).json(todos);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
