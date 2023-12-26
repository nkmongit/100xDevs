const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const jwtPassword = '12345';
const PORT = 3000;

app.use(express.json());

// connecting to the backend
mongoose.connect('mongodb://localhost:27017/user_app');

// creating the model or defining the model first
const User = mongoose.model('User', {
  name: String,
  username: String,
  password: String,
});

app.post('/signup', async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;

  const existingUser = await User.findOne({ username: username });

  if (existingUser) {
    return res.status(400).send('Username already exists');
  }

  // creating the object for the model
  const us1 = new User({
    name: name,
    username: username,
    password: password,
  });

  // saving that object into the db
  us1.save().then(() => console.log('User registered'));

  res.status(200).json({
    msg: 'User created successfully',
  });
});

app.post('/signin', async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const existingUser = await User.findOne({
    username: username,
    password: password,
  });

  if (existingUser) {
    const key = jwt.sign(username, { jwtPassword });
  }
});

app.listen(PORT, function () {
  console.log(`Listening on PORT: `, PORT);
});
