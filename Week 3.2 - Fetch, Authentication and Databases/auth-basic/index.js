const express = require('express');
// imported a JWT library to generate token
const jwt = require('jsonwebtoken');
// created a verify token
const jwtPassword = '123456';

const app = express();

app.use(express.json());

// In app DB
const ALL_USERS = [
  {
    username: 'harkirat@gmail.com',
    password: '123',
    name: 'Harkirat Singh',
  },
  {
    username: 'nkm@gmail.com',
    password: '123123',
    name: 'Nishant Mohapatra',
  },
  {
    username: 'harnoor@gmail.com',
    password: '123456',
    name: 'Harnoor Singh',
  },
  {
    username: 'harnoor@gmail.com',
    password: '123456',
    name: 'Harnoor Singh',
  },
];

// checks whether user exists
function userExists(username, password) {
  // const userExist = ALL_USERS.filter(
  //   (val) => val.username === username && val.password === password
  // );

  // ! should use find method
  const doesUserExist = ALL_USERS.find(
    (user) => (user.username = username && user.password == password)
  );
  if (doesUserExist) {
    return true;
  } else {
    return false;
  }
}

app.post('/signin', function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (!userExists(username, password)) {
    return res.status(403).json({
      msg: "User doesn't exist in our in memory DB",
    });
  }

  // generates a token with username info or payload
  let token = jwt.sign({ username: username }, jwtPassword);
  return res.json({
    token,
  });
});

app.get('/users', function (req, res) {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username;

    const returnedUsers = ALL_USERS.filter(
      (user) => user.username !== username
    );

    res.status(200).json({
      returnedUsers,
    });
  } catch (err) {
    return res.status(403).json({
      msg: 'Invalid token',
    });
  }
});

app.listen(3000, function () {
  console.log('Listening');
});
