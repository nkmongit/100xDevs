const express = require('express');
const app = express();

app.get('/health-checkup', function (req, res) {
  const username = req.headers.username;
  const password = req.headers.password;
  const kidneyId = req.headers.kidneyId;

  if (username === 'nishant' && password === 'pass') {
    if (kidneyId == 1 || kidneyId == 2) {
    }
  }
});
