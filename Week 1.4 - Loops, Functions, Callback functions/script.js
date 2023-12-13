// ? WEEK 1.4 | Loops, Functions and Callbacks

// ! LOOPS

// Finding the sum from 1 to 20;
// !  Without loop we would be solving the question above like this.

// ? This would be the dumbest way to solve this question
let ans =
  1 +
  2 +
  3 +
  4 +
  5 +
  6 +
  7 +
  8 +
  9 +
  10 +
  11 +
  12 +
  13 +
  14 +
  15 +
  16 +
  17 +
  18 +
  19 +
  20;
console.log(ans);

// ? FLAWS
// ! 1. VERBOSE - TOO MUCH TEXT
// ! 2. IF THE SUM TO FIND WAS TOO BIG

// ? That's why loop comes into the picture, if we want do a repetitive task we can use loop
// ? Means value is changing but the task or formula is the same

// ! Better Way - For Loop

let totalAns = 0;

for (let i = 1; i <= 20; i++) {
  totalAns = totalAns + i;
}

console.log(totalAns);

// ! FUNCTIONS

// FUNCTION DECLARATION
function findSum(n) {
  let ans = 0;
  for (let i = 0; i < n; i++) {
    ans = ans + i;
  }
  return ans;
}

// CALLING THE FUNCTION
let totalSum = findSum(10);
console.log(totalSum);

// ! CALLBACK FUNCTIONS

function square(n) {
  return n * n;
}

function sumOfSquares(a, b) {
  const val1 = square(a);
  const val2 = square(b);
  return val1 + val2;
}

const squareCallbackAns = sumOfSquares(2, 4);

console.log(squareCallbackAns);

// This function is same as the square one but it does the cube of any number

function cube(n) {
  return n * n * n;
}

function sumOfCube(a, b) {
  const val1 = cube(a);
  const val2 = cube(b);
  return val1 + val2;
}

const cubeCallbackAns = sumOfCube(2, 4);

console.log(cubeCallbackAns);

// ? The above two programs are not DRY code
// ? We could re-write the code and make it better

function sumOfSomething(a, b, fn) {
  const val1 = fn(a);
  const val2 = fn(b);
  return val1 + val2;
}

// ? Above we are passing a function as third parameter
// ? So we can pass any function whether it be cube or square

console.log(sumOfSomething(1, 3, cube));
