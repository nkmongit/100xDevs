function getLength(name) {
  return name.length;
}

const ans = getLength('nishant');
console.log(ans);

// what if we forget to send anything in the arguments

// const len = getLength(); // it passes undefined, throws an error, and stops execution
// console.log(ans); // control never reaches here

// this shouldn't stop our program, we should
// be able to catch our errors

// ! TRY AND CATCH

try {
  const ans = getLength();
  console.log(ans);
} catch (e) {
  console.log("Can't get length of undefined");
}

console.log('CONTROL REACHES HERE');
