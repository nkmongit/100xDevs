# WEEK 3.1 - MIDDLEWARES, GLOBAL CATCHES, ZOD

`Let's take an example`

- Hospital (at the `door`)
  - Before you reach the doctor (at the `waiting area`)
    1. Your aadhar / insurance info is taken. Only if you have insurance you proceed (JS Thread)
    2. Blood test is done, only if no STD does user proceed (JS Thread)
    3. BP is checked, only if BP is reasonable user proceed (JS Thread)
    4. Doctors Cabin

`API translation`

- `door` : here is the `PORT`
- `waiting area` : here is the `callback queue`
- `other tasks` : here is `JS thread` responsible for single task only

`Equivalent Code`

```js
const express = require('express');
const app = express();

app.get('/heath-checkup', function (req, res) {
  // do health checks
  res.send('YOur heart is healthy');
});
```

`How do you do?`

1. Auth checks? (Does this user have funds to visit the doctor)
2. Ensure input by the user is valid (BP / Blood TESTS)

`Two checks a real website would do`

1. Authentication
2. Input Validation

`Answer`

- Middlewares

`Before we proceed, lets add constraints to our route`

1. User needs to send a kidneyId as query param which should be number from 1-2 (humans has only 2 kidneys).
2. User should send a username and password in headers.

```js
// UGLY CODE
const express = require('express');
const app = express();

app.get('/health-checkup', function (req, res) {
  // do health checks here
  const kidneyId = req.query.kidneyId;
  const username = req.headers.username;
  const password = req.headers.password;

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
  }

  // do something with kidneys here
  res.send('Your heart is healthy');
});
```

```js
// kind of janky code

app.get('/health-checkup', function (req, res) {
  const kidneyId = req.query.kidneyId;
  const username = req.headers.username;
  const password = req.headers.password;

  if (username === 'nishant' && password === 'pass') {
    // do something with kidney here
    if (kidneyId == 1 && kidneyId == 2) {
      res.json({
        msg: 'your kidney is fine',
      });
    } else {
      res.json({
        msg: 'bad input',
      });
    }
  } else {
    res.status(400).json({
      msg: 'username & pass wrong',
    });
  }
});
```

`What if we have to introduce another route that does kidney replacement, inputs needs to be same`

- Create a new route, repeat code (Ugly Solution)

```js
// gotta write this not so DRY code
app.get('/health-checks', function (res, req) {
  const kidneyId = req.query.kidneyId;
  const username = req.headers.useranme;
  const password = req.headers.password;

  if (username != 'nishant' && kidneyId != 'pass') {
    res.status(403).json({
      msg: "user doesn't exist",
    });
    return;
  }

  if (kidneyId != 1 && kidneyId != 2) {
    res.status(411).json({
      msg: 'wrong input',
    });
    return;
  }

  res.send('Your heart is changa si');
});

app.put('/replace-kidney', function (req, res) {
  const kidneyId = req.query.kidneyId;
  const username = req.headers.username;
  const password = req.headers.password;

  if (username != 'nishant' && kidneyId != 'pass') {
    res.status(403).json({
      msg: "user doesn't exist",
    });
    return;
  }

  if (kidneyId != 1 && kidneyId != 2) {
    res.status(411).json({
      msg: 'wrong input',
    });
    return;
  }

  // do kidney replacement now
});
```

Above code violates `DRY principle`, where if we have to introduce 20 different routes which need to have `authentication` as well and kidneyId `validation` as well, so writing the same logic again and again for the every route is bad.

```js
// slightly better code - create wrapper functions
function userValidator(username, password) {
  if (username != 'nishant' && kidneyId != 'pass') {
    return false;
  } else {
    return true;
  }
}

function kidneyValidator(kidneyId) {
  if (kidneyId != 1 && kidneyId != 2) {
    return false;
  } else {
    return true;
  }
}

app.get('/health-checkup', function (req, res) {
  if (!userValidator(req.query.username, req.query.password)) {
    res.status(403).json({
      msg: 'User does not exist',
    });
    return;
  }
});
```

