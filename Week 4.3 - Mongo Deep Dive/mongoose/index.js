const express = require('express');
const { User } = require('./database');
const app = express();

const PORT = process.env.PORT || 4000;

app.post('/create-user', async (req, res) => {
  await User.create({
    username: req.body.username,
    password: req.body.password,
  });
});

app.listen(PORT, () => {
  console.log('Server Running');
});
