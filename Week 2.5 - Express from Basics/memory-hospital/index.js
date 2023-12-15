const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// creating an in memory array
let users = [
  {
    name: 'Sam',
    kidneys: [
      {
        healthy: false,
      },
      {
        healthy: true,
      },
    ],
  },
  {
    name: 'Fam',
    kidneys: [
      {
        healthy: false,
      },
      {
        healthy: false,
      },
    ],
  },
  {
    name: 'Dam',
    kidneys: [
      {
        healthy: false,
      },
    ],
  },
];

function searchForUser(username) {
  let val = -1;
  for (let i = 0; i < users.length; i++) {
    if (users[i]['name'] === username) {
      val = i;
      break;
    }
  }
  return val;
}

function checkKidneys(user) {
  let kidneyArr = users[user]['kidneys'];
  return kidneyArr.length;
}

function checkHealthyKidneys(user) {
  let numOfHealthyKidneys = 0;
  let kidneyArr = users[user]['kidneys'];
  for (let i = 0; i < kidneyArr.length; i++) {
    if (kidneyArr[i]['healthy']) {
      numOfHealthyKidneys++;
    }
  }
  return numOfHealthyKidneys;
}

// ! CHECKING USER INFO
app.get('/', (req, res) => {
  let username = req.query.username;
  let userInfo = searchForUser(username);
  if (userInfo === -1) {
    res.send('No user found');
  } else {
    res.send({
      name: users[userInfo]['name'],
      numOfKidneys: checkKidneys(userInfo),
      numOfHealthyKidneys: checkHealthyKidneys(userInfo),
      numOfUnhealthyKidneys:
        checkKidneys(userInfo) - checkHealthyKidneys(userInfo),
    });
  }
});

// ! PROVIDING KIDNEYS
app.post('/', (req, res) => {
  let username = req.query.username;
  let userInfo = searchForUser(username);
  const isHealthy = req.body.isHealthy;

  if (userInfo === -1) {
    res.send('No user found');
  } else {
    if (checkKidneys(userInfo) > 1 && checkHealthyKidneys(userInfo) == 2) {
      res.send({
        messsage: 'You already have good kidneys',
      });
    } else if (checkKidneys(userInfo) < 2) {
      users[userInfo]['kidneys'].push({
        healthy: isHealthy,
      });
      res.send('You have a pair of kidneys now');
    }
  }
});

// ! REPLACING BAD KIDNEYS WITH GOOD KIDNEYS
app.put('/', (req, res) => {
  let username = req.query.username;
  let userInfo = searchForUser(username);
  if (checkHealthyKidneys(userInfo) < 2) {
    for (let i = 0; i < checkKidneys(userInfo) - 1; i++) {
      if (users[userInfo]['kidneys'][i]['healthy'] === false) {
        users[userInfo]['kidneys'][i]['healthy'] = true;
      }
    }
    res.send('You have good kidneys now');
  } else {
    res.send('You already have good kidneys');
  }
});

// ! REMOVING ALL THE UNHEALTHY KIDNEYS
app.delete('/', (req, res) => {
  const newKidneys = [];
  let username = req.query.username;
  let userInfo = searchForUser(username);

  for (let i = 0; i < users[userInfo]['kidneys'].length; i++) {
    if (users[userInfo]['kidneys'][i]['healthy']) {
      newKidneys.push({
        healthy: true,
      });
    }
  }

  users[userInfo]['kidneys'] = newKidneys;
  res.json('Removed bad kidneys');
});

app.listen(PORT, function () {
  console.log(`Server is running on port ${PORT}`);
});
