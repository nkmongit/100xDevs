// ? WEEK 1.5 | Aysnc, Await and Promise

'use strict';

// ! Synchronous Code
function findSum(n) {
  let ns = 0;
  for (let i = 0; i < n; i++) {
    ans += i;
  }
  return ans;
}

console.log(findSum(100));

// ! Asynchronous Code
function findSum(n) {
  let ans = 0;
  for (let i = 0; i < n; i++) {
    ans += i;
  }
  return ans;
}

function findSumTill100() {
  console.log(findSum(100));
}

// calling an async function
setTimeout(findSumTill100, 1000);

console.log('hello world');

// ! Making above Async Code into Sync

function syncSleep() {
  let a = 0;
  for (let i = 0; i < 10000000; i++) {
    a++;
  }
}
syncSleep();
console.log('hello world');

// ! Async Process - To read a file from the system`

const fs = require('fs');
// fs = filesystem
fs.readFile('note.txt', 'utf-8', function (err, data) {
  if (data) {
    console.log(data);
  } else {
    console.log(err);
  }
});

// console.log('FIRST THIS WILL RUN BECAUSE ABOVE CODE IS ASYNC');

// ! Promises
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

const returnedPromise = nkmReadFile();
console.log(returnedPromise);

returnedPromise.then(onDone);

// returnedPromise.then(onDone).then(afterPromiseResolved);
// function afterPromiseResolved() {
//   console.log(returnedPromise);
// }

// ! Await
function awaitAysncFunction() {
  let p = new Promise(function (resolve) {
    setTimeout(function () {
      resolve('Hi there');
    }, 1000);
  });
  return p;
}
async function main() {
  // no callbacks, no .then syntax
  let value = await awaitAysncFunction();
  // console.log('9');
  console.log(value);
}

main();
