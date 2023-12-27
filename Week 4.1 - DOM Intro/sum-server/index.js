const express = require('express');
const app = express();
let cors = require('cors');

app.use(cors());
app.use(express.json());

// https://sum-server.100xdevs.com/sum?a=1&b=2

app.get('/sum', function (req, res) {
  const a = req.query.a;
  const b = req.query.b;

  const n1 = parseInt(a);
  const n2 = parseInt(b);

  console.log(n1 + n2);

  res.json(n1 + n2);
});

app.get('/interest', function (req, res) {
  const principal = parseInt(req.query.principal);
  const rate = parseInt(req.query.rate);
  const time = parseInt(req.query.time);

  const interest = (principal * rate * time) / 100;

  const total = principal + interest;

  res.send({
    total: total,
    interest: interest,
  });
});

app.listen(3000, () => {
  console.log('Server Running');
});
