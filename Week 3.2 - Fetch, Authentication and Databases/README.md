# FETCH, AUTHENTICATION AND DATABASES

## Fetch API

For now we know we can send request in two ways, through Postman or browser URL.

There's a third way.

Lets say we are asked to create an HTML page where

1. You can see the names of 10 people.
2. You need to make sure you get these data from an API call.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Using Fetch API</title>
  </head>
  <body>
    <div id="container"></div>
    <script>
      function getPersonData() {
        fetch('https://fakerapi.it/api/v1/persons').then(function (res) {
          res.json().then(function (final) {
            console.log(final);
          });
        });
      }

      function getPerson() {
        fetch('https://fakerapi.it/api/v1/persons').then(async function (res) {
          const jsonData = await res.json();
          document.getElementById('container').innerHTML = JSON.stringify(
            jsonData.data
          );
        });
      }
    </script>
    <button onclick="asyncGetPersonData()">Get Person Data</button>
  </body>
</html>
```

## Authentication

`Process by which a person or system verfies that they are who they say they are`

All the websites provide some kind of authentication, to check their users and validate them, and expose them wit some extra features.

There are complicated ways (login with google, login with facebook, etc) to do auth.

Easiest is a username, password based auth.

Before we get into authentication.
Lets understand some cryptography jargans.

1. Hashing
2. Encryption.
3. JSON Web Tokens (JWT).
4. Local Storage.

### Hashing

`Example`

You create an account on facebook, you created a password so that password is being stored in the database of the facebook.

That password will not be stored in plain text form, it will be converted into some type of hashed password.

`Why to hash password before storing in a DB?`

- People repeat passwords, so if there's an DB leak it would be loss of private information.

`There are some constraints while using hashing`

- Whenever we are hashing some text it should always return the same hashed value.

```text
  'somegame' -> 'F5Vghhgg@1'
```

`somegame should always give the hashed output as F5Vghhgg@1`

- And no one can decrypt this hash value back to the password.
- hashing : 1 way

### Encryption

`Encryption is a security method that scrambles data so it is only read by using a key.`

This is two way.

- We can encrypt any text to gibberish and decrypt that gibberish back to the text form, provided you have `key`.
- Its like locking something.

Common use cases are facebook encrypting your images or text.

- Facebook doesn't store the MP4 it encrypts the file and stores in the database.
- But if you ever fetch that, it first gets decrypted before it sent back.

### JWT (JSON Web Tokens)

- This takes JSON as an input.
- And gives some structured data, a veryyyyyy long string.
- That long string is a token.
- Whoever has this output (token) can see the input.
- It is not protected in anyway.

We can check the generated tokens using this website [JWT.io](https://jwt.io)

There's some format to the string it has 3 parts.

1. Header
2. Payload
3. Verfiy Signature

### Local Storage

`A place in your browser where you can store some data`
Usually things that are stored include

1. Authentication Tokens
2. User Language Preference
3. User Theme Preference

`Project for today`

1. Let people sign up to your website
2. Only allow signed in users to see people (create a dummy people list)

`Assignment - 1`

- A website which 2 endpoints.

```md
POST /signin
Body - {
username: string
password: string
}

Returns a json web token with username encrypted.
```

```md
GET /users
Headers -
Authorization header

Returns an array of all users if user is signed in (token is correct)
Returns 403 status code if not
```

### Databases

Until now, we've been storing data in memorry.
This is bad for a few reasons -

1. Data can't be dynamic, if you upadte in memory objects, the updates are lost if the process restarts.
2. There are multiple servers in the real world.

In real scenario we have multiple backend servers, a cluster of them.

`In the real world, a bsic architecture looks like this`

- User hits the backend.
- Backend hits the database.
- User doesn't have access to the database / can't talk to the DB.

`There are various types of databases`

1. Graph DBs - (used in very niche cases)
2. Vector DBs - (popular with machine learning databases)
3. SQL DBs - (mostly used in open source projects)
4. NoSQL DBs

`MongoDB`

- MongoDB lets you create databases.
- In each DB, it lets you create tables (collections).
- In each table, it lets you dump JSON data.
- It is schemaless. (don't have to define the structure of the data)
- It scales well and is a decent choice for most use cases.

To use mongodb as the backend for our application, we are going to use an ODM called `mongoose`, so we don't have to write everything from scratch.

Mongoose can be used for writing MongoDB validation and casting.
For which we can define a model, and according to that model we will add data to our mongodb.

`101 on how to use mongoose`

```js
const mongoose = require('mongoose');
// connecting to the backend
mongoose.connect('mongodb://localhost:27017/user_app');

// creating the model or defining the model first
const User = mongoose.model('User', {
  name: String,
  username: String,
  password: String,
});

// creating the object for the model
const us1 = new User({
  name: 'Nishant Mohapatra',
  username: 'nkm@example.com',
  password: '123',
});

// saving that object into the db
us1.save().then(() => console.log('User registered'));
```
