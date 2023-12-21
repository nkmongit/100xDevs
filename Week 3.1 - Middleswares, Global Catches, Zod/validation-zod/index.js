// VALIDATION USING ZOD

const express = require('express');
const app = express();
const z = require('zod');

app.use(express.json());

// first create the schema for validation
const kidneyInput = z.array(z.number());

app.post('/kidney-check', (req, res) => {
  const kidneys = req.body.kidneys;
  console.log(kidneys);

  // validate the value with the created schema
  const validation = kidneyInput.safeParse(kidneys);

  if (!validation.success) {
    res.send({
      err: 'Error Came',
      validation,
    });
  } else {
    res.status(200).send('Your kidneys are: ' + kidneys);
  }
});

app.listen(3000, () => {
  console.log('Running');
});
