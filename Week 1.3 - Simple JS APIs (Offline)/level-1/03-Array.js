// Array Handbook

console.log('Array Handbook' + '\n');

// Array: push(), pop(), shift(), unshift(), splice()
// concat(), forEach(), map(), filter(), reduce(), find(), sort()

// push()
// ? This method is used to push an element inside the array at the last index position
// ? and this method returns the new length of the array, this method mutates the orginal
// ? array

function pushExample(arr, element) {
  console.log('push() method');
  console.log(`Orignal Array: [${arr}] and it's length is ${arr.length}`);
  const newLen = arr.push(element);
  console.log(
    `After push: [${arr}] and it's returned value is length ${newLen} \n`
  );
}
pushExample([1, 2, 3, 4], 6);

// pop()
// ? This method is used to pop out an element inside the array from the last index
// ? this method returns the value that gets popped from last, this also mutates the
// ? original array

function popExample(arr) {
  console.log('pop() method');
  console.log(`Orignal Array: [${arr}] and it's length is ${arr.length}`);
  const popped = arr.pop();
  console.log(
    `After pop: [${arr}] and it's returned value is popped element ${popped} \n`
  );
}
popExample([6, 7, 8, 9]);

// shift()
// ? This method is used to remove an element from the first index of an array
// ? This returns the value that has been removed

function shiftExample(arr) {
  console.log('shift() method');
  console.log(`Orignal Array: [${arr}] and it's length is ${arr.length}`);
  const valRemoved = arr.shift();
  console.log(
    `After shift: [${arr}] and it's returned value i.e removed ${valRemoved} \n`
  );
}
shiftExample([5, 2, 3, 4]);

// unshift()
// ? This method is used to add the element at the first position of array
// ? This returns the new length of the array

function unshiftExample(arr, element) {
  console.log('unshift() method');
  console.log(`Orignal Array: [${arr}] and it's length is ${arr.length}`);
  const newLength = arr.unshift(element);
  console.log(
    `After unshift: [${arr}] and it's returned new length of the array ${newLength} \n`
  );
}
unshiftExample([1, 2, 3, 4, 5], 9);

// conact()
// ? This method is used to merge two arrays and returns a new array

function concatExample(arr1, arr2) {
  console.log('concat() method');
  console.log('Orginal Arrays: ', arr1, arr2);
  let arr3 = arr1.concat(arr2);
  console.log('After conact: ', arr3, '\n');
}
concatExample([1, 2, 3], [4, 6, 8]);

// forEach()
// ? This method takes a callback function and we can retrieve both the item inside
// ? array and the index value of that item, used for iterating on array

function forEachExample(arr) {
  console.log('forEach() method');
  console.log('Orginal Array: ', arr);
  arr.forEach(function (item, index) {
    console.log(item, index);
  });
  console.log('\n');
}
forEachExample([3, 4, 5, 6, 7]);
