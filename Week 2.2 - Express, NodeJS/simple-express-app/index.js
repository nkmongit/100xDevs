const express = require('express');
const PORT = 3000;
// const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('CHICKEN LOBB');
});

app.get('/conversations', (req, res) => {
  console.log(req.headers);
  console.log(req.body);
  res.send({
    msg: '2 + 2 = 4',
  });
});

app.get('/timeout', (req, res) => {
  setTimeout(() => {
    res.send('Timeout Bruh');
  }, 2000);
});

app.post('/get-convo', (req, res) => {
  // console.log(req.headers);
  const message = req.query.message;
  console.log(message);
  console.log(req.body);
  res.send({
    msg: '2 + 2 = 4',
  });
});

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
