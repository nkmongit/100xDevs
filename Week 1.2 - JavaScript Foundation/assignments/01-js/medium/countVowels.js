/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
  // Your code here
  let vowels = ['a', 'e', 'i', 'o', 'u'];
  function checkVowel(char) {
    let flag = false;
    for (let i = 0; i < vowels.length; i++) {
      if (char == vowels[i]) {
        flag = true;
      }
    }
    return flag;
  }

  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (checkVowel(str[i])) {
      count++;
    }
  }

  return count;
}
// let val = countVowels('Hello, world!');
// console.log(val);
module.exports = countVowels;
