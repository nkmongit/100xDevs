# WEEK 1.5 | Aysnc, Await and Promise

## Async Functions vs Synchronized Functions

`What does synchronous mean?`

- Performing / Executing certain tasks one after other
  squentially that means, one thing is happening at a time.

`What does asynchronous mean?`

- Opposite of synchronous.
- Performing certain tasks simultaneously, happening in parts.
- Multiple things are context switching with each other.

`Let's build some intuition`

Human brain and body is single threaded

1. We can only do one thing at a time.
2. But we can context switch between tasks, or we delegate tasks to other people.

`Example`

You have 4 tasks -

1. Boil water.
2. Cut Veggies.
3. Cut maggie packet.
4. Get ketchup from the shop.

Above task can be done in Synchronous Manner and Asynchronous Manner.

`What did we learn?`

- Even if you are single threaded (brain can do only one thing at a time), you can do things
  parallely by Delegating.
- You can also context switch between tasks if need to be (the net time to do both things would still be the same).
- Net amount of time take to do a task can decreased by doing these two things (delegating and context switching).

`How does JS do the same? Can JS delegate? Can JS context switch?`

- Yes! Using asynchronous functions.

`Example for synchronous function`

```javascript
function findSum(n) {
  let ns = 0;
  for (let i = 0; i < n; i++) {
    ans += i;
  }
  return ans;
}

console.log(findSum(100));
```

When we run this function JavaScript thread is busy running it, it can't context switch between any task other than executing the expression / statements line by line.

`Example for asynchronous function`

- Here we will use a JavaScript API called setTimeout which is an async function.

```javascript
function findSum(n) {
  let ans = 0;
  for (let i = 0; i < n; i++) {
    ans += i;
  }
  return ans;
}

function findSumTill100() {
  return findSum(100);
}

// calling an async function
setTimeout(findSumTill100, 1000);
console.log('hello world');
```

`Making the above async function to sync`

- Busy Waiting Way

```javascript
// This a very expensive operation
// Which is why when the control reaches here,
// it will be busy executing this.
function syncSleep() {
  let a = 0;
  for (let i = 0; i < 10000000; i++) {
    a++;
  }
}
syncSleep();
console.log('hello world');
```

`Common Async Functions`

1. setTimeout
2. fs.readFile - to read a file from your filesystem.
3. fetch - to fetch some data from an API endpoint.

`Async Process - To read a file from the system`

```javascript
const fs = require('fs');
// fs = filesystem
fs.readFile('note.txt', 'utf-8', function (err, data) {
  if (data) {
    console.log(data);
  } else {
    console.log(err);
  }
});
```

If your JS thread is busy performing a long task, but meanwhile also completed or resolved an sync function, JS thread go forthback to that async function without completing execution on the cureent expression.

`To visualize the Call Stack, Web APIs, and Callback Queue`

[Latent Visualizer](http://latentflip.com/loupe/ 'Used for visualization on how Call Stack, web APIs and Callback Queue works').

- Callback functions are more useful when we are using Async Function.

## Promises

- Promises are just syntactical sugar that make this code slightly more readable.
- Under the hood still uses callback and all.

```javascript
function findSum(n) {
  let ans = 0;
  for (let i = 0; i < n; i++) {
    ans += i;
  }
  return ans;
}

function findSumTill100() {
  return findSum(100);
}

// calling an async function
setTimeout(findSumTill100, 1000);
console.log('hello world');
```

Until now, we've used other people's asynchronous functions
How can we create an asynchronous function of our own?

`Ugly Way`

```js
const fs = require('fs');

// my own asynchronous function
function nkmReadFile(cb) {
  fs.readFile('note.txt', 'utf-8', function (err, data) {
    cb(data);
  });
}
// callback function to call
function onDone(data) {
  console.log(data);
}

nkmReadFile(onDone);
```

- Just a wrapper on top of another async function, which is fine.
- Usually all sync functions you will write will be on top of
  JS provided async functions like setTimeout or fs.readFile.

`Using Promise - Cleaner Way`

```js
const fs = require('fs');

// my own asynchronous function
function nkmReadFile() {
  return new Promise(function (resolve) {
    fs.readFile('note.txt', 'utf-8', function (err, data) {
      resolve(data);
    });
  });
}
// callback function to call
function onDone(data) {
  console.log(data);
}

nkmReadFile().then(onDone);
```