Above code still has some code repetition, and to overcome this we have `Middlewares`.

## MIDDLEWARES

```js
const app = express();

function userMiddleware(req, res, next) {
  if (username != 'nish' || password != 'pass') {
    res.status(403).json({
      msg: 'Incorrect Inputs',
    });
  } else {
    next();
  }
}

function kidneyMiddleware(req, res, next) {
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
```

Another middleware we have been using is `app.use(express.json())`
this middleware we don't have to pass in each callback it will work on every route.
Because we are using app.use()

`Adding rate limiter`

This can be used to limit an user to send requests.

```js
const d = new Date.
function rateLimiter() {

}
```

`We can also check the number of requests made by adding one more middleware`

```js
let numberOfRequest = 0;
function calculateRequest(req, res, next) {
  if (numberOfRequest > 5) {
    res.json({
      error: 'Too many requests',
    });
  } else {
    numberOfRequest++;
    next();
  }
}
```

Only `req.body` needs app.use(express.json()) middleware, not `req.headers` or `req.query`

Because we don't know what is it could be JSON, Text, HTML or anything, and we have to tell that we are expecting JSON or anything.

`Other use cases of middleware`

1. Count the number of requests.
2. Find the average time your server is taking to handle requests.

## GLOBAL CATCHES

This is the another type of middleware in JavaScript, the problem is someone can read your expection, your end client shouldn't be able to read the exception that has occurred.

This middleware should be put at the end of all the routes, this always take 4 parameters in the callback function.

```js
app.use(function (err, req, res, next) {
  res.json({
    err: 'Sorry something is up in the server',
  });
});
```

This is also called as `Error-Handling Middleware`, beacuse of four agruments express takes this as Error-Handling Middleware.

## INPUT VALIDATION

`Why do you need input validation?`

- What if the user sends the wrong body?

```js
const express = require('express');
const app = express();

app.post('/health-checkup', function (req, res) {
  const kidneys = req.body.kidneys;
  const kidneyLength = kidneys.length;
  res.send('Your kidney length is ' + kidneyLength);
});

app.listen(3000);
```

In the above code I can send anything in the body, because we are not checking anything.

Will use a library called `Zod` for validation [Zod Documentation](https://zod.dev)

```js
if (kidneyId != 1 && kidneyId != 2) {
  return false;
}
```

Above code is very hard to scale, what if you expect acompilicated input?

Better way to do it

```js
const express = require('express');
const z = require('zod');

const app = express();

app.use(express.json());

const kidneysInput = z.literal('1').or(z.literal('2'));

app.post('/health-checkup', function (req, res) {
  const kidneyId = req.body.kidneyId;
  const validation = kidneysInput.safeParse(kidneyId);

  if (!validation.success) {
    res.send('Incorrect input');
    return;
  }
  res.send('Your kidney id is ' + kidneyId);
});

app.listen(3000);
```

`Write Zod schema for following inputs`

```js
// email: that should be string and should include @ .com.

// password: which is atleast 8 letters.

// country: that should only have 'IN' or 'US'.

{
  email: string,
  password: string,
  country: 'IN' || 'US'
}
```

`RESPECTIVE ZOD SCHEMA`

```js
const schema = zod.object({
  email: zod.string().email(),
  password: z.string().min(8),
  country: z.literal('IN').or(z.literal('US')),
});
```

Zod runs independently, it's just a validation library, you provide the schema and it tells if the given inputs are valid or not.

## Authentication

As we can tell by now, anyone can send requests to our backend.
They can just go to postman and send request.
How do you ensure that this user has access to certain resource?

- `Dumb Way` : Asking user to send username and password in all requests as headers.

- `Slightly Better Way`

1. Give the user back a token on signup/signin.
2. Ask the user to send back the token in all future requests.
3. When the user logs out, ask the user to forget the token (or revoke it from the backend).
