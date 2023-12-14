const express = require('express');
const fs = require('fs');
const PORT = 3000;
const app = express();

app.get('/', (req, res) => {
  res.send('Server Responded Back');
});

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
