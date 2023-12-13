# WEEK 1.4 | Loops, Functions and Callbacks

## Loops

- Before we go and check how loop works.
- First we should know why do we need loops.
- And how they are solving certain problems.

`Problem Statement`

1. Find the sum for 1 to 20.

- Well to solve this problem statement using JS we can use

```javascript
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
```

- Above would be the dumbest way to solve this problem.
- As we can see we just doing one operation on every number from 1 to 20.
- And that's creating two problems.

1. It is very verbose - TOO MUCH TEXT!
2. What if the sum to find was more than the given number.

- We would have to manually do the same task repetively again
- That's why we need loops.

`For Loops`

- Solving the question using `for loops`

```javascript
let ans = 0;

for (let i = 0; i <= 20; i++) {
  ans = ans + i;
}

console.log(ans);
```

- Above code will give us the same answer.
- It is more clutter free.

`Let's understand how the above code works`

1. First the value `ans` gets initialized as `ans = 0`.
2. Ideally the whole `for loop` gets executed, but first `let i = 1`
   runs, that means `i` value get initialized with value `0` (and this runs only for one time in the entire for loop).
3. Then it gets to `i <= 20` where it compares whether the `expression / logic` and
   returns true or false, if `true` it gets inside the for loop block
   and execute the statement / expression inside it, else it comes out of the loop.
4. If the expression is true and it's inside the for loop block and executed
   all the statements or expression, it goes to the `i++` and increments the value and repeat on with comparing the value `i <= 50`.

## Functions

`What is a function?`

- A function in JavaScript is a set of statements that performs a task
  or calculates a value.
- It should take some input and return an output where there is some obvious relationship between the input and the output.

- Syntax

```javascript
function findSum(n) {
  let ans = 0;
  for (let i = 0; i < n; i++) {
    ans = ans + i;
  }
  return ans;
}
```

1. To declare a function we use `function` keyword
2. `findSum()` is the name of the function
3. `findSum(n)` here n is the argument that is passed while calling the function
4. Inside the function body, we have the actual logic.
5. And finally return something from the function

`Calling a function`

1. Without calling or invoking a function run it.
2. To run a function.

```javascript
let ans = findSum(10);
console.log(ans);
```

`Why we need function?`

- We can write the same code without using function

```javascript
let n = 100;
let ans = 0;

for (let i = 0; i < n; i++) {
  ans = ans + i;
}

console.log(ans);

// Had to write same repetitive logic again.
// Just because the value for 'n' changed.

let n2 = 1000;
let ans2 = 0;

for (let i = 0; i < n; i++) {
  ans2 = ans2 + i;
}

console.log(ans2);
```

- Aim is to write DRY code

`Callback Functions`

- Calling one function inside another function.
- At highlevel, it means passing functions as arugemnts.

- `Example`

```javascript
// finds the square of the input
function square(n) {
  return n * n;
}

// finds the sum of the squares of the inputs
function sumOfSquares(a, b) {
  const val1 = square(a);
  const val2 = square(b);

  return val1 + val2;
}

console.log(sumOfSquares(1, 2));
```

- Above `square(n) function` calculates the square of any number and returns it.
- Then the `sumOfSquares(a, b)` which takes two values as arguments.
- Then it calls the `square()` for both a and b and saves it inside the variable
  val1 and val2 res.
- And returns the value, where we directly `console.log(sumOfSquares(1, 2))`.
