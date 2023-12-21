const express = require('express');
const app = express();

app.get('/health-checkup', function (req, res) {
  // do health checks here
  const kidneyId = req.query.kidneyId;
  const username = req.headers.username;
  const password = req.headers.password;

  console.log(kidneyId);

  // username & pass checks
  if (username != 'nishant' && password != 'pass') {
    res.status(403).json({
      msg: "User doesn't exit",
    });
    return;
  }

  // input validation
  if (kidneyId != 1 && kidneyId != 2) {
    res.status(411).json({
      msg: 'Wrong Inputs',
    });
    return;
  }

  // do something with kidneys here
  res.send('Your heart is healthy');
});

app.listen(3000, () => {
  console.log('Listening on port');
});
