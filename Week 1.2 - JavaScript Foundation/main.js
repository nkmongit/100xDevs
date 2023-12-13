// console.log('hello world');
// console.log(a);

// Defining Variables
// var a = 1;
// a = 2;
// console.log(a);

// let a = 1;
// a = 2;
// console.log(a);

const a = 1;
// a = 2; // Throws an error, because const can't be changed
console.log(a);

// Simple Primitives
// Variables
// Loops

let firstName = 'Nishant';
let age = 2;
let isMarried = false;

console.log(`This person's name is ${firstName} and their age is ${age}`);

if (isMarried) {
  console.log(firstName + ' is married');
} else {
  console.log(firstName + ' is not married');
}

// Complex Primitives
// Arrays, Objects, Functions

// Arrays - Example
let person1 = 'nk';
let age1 = 20;

const personArray = ['nkm', 'dkm', 'lkm'];
console.log(personArray[0]);

// Object - Example

const personInfo = {
  firstName: 'Nishant',
  gender: 'Male',
};

// Functions
function findSum(a, b) {
  return a + b;
}

console.log(findSum(9, 0));

// Passing function as argument

function sum(num1, num2, fnToCall) {
  let result = num1 + num2;
  fnToCall(result);
}

function displayResult(data) {
  console.log('Result of the sum is: ' + data);
  displayResultPassive(data);
}

function displayResultPassive(data) {
  console.log("Sums's result is: " + data);
}

sum(2, 3, displayResult);
