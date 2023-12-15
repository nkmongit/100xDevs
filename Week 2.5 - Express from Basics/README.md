# Express and HTTP with real world examples | Postman

```md
REAL WORLD EXAMPLE

- Doctors have a skill.
- They have acquired that skill over years.
- They provide service to ther people who want to use their skill.

- To expose this life skill, they open a clinic.
- People who want to use their skill line up in a waiting room.
- One by one, the doctor meets with them.
- The doctor is single threaded.

- How do people reach the doctors?
- They get their address and navigate to it.
- Once they reach there, they wait in the waiting area.
- Until their time comes.
- Doctor tends to them one by one. (Single Threaded Approach of JS)
- Doctor can tell them to get a medicine in the middle and meanwhile tend to other people. (Delegating Task)
- You come back and wait in the waiting room again.
- Here doctors are similar to JavaScript thread.
- A doctor can expose it to the world using clinics or hospitals.
```

`Your logic is like a doctor:`

```js
function calculateSum(n) {
  let ans = 0;
  for (let i = 1; i <= n; i++) {
    ans = ans + i;
  }
  return ans;
}

let ans = calculateSum(10);
console.log(ans);
```

`But what if you want to expose this logic to the world?`

- This is where `HTTP` comes into the picture.
- It lets you create a ~hospital where people can come and find you (Doctor).

`HTTP`

- Hyper Text Transfer Protocol.
- A protocol that lets you transfer data from one place to another.

`How do I expose my doctor functionality to other people?`
`How can they find me?`

- By creating an `HTTP Server`.

`How do I create an HTTP Server?`

- Using `Express`

```js
// Creating an HTTP Server
// Using Express
// And providing the functionality

const express = require('express');
const app = express();

function calculateSum(n) {
  let ans = 0;
  for (let i = 1; i <= n; i++) {
    ans = ans + i;
  }
  return ans;
}

app.get('/', function (req, res) {
  const n = req.query.n;
  const ans = calculateSum(n);
  res.send(ans.toString());
});

app.listen(3000);
```

`How do people reach to this server?`

1. By visiting `http://localhost:3000`
2. And providing query that would help us get the result.
3. Refactoring the URL to send query params `http://localhost:3000?n=3`
4. And this would return `6`

`REQUEST METHODS - CO-RELATING WITH DOCTOR`

1. GET - Going for a consultation to get a checkup. (asking from the server).
2. POST - Going to a new kidney inserted. (adding something into the server).
3. PUT - Going to get a kidney replaced. (update something on the server).
4. DELETE - Going to get a kidney removed. (removing something from the server).

`Status Codes - Aligning to the Doctor`

1. `200` - Everything went fine. (you hit the right route, and got a respond from server).
2. `404` - Doctor is not available in the hospital. (route not present).
3. `500` - Mid surgery light went away. (something went wrong).
4. `411` - Inputs were incorrect, wrong person came to surgery.
5. `403` - You were not allowed in the hospital.

## Learn by doing, lets create an in memory hospital

`You need to create 4 routes (4 things that the hospital can do)`

1. GET - User can check how many kidneys they have and their health
2. POST - User can add a new kidney.
3. PUT - User can replace a kidney, make it healthy.
4. DELETE - User can remove a kidney.
