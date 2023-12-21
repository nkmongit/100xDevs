const express = require('express');
const app = express();
console.log(app);
const PORT = 3000;

// rate limiting
// function rateLimiter(req, res, next) {}

// let numberOfRequest = 0;
// function calculateRequest(req, res, next) {
//   if (numberOfRequest > 5) {
//     res.json({
//       error: 'Too many requests',
//     });
//   } else {
//     numberOfRequest++;
//     next();
//   }
// }

// function averageTime(req, res, next) {
//   let beforeDate = Date.now();
//   res.on('finish', () => {
//     const duration = Date.now() - beforeDate;
//     console.log(
//       `Request ${req.method} ${req.originalUrl} processed in ${duration}ms`
//     );
//   });
//   next();
// }

app.use(express.json());
app.use(startTime, endTime);

function startTime(req, res, next) {
  req.startingTime = Date.now();
  next();
}
function endTime(req, res, next) {
  res.on('finish', () => {
    const endingTime = Date.now();
    const duration = endingTime - req.startingTime;
    console.log(
      `Request ${req.method} ${req.originalUrl} processed in ${duration}ms`
    );
  });
  next();
}

function userMiddleware(req, res, next) {
  const username = req.headers.username;
  const password = req.headers.password;

  if (username !== 'nish' || password !== 'pass') {
    res.status(403).json({
      msg: 'Incorrect Inputs',
    });
  } else {
    next();
  }
}

function kidneyMiddleware(req, res, next) {
  const kidneyId = req.query.kidneyId;
  if (kidneyId != 1 && kidneyId != 2) {
    res.status(403).json({
      msg: 'Incorrect inputs',
    });
  } else {
    next();
  }
}

// we can give a range of callback functions here
app.get(
  '/health-checkup',
  userMiddleware,
  kidneyMiddleware,
  function (req, res) {
    // do something with body
    res.send('Your health is good');
  }
);

app.get('/kidney-check', userMiddleware, kidneyMiddleware, function (req, res) {
  // do something with kidney
  res.send('Your kidney is healthy');
});

app.get('/heart-check', userMiddleware, function (req, res) {
  // do something with heart
  res.send('Your heart is healthy');
});

app.listen(PORT, function () {
  console.log('Listening');
});
