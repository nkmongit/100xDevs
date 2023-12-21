// GLOBAL CATCHES || ERROR-HANDLING MIDDLEWARES

const express = require('express');
const app = express();

app.use(express.json());

function addSomething(req, res, next) {
  console.log(3 + 7);
  next();
}
function subSomething(req, res, next) {
  console.log(4 - 0);
  next();
}

app.post('/', addSomething, subSomething, function (req, res) {
  res.json({
    name: 'Nishant Mohapatra',
    age: 24,
    job: 'Salesforce Developer',
    fields: req.body.fields,
  });
});

app.listen(3001, () => {
  console.log('Listening');
});
